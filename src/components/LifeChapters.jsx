import React, { useEffect, useMemo, useState } from 'react';
import { useReceipts } from '../context/ReceiptContext';
import { formatCurrency } from '../utils/formatters';

import {
  BookOpen,
  CalendarDays,
  Clock3,
  MapPin,
  Receipt as ReceiptIcon,
  ArrowRight,
  FileText,
  ChevronDown,
  Activity,
  Layers3
} from 'lucide-react';

import ReceiptCard from './ReceiptCard';
import { sfx } from '../utils/audioFx';

const CHAPTER_PAGE_SIZE = 12;

export default function LifeChapters() {
  const {
    chapters,
    receipts,
    selectedChapterId,
    setSelectedChapterId,
    setActiveView
  } = useReceipts();

  const [activeChapterId, setActiveChapterId] =
    useState(
      selectedChapterId ||
      chapters[0]?.id ||
      null
    );

  const [visibleReceipts, setVisibleReceipts] =
    useState(CHAPTER_PAGE_SIZE);

  // ---------------------------------------
  // KEEP SELECTED CHAPTER VALID
  // ---------------------------------------

  useEffect(() => {
    if (!chapters.length) return;

    const exists = chapters.some(
      (chapter) =>
        chapter.id === activeChapterId
    );

    if (!exists) {
      const firstId =
        selectedChapterId &&
        chapters.some(
          (chapter) =>
            chapter.id === selectedChapterId
        )
          ? selectedChapterId
          : chapters[0].id;

      setActiveChapterId(firstId);
      setSelectedChapterId(firstId);
    }
  }, [
    chapters,
    activeChapterId,
    selectedChapterId,
    setSelectedChapterId
  ]);

  // ---------------------------------------
  // CURRENT CHAPTER
  // ---------------------------------------

  const currentChapter = useMemo(() => {
    if (!chapters.length) return null;

    return (
      chapters.find(
        (chapter) =>
          chapter.id === activeChapterId
      ) || chapters[0]
    );
  }, [chapters, activeChapterId]);

  // ---------------------------------------
  // RECEIPTS BELONGING TO CHAPTER
  // ---------------------------------------

  const chapterReceipts = useMemo(() => {
    if (!currentChapter) return [];

    const ids = new Set(
      currentChapter.receiptIds || []
    );

    return receipts.filter((receipt) =>
      ids.has(receipt.id)
    );
  }, [currentChapter, receipts]);

  // ---------------------------------------
  // RESET RECEIPT PAGINATION
  // ---------------------------------------

  useEffect(() => {
    setVisibleReceipts(
      CHAPTER_PAGE_SIZE
    );
  }, [activeChapterId]);

  // ---------------------------------------
  // CHAPTER DATE FORMAT
  // ---------------------------------------

  const chapterPeriod = useMemo(() => {
    if (!currentChapter) return '';

    const start = new Date(
      currentChapter.startDate
    );

    const end = new Date(
      currentChapter.endDate
    );

    if (
      isNaN(start.getTime()) ||
      isNaN(end.getTime())
    ) {
      return 'Recorded period';
    }

    const sameMonth =
      start.getMonth() === end.getMonth() &&
      start.getFullYear() ===
        end.getFullYear();

    if (sameMonth) {
      return start.toLocaleDateString(
        'en-US',
        {
          month: 'short',
          year: 'numeric'
        }
      );
    }

    return `${start.toLocaleDateString(
      'en-US',
      {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }
    )} → ${end.toLocaleDateString(
      'en-US',
      {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }
    )}`;
  }, [currentChapter]);

  // ---------------------------------------
  // SELECT CHAPTER
  // ---------------------------------------

  const handleSelectChapter = (id) => {
    sfx.playPaperSlip();

    setActiveChapterId(id);
    setSelectedChapterId(id);

    setVisibleReceipts(
      CHAPTER_PAGE_SIZE
    );
  };

  // ---------------------------------------
  // EMPTY STATE
  // ---------------------------------------

  if (!chapters.length) {
    return (
      <div className="py-20 text-center">

        <BookOpen className="w-12 h-12 text-stone-600 mx-auto mb-4" />

        <h2 className="font-serif text-2xl text-stone-300">
          No Life Chapters Yet
        </h2>

        <p className="text-sm font-mono text-stone-500 mt-2">
          Chapters will appear when recorded activity is loaded.
        </p>

      </div>
    );
  }

  return (
    <div className="space-y-10 pb-16 animate-fade-in">

      {/* -------------------------------- */}
      {/* HEADER */}
      {/* -------------------------------- */}

      <div>

        <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-1 flex items-center gap-1.5">

          <BookOpen className="w-4 h-4" />

          Chronological Memory Map

        </div>

        <h2 className="font-serif text-3xl md:text-4xl text-stone-100">
          Life Chapters
        </h2>

        <p className="text-sm font-serif italic text-stone-400 mt-1 max-w-2xl">
          Your recorded activity grouped into chronological chapters based on the actual dataset.
        </p>

      </div>


      {/* -------------------------------- */}
      {/* CHAPTER TIMELINE */}
      {/* -------------------------------- */}

      <div className="relative">

        <div className="absolute left-0 right-0 top-1/2 h-px bg-stone-800 hidden lg:block" />

        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-none">

          {chapters.map((chapter, index) => {

            const isSelected =
              chapter.id ===
              activeChapterId;

            return (
              <button
                key={chapter.id}
                onClick={() =>
                  handleSelectChapter(
                    chapter.id
                  )
                }
                className={`
                  relative
                  min-w-[220px]
                  text-left
                  p-4
                  rounded-2xl
                  border
                  transition-all
                  duration-300
                  ${
                    isSelected
                      ? `
                        bg-stone-900
                        border-emerald-500/60
                        shadow-xl
                        shadow-emerald-500/10
                        -translate-y-1
                      `
                      : `
                        bg-stone-900/40
                        border-stone-800
                        hover:border-stone-600
                        hover:bg-stone-900/80
                      `
                  }
                `}
              >

                {isSelected && (
                  <div className="absolute top-0 left-4 right-4 h-0.5 bg-gradient-to-r from-emerald-500 to-amber-400" />
                )}

                <div className="flex items-center justify-between">

                  <span className="text-[10px] uppercase tracking-widest font-mono text-stone-500">
                    Chapter {index + 1}
                  </span>

                  <span className="text-[10px] font-mono text-emerald-400">
                    {chapter.count || 0} records
                  </span>

                </div>

                <h3 className="font-serif text-lg text-stone-100 mt-2 line-clamp-2">
                  {chapter.title}
                </h3>

                <p className="text-[11px] font-mono text-stone-500 mt-2">
                  {chapter.startDate
                    ? new Date(
                        chapter.startDate
                      ).toLocaleDateString(
                        'en-US',
                        {
                          month: 'short',
                          year: 'numeric'
                        }
                      )
                    : 'Unknown'}
                </p>

                <div className="flex items-center gap-2 mt-3">

                  <span className="px-2 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-300">
                    {chapter.dominantCategory ||
                      'Other'}
                  </span>

                </div>

              </button>
            );
          })}

        </div>

      </div>


      {/* -------------------------------- */}
      {/* SELECTED CHAPTER */}
      {/* -------------------------------- */}

      {currentChapter && (

        <section className="rounded-3xl bg-gradient-to-b from-stone-900 via-[#14141c] to-[#0e0e14] border border-stone-800 shadow-2xl overflow-hidden">

          {/* TOP ACCENT */}

          <div className="h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400" />


          <div className="p-7 md:p-10 space-y-8">

            {/* -------------------------------- */}
            {/* CHAPTER HEADER */}
            {/* -------------------------------- */}

            <div className="max-w-4xl space-y-5">

              <div className="flex flex-wrap items-center gap-2">

                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">

                  <CalendarDays className="w-3.5 h-3.5" />

                  {chapterPeriod}

                </span>

                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-950 border border-stone-800 text-stone-400 text-xs font-mono">

                  <Layers3 className="w-3.5 h-3.5" />

                  {currentChapter.count || 0} moments

                </span>

              </div>


              <h2 className="font-serif text-3xl md:text-5xl text-stone-100 tracking-tight">
                {currentChapter.title}
              </h2>


              <p className="font-serif italic text-lg text-stone-300 leading-relaxed">
                {currentChapter.subtitle}
              </p>


              <blockquote className="p-5 rounded-xl bg-stone-950/70 border-l-4 border-emerald-500 text-stone-300 font-serif italic text-base leading-relaxed">
                {currentChapter.quote}
              </blockquote>


              <p className="text-sm text-stone-300 leading-relaxed">
                {currentChapter.description}
              </p>

            </div>


            {/* -------------------------------- */}
            {/* REAL CHAPTER METRICS */}
            {/* -------------------------------- */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

              {/* RECORDS */}

              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">

                <div className="flex items-center gap-2 text-stone-500 text-[10px] uppercase tracking-wider font-mono">

                  <ReceiptIcon className="w-3.5 h-3.5" />

                  Recorded

                </div>

                <div className="text-stone-100 font-bold text-xl mt-2">
                  {Number(
                    currentChapter.count || 0
                  ).toLocaleString()}
                </div>

              </div>


              {/* VALUE */}

              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">

                <div className="text-stone-500 text-[10px] uppercase tracking-wider font-mono">
                  Recorded Value
                </div>

                <div className="text-amber-300 font-bold text-xl mt-2">
                  {formatCurrency(
                    currentChapter.financialFootprint ||
                      0
                  )}
                </div>

              </div>


              {/* CATEGORY */}

              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">

                <div className="flex items-center gap-2 text-stone-500 text-[10px] uppercase tracking-wider font-mono">

                  <Activity className="w-3.5 h-3.5" />

                  Dominant Category

                </div>

                <div className="text-emerald-300 font-bold text-sm mt-2 truncate">
                  {currentChapter.dominantCategory ||
                    'Other'}
                </div>

              </div>


              {/* TIME */}

              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">

                <div className="flex items-center gap-2 text-stone-500 text-[10px] uppercase tracking-wider font-mono">

                  <Clock3 className="w-3.5 h-3.5" />

                  Active Period

                </div>

                <div className="text-purple-300 font-bold text-sm mt-2">
                  {currentChapter.timeLabel ||
                    currentChapter.circadianPeak ||
                    'Unknown'}
                </div>

              </div>

            </div>


            {/* -------------------------------- */}
            {/* LOCATION */}
            {/* -------------------------------- */}

            {currentChapter.dominantLocation && (

              <div className="flex items-center gap-2 text-xs font-mono text-stone-400">

                <MapPin className="w-4 h-4 text-rose-400" />

                Most recorded location:

                <span className="text-stone-200">
                  {currentChapter.dominantLocation}
                </span>

              </div>

            )}


            {/* -------------------------------- */}
            {/* RECEIPTS */}
            {/* -------------------------------- */}

            <div className="pt-6 border-t border-stone-800 space-y-5">

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">

                <div>

                  <div className="text-xs uppercase tracking-widest font-mono text-amber-400">
                    Chapter Evidence
                  </div>

                  <h3 className="font-serif text-2xl text-stone-100 mt-1">
                    Recorded Moments
                  </h3>

                  <p className="text-xs font-mono text-stone-500 mt-1">
                    Showing {Math.min(
                      visibleReceipts,
                      chapterReceipts.length
                    )}{' '}
                    of {chapterReceipts.length} moments
                  </p>

                </div>


                <button
                  onClick={() =>
                    setActiveView('story')
                  }
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-mono flex items-center gap-1.5"
                >

                  <FileText className="w-3.5 h-3.5 text-amber-400" />

                  Read as Prose

                </button>

              </div>


              {/* RECEIPT GRID */}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                {chapterReceipts
                  .slice(
                    0,
                    visibleReceipts
                  )
                  .map((receipt) => (
                    <ReceiptCard
                      key={receipt.id}
                      receipt={receipt}
                    />
                  ))}

              </div>


              {/* LOAD MORE */}

              {visibleReceipts <
                chapterReceipts.length && (

                <div className="flex justify-center pt-3">

                  <button
                    onClick={() =>
                      setVisibleReceipts(
                        (value) =>
                          value +
                          CHAPTER_PAGE_SIZE
                      )
                    }
                    className="px-7 py-3 rounded-xl bg-stone-900 border border-stone-700 hover:border-emerald-500/50 text-stone-300 hover:text-emerald-300 text-xs font-mono flex items-center gap-2 transition-all"
                  >

                    Load More Chapter Moments

                    <ChevronDown className="w-4 h-4" />

                  </button>

                </div>

              )}

            </div>

          </div>

        </section>

      )}

    </div>
  );
}