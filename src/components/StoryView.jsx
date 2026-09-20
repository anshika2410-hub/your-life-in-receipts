import React, { useState } from 'react';
import { useReceipts } from '../context/ReceiptContext';
import {
  FileText,
  Printer,
  Share2,
  Check,
  Receipt as ReceiptIcon,
  BookOpen,
  Sparkles,
  CalendarDays,
  MapPin,
  Database
} from 'lucide-react';
import { formatCurrency, formatShortDate } from '../utils/formatters';
import { sfx } from '../utils/audioFx';

export default function StoryView() {
  const {
    narrativeStory,
    receipts = [],
    setSelectedReceipt
  } = useReceipts();

  const [copied, setCopied] = useState(false);

  if (!narrativeStory) {
    return (
      <div className="p-10 text-center text-stone-500 font-mono">
        Story is being generated from your receipt data...
      </div>
    );
  }

  const chapters = narrativeStory.chapters || [];

  const handlePrint = () => {
    sfx.playPaperSlip();
    window.print();
  };

  const handleShare = async () => {
    sfx.playEureka();

    try {
      if (navigator.share) {
        await navigator.share({
          title: narrativeStory.title || 'Your Life in Receipts',
          text: 'My life story, reconstructed from my digital receipts.',
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      }
    } catch {
      // User cancelled share
    }
  };

  const totalRecords = receipts.length;

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24 animate-fade-in">

      {/* HERO */}
      <section className="relative overflow-hidden p-8 md:p-12 rounded-3xl bg-gradient-to-br from-amber-950/30 via-stone-900 to-stone-950 border border-amber-500/20 shadow-2xl">

        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-amber-500/5 blur-3xl" />

        <div className="relative space-y-5">

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">

            <div className="space-y-3">

              <div className="text-xs font-mono uppercase tracking-[0.2em] text-amber-400 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Your Life, In Receipts
              </div>

              <h1 className="font-serif text-4xl md:text-6xl font-black text-stone-100 tracking-tight">
                {narrativeStory.title || 'A Life in Receipts'}
              </h1>

              <p className="max-w-2xl font-serif italic text-lg text-stone-300 leading-relaxed">
                A chronological story reconstructed from the patterns,
                places, purchases and moments inside your dataset.
              </p>

            </div>

            {/* ACTIONS */}
            <div className="flex gap-2 no-print">

              <button
                onClick={handlePrint}
                className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 border border-stone-700 rounded-xl text-xs font-mono text-stone-300 flex items-center gap-2 transition"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>

              <button
                onClick={handleShare}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition"
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}

                {copied ? 'Copied' : 'Share'}
              </button>

            </div>

          </div>

          {/* STORY STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-5">

            <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800">
              <div className="text-[10px] font-mono uppercase text-stone-500">
                Records
              </div>

              <div className="text-2xl font-bold text-stone-100 mt-1">
                {totalRecords.toLocaleString()}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800">
              <div className="text-[10px] font-mono uppercase text-stone-500">
                Chapters
              </div>

              <div className="text-2xl font-bold text-amber-400 mt-1">
                {chapters.length}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800">
              <div className="text-[10px] font-mono uppercase text-stone-500">
                Story Beats
              </div>

              <div className="text-2xl font-bold text-purple-400 mt-1">
                {chapters.length}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800">
              <div className="text-[10px] font-mono uppercase text-stone-500">
                Data Source
              </div>

              <div className="text-sm font-bold text-cyan-400 mt-2 flex items-center gap-2">
                <Database className="w-4 h-4" />
                Real Dataset
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* STORY TIMELINE */}
      <div className="relative">

        {/* Timeline line */}
        <div className="hidden md:block absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-amber-500/60 via-purple-500/30 to-transparent" />

        <div className="space-y-10">

          {chapters.map((chapter, index) => {

            const highlightReceipts =
              chapter.highlightReceipts ||
              chapter.receipts ||
              [];

            const stats = chapter.stats || {};

            const count =
              chapter.count ||
              stats.count ||
              highlightReceipts.length ||
              0;

            const location =
              chapter.dominantLocation ||
              stats.topLocation ||
              chapter.location ||
              '';

            const category =
              chapter.dominantCategory ||
              stats.topCategory ||
              chapter.category ||
              '';

            const period =
              chapter.period ||
              chapter.title ||
              `Chapter ${index + 1}`;

            return (
              <article
                key={chapter.chapterId || chapter.id || index}
                className="relative md:pl-16"
              >

                {/* Timeline node */}
                <div className="hidden md:flex absolute left-0 top-8 w-12 h-12 rounded-full bg-stone-950 border border-amber-500/50 items-center justify-center shadow-lg shadow-amber-500/10">
                  <span className="font-mono text-xs text-amber-400 font-bold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="rounded-3xl overflow-hidden bg-gradient-to-b from-[#15151e] via-stone-900 to-[#0d0d12] border border-stone-800 shadow-xl">

                  {/* CHAPTER HEADER */}
                  <div className="p-7 md:p-9 border-b border-stone-800">

                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-widest">

                      <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        Chapter {index + 1}
                      </span>

                      {period && (
                        <span className="flex items-center gap-1.5 text-stone-500">
                          <CalendarDays className="w-3.5 h-3.5" />
                          {period}
                        </span>
                      )}

                    </div>

                    <h2 className="font-serif text-3xl md:text-4xl font-black text-stone-100 mt-4">
                      {chapter.title || `Chapter ${index + 1}`}
                    </h2>

                    {chapter.subtitle && (
                      <p className="font-serif italic text-lg text-stone-400 mt-2">
                        {chapter.subtitle}
                      </p>
                    )}

                    {/* METADATA */}
                    <div className="flex flex-wrap gap-2 mt-5">

                      {category && (
                        <span className="px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-xs font-mono text-purple-300">
                          {category}
                        </span>
                      )}

                      {location && (
                        <span className="px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-xs font-mono text-cyan-300 flex items-center gap-1.5">
                          <MapPin className="w-3 h-3" />
                          {location}
                        </span>
                      )}

                      <span className="px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-xs font-mono text-stone-400">
                        {count.toLocaleString()} records
                      </span>

                    </div>

                  </div>

                  {/* CHAPTER CONTENT */}
                  <div className="p-7 md:p-9 grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* STORY */}
                    <div className="lg:col-span-7 space-y-6">

                      {chapter.quote && (
                        <blockquote className="p-5 rounded-2xl bg-stone-950 border-l-4 border-amber-500 font-serif italic text-lg text-stone-200 leading-relaxed">
                          “{chapter.quote}”
                        </blockquote>
                      )}

                      <div className="font-serif text-base md:text-lg text-stone-200 leading-relaxed space-y-4">

                        <p>
                          {chapter.prose ||
                            chapter.description ||
                            `This chapter contains ${count.toLocaleString()} recorded moments from your dataset.`}
                        </p>

                      </div>

                      {/* CHAPTER METRICS */}
                      <div className="grid grid-cols-2 gap-3 pt-3">

                        <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
                          <div className="text-[10px] font-mono uppercase text-stone-500">
                            Recorded Moments
                          </div>

                          <div className="text-xl font-bold text-stone-100 mt-1">
                            {count.toLocaleString()}
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
                          <div className="text-[10px] font-mono uppercase text-stone-500">
                            Dominant Category
                          </div>

                          <div className="text-sm font-bold text-purple-300 mt-2 truncate">
                            {category || 'Mixed'}
                          </div>
                        </div>

                      </div>

                      <div className="pt-4 border-t border-dashed border-stone-800 text-xs font-mono text-stone-500 flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        This chapter is generated from recorded dataset activity,
                        not invented events.
                      </div>

                    </div>

                    {/* RECEIPTS */}
                    <div className="lg:col-span-5">

                      <div className="flex items-center justify-between mb-4">

                        <div>
                          <div className="text-xs font-mono uppercase tracking-widest text-stone-400 flex items-center gap-2">
                            <ReceiptIcon className="w-4 h-4 text-amber-400" />
                            Supporting Receipts
                          </div>

                          <div className="text-[11px] font-mono text-stone-600 mt-1">
                            Click any record to inspect it
                          </div>
                        </div>

                      </div>

                      <div className="space-y-3">

                        {highlightReceipts.slice(0, 5).map((receipt) => {

                          const amount =
                            receipt.total ??
                            receipt.amount ??
                            receipt.amt;

                          const name =
                            receipt.merchant ||
                            receipt.title ||
                            receipt.track_name ||
                            'Recorded Activity';

                          return (
                            <div
                              key={receipt.id}
                              onClick={() => {
                                sfx.playPaperSlip();
                                setSelectedReceipt(receipt);
                              }}
                              className="group cursor-pointer p-4 rounded-xl bg-stone-950 border border-stone-800 hover:border-amber-500/50 hover:-translate-y-0.5 transition-all"
                            >

                              <div className="flex items-start justify-between gap-3">

                                <div className="min-w-0">

                                  <div className="text-[10px] font-mono uppercase text-amber-400">
                                    {receipt.category || 'Record'}
                                  </div>

                                  <div className="font-serif font-bold text-sm text-stone-100 group-hover:text-amber-300 truncate mt-1">
                                    {name}
                                  </div>

                                </div>

                                {amount !== undefined && amount !== null && (
                                  <div className="text-sm font-mono font-bold text-stone-100 whitespace-nowrap">
                                    {formatCurrency(
                                      amount,
                                      receipt.currency || '$'
                                    )}
                                  </div>
                                )}

                              </div>

                              <div className="flex items-center justify-between gap-3 mt-2 text-[10px] font-mono text-stone-500">

                                <span>
                                  {formatShortDate(
                                    receipt.date ||
                                    receipt.timestamp ||
                                    receipt.ts
                                  )}
                                </span>

                                {receipt.location && (
                                  <span className="truncate">
                                    {receipt.location}
                                  </span>
                                )}

                              </div>

                              {receipt.artist_name && (
                                <div className="mt-2 text-[11px] text-pink-300 font-mono truncate">
                                  {receipt.artist_name}
                                </div>
                              )}

                            </div>
                          );
                        })}

                        {highlightReceipts.length === 0 && (
                          <div className="p-6 rounded-xl bg-stone-950 border border-stone-800 text-center">
                            <div className="text-xs font-mono text-stone-500">
                              No supporting records available.
                            </div>
                          </div>
                        )}

                      </div>

                    </div>

                  </div>

                </div>

              </article>
            );
          })}

        </div>

      </div>

      {/* FOOTER */}
      <div className="text-center pt-8 border-t border-stone-800">

        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-stone-500">
          <FileText className="w-4 h-4" />
          End of the recorded story
        </div>

        <p className="font-serif italic text-stone-600 mt-3">
          Every receipt is a small fragment. Together, they form a timeline.
        </p>

      </div>

    </div>
  );
}