import React, { useMemo } from 'react';
import { useReceipts } from '../context/ReceiptContext';
import { formatCurrency } from '../utils/formatters';

import {
  Sparkles,
  Receipt as ReceiptIcon,
  BookOpen,
  GitFork,
  Compass,
  ArrowRight,
  Layers,
  MapPin,
  TrendingUp,
  Clock,
  Music2,
  CalendarDays,
  FileText
} from 'lucide-react';

import ReceiptCard from './ReceiptCard';

export default function Dashboard() {
  const {
    receipts,
    chapters,
    stats,
    hiddenPatterns,
    setActiveView,
    setSelectedChapterId,
    triggerRevealPattern,
    datasetName
  } = useReceipts();

  const collageReceipts = receipts.slice(0, 6);

  const featuredChapter = chapters[0];

  // ---------------------------------------
  // REAL DATA BEHAVIORAL SUMMARY
  // ---------------------------------------

  const behavioral = useMemo(() => {
    if (!receipts.length) {
      return {
        topCategory: 'No data',
        categoryCount: 0,
        topLocation: 'No location recorded',
        topArtist: 'No artist recorded',
        activePeriod: 'No time data',
        weekendShare: 0,
        avgAmount: 0
      };
    }

    // Category
    const categoryCounts = {};

    receipts.forEach((r) => {
      const category =
        r.category ||
        r.type ||
        'Other';

      categoryCounts[category] =
        (categoryCounts[category] || 0) + 1;
    });

    const topCategoryEntry =
      Object.entries(categoryCounts)
        .sort((a, b) => b[1] - a[1])[0];

    // Location
    const locationCounts = {};

    receipts.forEach((r) => {
      const location =
        r.location ||
        r.city ||
        r.state;

      if (!location) return;

      locationCounts[location] =
        (locationCounts[location] || 0) + 1;
    });

    const topLocationEntry =
      Object.entries(locationCounts)
        .sort((a, b) => b[1] - a[1])[0];

    // Artists
    const artistCounts = {};

    receipts.forEach((r) => {
      const artist =
        r.artist ||
        r.artist_name;

      if (!artist) return;

      artistCounts[artist] =
        (artistCounts[artist] || 0) + 1;
    });

    const topArtistEntry =
      Object.entries(artistCounts)
        .sort((a, b) => b[1] - a[1])[0];

    // Time of day
    const periodCounts = {
      'Late night': 0,
      Morning: 0,
      Afternoon: 0,
      Evening: 0
    };

    receipts.forEach((r) => {
      if (!r.date) return;

      const d = new Date(r.date);

      if (isNaN(d.getTime())) return;

      const hour = d.getHours();

      if (hour < 6) {
        periodCounts['Late night']++;
      } else if (hour < 12) {
        periodCounts.Morning++;
      } else if (hour < 18) {
        periodCounts.Afternoon++;
      } else {
        periodCounts.Evening++;
      }
    });

    const topPeriodEntry =
      Object.entries(periodCounts)
        .sort((a, b) => b[1] - a[1])[0];

    // Weekend percentage
    let datedRecords = 0;
    let weekendRecords = 0;

    receipts.forEach((r) => {
      if (!r.date) return;

      const d = new Date(r.date);

      if (isNaN(d.getTime())) return;

      datedRecords++;

      const day = d.getDay();

      if (day === 0 || day === 6) {
        weekendRecords++;
      }
    });

    const weekendShare =
      datedRecords > 0
        ? Math.round(
            (weekendRecords / datedRecords) * 100
          )
        : 0;

    // Average recorded amount
    const amounts = receipts
      .map((r) =>
        Number(
          r.total ??
          r.amount ??
          r.amt
        )
      )
      .filter(
        (value) =>
          Number.isFinite(value) &&
          value > 0
      );

    const avgAmount =
      amounts.length
        ? amounts.reduce(
            (sum, value) => sum + value,
            0
          ) / amounts.length
        : 0;

    return {
      topCategory:
        topCategoryEntry?.[0] ||
        'Other',

      categoryCount:
        topCategoryEntry?.[1] ||
        0,

      topLocation:
        topLocationEntry?.[0] ||
        'No location recorded',

      topArtist:
        topArtistEntry?.[0] ||
        'No artist recorded',

      activePeriod:
        topPeriodEntry?.[0] ||
        'No time data',

      periodCount:
        topPeriodEntry?.[1] ||
        0,

      weekendShare,

      avgAmount
    };
  }, [receipts]);

  // ---------------------------------------
  // REAL DATA NARRATIVE
  // ---------------------------------------

  const behavioralNarrative = useMemo(() => {
    if (!receipts.length) {
      return 'No recorded activity is available yet.';
    }

    const parts = [];

    if (behavioral.topCategory) {
      parts.push(
        `${behavioral.topCategory} is the most frequently recorded category`
      );
    }

    if (
      behavioral.activePeriod &&
      behavioral.activePeriod !== 'No time data'
    ) {
      parts.push(
        `with ${behavioral.activePeriod.toLowerCase()} activity appearing most often`
      );
    }

    if (
      behavioral.weekendShare > 0
    ) {
      parts.push(
        `${behavioral.weekendShare}% of dated records fall on weekends`
      );
    }

    return parts.join('. ') + '.';
  }, [behavioral, receipts]);

  // ---------------------------------------
  // CHAPTER DISPLAY DATA
  // ---------------------------------------

  const chapterPeriod = useMemo(() => {
    if (!featuredChapter) return '';

    const start = featuredChapter.startDate
      ? new Date(featuredChapter.startDate)
      : null;

    const end = featuredChapter.endDate
      ? new Date(featuredChapter.endDate)
      : null;

    if (
      !start ||
      !end ||
      isNaN(start.getTime()) ||
      isNaN(end.getTime())
    ) {
      return '';
    }

    const sameMonth =
      start.getMonth() === end.getMonth() &&
      start.getFullYear() === end.getFullYear();

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
        year: 'numeric'
      }
    )} – ${end.toLocaleDateString(
      'en-US',
      {
        month: 'short',
        year: 'numeric'
      }
    )}`;
  }, [featuredChapter]);

  return (
    <div className="space-y-12 pb-16 animate-fade-in">

      {/* -------------------------------- */}
      {/* HERO */}
      {/* -------------------------------- */}

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-[#13131a] to-[#0a0a0f] border border-stone-800 p-8 md:p-12 shadow-2xl">

        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">

            <Sparkles className="w-3.5 h-3.5 text-amber-400" />

            <span>
              Digital Memory Archaeology • Active: {datasetName}
            </span>

          </div>

          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-stone-100 tracking-tight leading-[1.15]">

            Don't just show what happened.

            <br />

            <span className="italic font-display text-amber-300 font-normal">
              Discover what it meant.
            </span>

          </h1>

          <p className="font-serif text-base md:text-lg text-stone-300 max-w-2xl leading-relaxed italic">
            Explore the patterns hidden inside transactions, household activity and listening history.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">

            <button
              onClick={() =>
                setActiveView('story')
              }
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-semibold font-mono text-sm rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <FileText className="w-4 h-4" />
              Read Personal Memoir
            </button>

            <button
              onClick={triggerRevealPattern}
              className="px-5 py-3 bg-stone-800 hover:bg-stone-700 border border-purple-500/40 text-purple-200 font-mono text-sm rounded-xl flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Compass className="w-4 h-4 text-purple-400" />
              Reveal Hidden Pattern
            </button>

            <button
              onClick={() =>
                setActiveView('explorer')
              }
              className="px-5 py-3 bg-stone-900/80 hover:bg-stone-800 border border-stone-700 text-stone-300 font-mono text-sm rounded-xl flex items-center gap-2 transition-all"
            >
              <ReceiptIcon className="w-4 h-4" />
              Browse All Receipts
            </button>

          </div>
        </div>
      </section>


      {/* -------------------------------- */}
      {/* CORE STATS */}
      {/* -------------------------------- */}

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

        <div
          onClick={() =>
            setActiveView('explorer')
          }
          className="group cursor-pointer p-6 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-amber-500/40 transition-all hover:bg-stone-900/90"
        >
          <div className="flex items-center justify-between text-stone-400 text-xs font-mono uppercase tracking-wider mb-2">
            <span>Total Moments</span>
            <ReceiptIcon className="w-4 h-4 text-amber-400" />
          </div>

          <div className="font-serif font-black text-3xl md:text-4xl text-stone-100">
            {stats.totalMoments}
          </div>

          <div className="text-xs font-mono text-stone-400 mt-2 flex items-center justify-between">
            <span>
              Recorded activity
            </span>

            <ArrowRight className="w-3.5 h-3.5 text-stone-500" />
          </div>
        </div>


        <div
          onClick={() =>
            setActiveView('chapters')
          }
          className="group cursor-pointer p-6 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-emerald-500/40 transition-all hover:bg-stone-900/90"
        >
          <div className="flex items-center justify-between text-stone-400 text-xs font-mono uppercase tracking-wider mb-2">
            <span>Life Chapters</span>
            <BookOpen className="w-4 h-4 text-emerald-400" />
          </div>

          <div className="font-serif font-black text-3xl md:text-4xl text-stone-100">
            {chapters.length}
          </div>

          <div className="text-xs font-mono text-stone-400 mt-2">
            Monthly activity clusters
          </div>
        </div>


        <div
          onClick={() =>
            setActiveView('connections')
          }
          className="group cursor-pointer p-6 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-cyan-500/40 transition-all hover:bg-stone-900/90"
        >
          <div className="flex items-center justify-between text-stone-400 text-xs font-mono uppercase tracking-wider mb-2">
            <span>Cross-Links</span>
            <GitFork className="w-4 h-4 text-cyan-400" />
          </div>

          <div className="font-serif font-black text-3xl md:text-4xl text-stone-100">
            {stats.totalConnections}
          </div>

          <div className="text-xs font-mono text-stone-400 mt-2">
            Explainable relationships
          </div>
        </div>


        <div
          onClick={() =>
            setActiveView('patterns')
          }
          className="group cursor-pointer p-6 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-purple-500/40 transition-all hover:bg-stone-900/90"
        >
          <div className="flex items-center justify-between text-stone-400 text-xs font-mono uppercase tracking-wider mb-2">
            <span>Hidden Patterns</span>
            <Compass className="w-4 h-4 text-purple-400" />
          </div>

          <div className="font-serif font-black text-3xl md:text-4xl text-stone-100">
            {hiddenPatterns.length}
          </div>

          <div className="text-xs font-mono text-stone-400 mt-2">
            Dataset-derived signals
          </div>
        </div>

      </section>


      {/* -------------------------------- */}
      {/* MEMORY WALL */}
      {/* -------------------------------- */}

      <section className="space-y-6">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">

          <div>

            <div className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-1 flex items-center gap-1.5">

              <Layers className="w-4 h-4" />

              The Forensic Memory Wall

            </div>

            <h2 className="font-serif text-2xl md:text-3xl text-stone-100">
              Scattered Artifacts & Living Slips
            </h2>

          </div>

          <button
            onClick={() =>
              setActiveView('explorer')
            }
            className="text-xs font-mono text-stone-400 hover:text-amber-400 flex items-center gap-1"
          >
            Inspect All {receipts.length} Artifacts
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">

          {collageReceipts.map(
            (receipt) => (
              <ReceiptCard
                key={receipt.id}
                receipt={receipt}
              />
            )
          )}

        </div>

      </section>


      {/* -------------------------------- */}
      {/* CHAPTER + BEHAVIOR */}
      {/* -------------------------------- */}

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* FEATURED CHAPTER */}

        {featuredChapter && (

          <div className="lg:col-span-2 p-8 rounded-3xl bg-stone-900/80 border border-stone-800 space-y-6 relative overflow-hidden">

            <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">

              <BookOpen className="w-4 h-4" />

              Featured Life Chapter

            </div>


            <div>

              <span className="text-xs font-mono text-stone-400">
                {chapterPeriod}
              </span>

              <h3 className="font-serif font-bold text-2xl md:text-3xl text-stone-100 mt-1">
                {featuredChapter.title}
              </h3>

              <p className="text-sm text-stone-400 italic mt-1 font-serif">
                {featuredChapter.subtitle}
              </p>

            </div>


            <blockquote className="p-4 rounded-xl bg-stone-950/60 border-l-4 border-amber-500 text-stone-300 font-serif italic text-base leading-relaxed">
              {featuredChapter.quote}
            </blockquote>


            <p className="text-sm text-stone-300 leading-relaxed font-sans">
              {featuredChapter.description}
            </p>


            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">

              <div className="p-3 rounded-lg bg-stone-950 border border-stone-800/80">

                <span className="text-stone-500 text-[10px] uppercase block">
                  Recorded Value
                </span>

                <span className="text-stone-200 font-bold text-sm">
                  {formatCurrency(
                    featuredChapter.financialFootprint || 0
                  )}
                </span>

              </div>


              <div className="p-3 rounded-lg bg-stone-950 border border-stone-800/80">

                <span className="text-stone-500 text-[10px] uppercase block">
                  Activity Index
                </span>

                <span className="text-emerald-400 font-bold text-sm">
                  {featuredChapter.vibeScore || 0}/100
                </span>

              </div>


              <div className="p-3 rounded-lg bg-stone-950 border border-stone-800/80 col-span-2 sm:col-span-1">

                <span className="text-stone-500 text-[10px] uppercase block">
                  Active Period
                </span>

                <span className="text-stone-200 font-bold text-sm truncate block">
                  {featuredChapter.circadianPeak || 'Unknown'}
                </span>

              </div>

            </div>


            <div className="pt-2">

              <button
                onClick={() => {
                  setSelectedChapterId(
                    featuredChapter.id
                  );

                  setActiveView(
                    'chapters'
                  );
                }}
                className="px-5 py-2.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-mono font-medium flex items-center gap-2"
              >
                Explore All Life Chapters
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </div>

          </div>

        )}


        {/* BEHAVIORAL RADAR */}

        <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-950/30 to-stone-900 border border-purple-500/30 space-y-5 flex flex-col justify-between">

          <div className="space-y-3">

            <div className="flex items-center justify-between">

              <span className="text-xs font-mono uppercase tracking-widest text-purple-400 flex items-center gap-1">

                <Compass className="w-3.5 h-3.5" />

                Behavioral Radar

              </span>

              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/20 text-purple-300">
                Dataset Derived
              </span>

            </div>


            <h3 className="font-serif font-bold text-xl text-stone-100">
              What Your Data Reveals
            </h3>


            <p className="text-xs text-stone-300 font-sans leading-relaxed">
              {behavioralNarrative}
            </p>


            <div className="space-y-2 pt-2">

              {/* CATEGORY */}

              <div className="p-3 rounded-lg bg-stone-950/70 border border-purple-500/20 text-xs font-mono text-stone-300">

                <span className="text-purple-400 font-bold block mb-1">
                  Dominant Category
                </span>

                {behavioral.topCategory}
                {' '}
                ({Number(behavioral.categoryCount || 0).toLocaleString()} records)

              </div>


              {/* TIME */}

              <div className="p-3 rounded-lg bg-stone-950/70 border border-purple-500/20 text-xs font-mono text-stone-300">

                <span className="text-purple-400 font-bold block mb-1">
                  Most Active Period
                </span>

                {behavioral.activePeriod}
                {' '}
                ({Number(behavioral.periodCount || 0).toLocaleString()} records)

              </div>


              {/* LOCATION */}

              <div className="p-3 rounded-lg bg-stone-950/70 border border-purple-500/20 text-xs font-mono text-stone-300">

                <span className="text-purple-400 font-bold block mb-1">
                  Frequent Location
                </span>

                {behavioral.topLocation}

              </div>


              {/* ARTIST */}

              {behavioral.topArtist !==
                'No artist recorded' && (

                <div className="p-3 rounded-lg bg-stone-950/70 border border-purple-500/20 text-xs font-mono text-stone-300">

                  <span className="text-purple-400 font-bold block mb-1">
                    Most Repeated Artist
                  </span>

                  {behavioral.topArtist}

                </div>

              )}


              {/* WEEKEND */}

              <div className="p-3 rounded-lg bg-stone-950/70 border border-purple-500/20 text-xs font-mono text-stone-300">

                <span className="text-purple-400 font-bold block mb-1">
                  Weekend Share
                </span>

                {behavioral.weekendShare}% of dated records

              </div>

            </div>

          </div>


          <button
            onClick={triggerRevealPattern}
            className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-stone-950 font-bold font-mono text-xs rounded-xl shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
          >

            <Sparkles className="w-4 h-4" />

            Reveal Next Hidden Pattern

          </button>

        </div>

      </section>

    </div>
  );
}