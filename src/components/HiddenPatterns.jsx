import React, { useEffect, useMemo, useState } from 'react';
import { useReceipts } from '../context/ReceiptContext';
import {
  Compass,
  Sparkles,
  MapPin,
  Music,
  Clock3,
  Wallet,
  Layers,
  ArrowRight,
  Database,
  Activity,
  Eye
} from 'lucide-react';
import ReceiptCard from './ReceiptCard';
import confetti from 'canvas-confetti';

const TYPE_META = {
  category: {
    label: 'Category Pattern',
    icon: Layers,
    color: 'text-purple-400'
  },
  location: {
    label: 'Location Pattern',
    icon: MapPin,
    color: 'text-cyan-400'
  },
  spending: {
    label: 'Spending Pattern',
    icon: Wallet,
    color: 'text-amber-400'
  },
  music: {
    label: 'Music Pattern',
    icon: Music,
    color: 'text-pink-400'
  },
  time: {
    label: 'Time Pattern',
    icon: Clock3,
    color: 'text-blue-400'
  }
};

export default function HiddenPatterns() {
  const {
    hiddenPatterns = [],
    receipts = [],
    revealedPatternIndex,
    setRevealedPatternIndex,
    isScanningPatterns,
    triggerRevealPattern,
    setActiveView
  } = useReceipts();

  const [visibleEvidence, setVisibleEvidence] = useState(6);

  const activeIndex =
    revealedPatternIndex !== null && revealedPatternIndex !== undefined
      ? revealedPatternIndex
      : 0;

  const activePattern = hiddenPatterns[activeIndex];

  useEffect(() => {
    setVisibleEvidence(6);
  }, [activeIndex]);

  useEffect(() => {
    if (revealedPatternIndex !== null && revealedPatternIndex !== undefined) {
      try {
        confetti({
          particleCount: 45,
          spread: 55,
          origin: { y: 0.7 },
          colors: ['#a855f7', '#ec4899', '#06b6d4']
        });
      } catch {}
    }
  }, [revealedPatternIndex]);

  const patternReceipts = useMemo(() => {
    if (!activePattern) return [];

    const evidence = activePattern.evidence || [];

    // Prefer IDs from evidence
    const evidenceIds = new Set(
      evidence
        .map(item => item?.id)
        .filter(Boolean)
    );

    if (evidenceIds.size > 0) {
      return receipts.filter(r => evidenceIds.has(r.id));
    }

    return [];
  }, [activePattern, receipts]);

  const visibleReceipts = patternReceipts.slice(0, visibleEvidence);

  const strengthPercent = Math.round(
    Math.max(0, Math.min(1, Number(activePattern?.strength) || 0)) * 100
  );

  return (
    <div className="space-y-10 pb-16 animate-fade-in">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-8 rounded-3xl bg-gradient-to-r from-purple-950/40 via-stone-900 to-stone-900 border border-purple-500/30 shadow-xl">

        <div className="space-y-3 max-w-2xl">
          <div className="text-xs font-mono uppercase tracking-widest text-purple-400 flex items-center gap-2">
            <Compass className="w-4 h-4" />
            Dataset Pattern Analysis
          </div>

          <h2 className="font-serif text-3xl md:text-4xl text-stone-100">
            Hidden Patterns
          </h2>

          <p className="text-sm font-serif italic text-stone-300 leading-relaxed">
            Discover recurring patterns across categories, locations, spending,
            music and time using your actual receipt history.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <div className="px-3 py-2 rounded-xl bg-stone-950/70 border border-stone-800 text-xs font-mono text-stone-400 flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-purple-400" />
              {receipts.length.toLocaleString()} records analyzed
            </div>

            <div className="px-3 py-2 rounded-xl bg-stone-950/70 border border-stone-800 text-xs font-mono text-stone-400 flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              {hiddenPatterns.length} patterns detected
            </div>
          </div>
        </div>

        {/* REVEAL BUTTON */}
        <div>
          <button
            onClick={triggerRevealPattern}
            disabled={isScanningPatterns || hiddenPatterns.length === 0}
            className={`w-full lg:w-auto px-8 py-4 rounded-2xl font-mono font-bold text-sm tracking-wide shadow-2xl flex items-center justify-center gap-3 transition-all duration-300 ${
              isScanningPatterns
                ? 'bg-purple-800 text-purple-200 animate-pulse cursor-wait'
                : 'bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white hover:scale-105 active:scale-95'
            }`}
          >
            <Sparkles
              className={`w-5 h-5 ${
                isScanningPatterns ? 'animate-spin' : 'animate-bounce'
              }`}
            />

            {isScanningPatterns
              ? 'Analyzing Dataset...'
              : 'Reveal a Hidden Pattern'}
          </button>

          <div className="text-center lg:text-right text-[11px] font-mono text-purple-300/80 mt-2">
            {hiddenPatterns.length} patterns discovered
          </div>
        </div>
      </div>

      {/* PATTERN SELECTOR */}
      {hiddenPatterns.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">

          {hiddenPatterns.map((pattern, index) => {
            const meta = TYPE_META[pattern.type] || {
              label: 'Data Pattern',
              icon: Sparkles,
              color: 'text-purple-400'
            };

            const Icon = meta.icon;

            const selected = index === activeIndex;

            const strength = Math.round(
              Math.max(0, Math.min(1, Number(pattern.strength) || 0)) * 100
            );

            return (
              <button
                key={pattern.id || index}
                onClick={() => setRevealedPatternIndex(index)}
                className={`text-left p-4 rounded-2xl border transition-all duration-300 ${
                  selected
                    ? 'bg-stone-900 border-purple-500 shadow-lg shadow-purple-500/10 scale-[1.02]'
                    : 'bg-stone-900/40 hover:bg-stone-900/80 border-stone-800'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500">
                    Pattern #{index + 1}
                  </span>

                  <span className="text-[10px] font-mono font-bold text-purple-300">
                    {strength}%
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${meta.color} shrink-0`} />

                  <span className="font-serif font-bold text-sm text-stone-100 line-clamp-2">
                    {pattern.title}
                  </span>
                </div>

                <div className="text-[10px] font-mono text-stone-500 mt-2">
                  {meta.label}
                </div>
              </button>
            );
          })}

        </div>
      )}

      {/* ACTIVE PATTERN */}
      {activePattern && (
        <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-b from-[#16131f] via-stone-900 to-[#0e0e14] border border-purple-500/30 shadow-2xl space-y-8">

          {/* TITLE */}
          <div className="space-y-4 max-w-4xl">

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />

              {TYPE_META[activePattern.type]?.label || 'Data Pattern'}

              <span className="text-stone-600">•</span>

              {patternReceipts.length} supporting records
            </div>

            <h3 className="font-serif text-3xl md:text-5xl text-stone-100">
              {activePattern.title}
            </h3>

            <p className="font-serif italic text-lg text-stone-200 leading-relaxed">
              {activePattern.description}
            </p>
          </div>

          {/* PATTERN STRENGTH */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-stone-500">
                <Activity className="w-4 h-4 text-purple-400" />
                Pattern Strength
              </div>

              <div className="text-3xl font-bold text-purple-400 mt-2">
                {strengthPercent}%
              </div>

              <div className="h-1.5 bg-stone-800 rounded-full mt-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  style={{ width: `${strengthPercent}%` }}
                />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800">
              <div className="text-[10px] font-mono uppercase tracking-wider text-stone-500">
                Pattern Type
              </div>

              <div className="text-lg font-serif font-bold text-stone-100 mt-2 capitalize">
                {activePattern.type || 'General'}
              </div>

              <div className="text-xs font-mono text-stone-500 mt-1">
                Derived from your receipt dataset
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800">
              <div className="text-[10px] font-mono uppercase tracking-wider text-stone-500">
                Evidence
              </div>

              <div className="text-3xl font-bold text-cyan-400 mt-2">
                {patternReceipts.length}
              </div>

              <div className="text-xs font-mono text-stone-500 mt-1">
                matching records
              </div>
            </div>

          </div>

          {/* INTERPRETATION */}
          <div className="p-6 rounded-2xl bg-purple-950/20 border border-purple-500/30 space-y-2">

            <div className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              What the data shows
            </div>

            <p className="font-serif text-base text-stone-200 leading-relaxed">
              This pattern is derived from repeated observations in the
              available dataset. The evidence below shows the actual records
              contributing to the pattern.
            </p>

          </div>

          {/* EVIDENCE */}
          <div className="space-y-5 pt-4 border-t border-stone-800">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

              <div>
                <h4 className="font-serif text-2xl text-stone-100 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-purple-400" />
                  Supporting Evidence
                </h4>

                <p className="text-xs font-mono text-stone-400 mt-1">
                  {patternReceipts.length} records linked to this pattern
                </p>
              </div>

              <button
                onClick={() => setActiveView('explorer')}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-mono flex items-center gap-2"
              >
                Inspect in Explorer
                <ArrowRight className="w-3 h-3" />
              </button>

            </div>

            {patternReceipts.length > 0 ? (

              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                  {visibleReceipts.map(receipt => (
                    <ReceiptCard
                      key={receipt.id}
                      receipt={receipt}
                    />
                  ))}

                </div>

                {visibleEvidence < patternReceipts.length && (
                  <div className="flex justify-center pt-4">
                    <button
                      onClick={() =>
                        setVisibleEvidence(prev => prev + 6)
                      }
                      className="px-6 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-xs font-mono transition"
                    >
                      Load More Evidence
                    </button>
                  </div>
                )}
              </>

            ) : (

              <div className="p-8 rounded-2xl bg-stone-950 border border-stone-800 text-center">

                <div className="text-stone-500 font-mono text-sm">
                  No individual receipt records available for this pattern.
                </div>

              </div>

            )}

          </div>

        </div>
      )}

      {/* EMPTY STATE */}
      {hiddenPatterns.length === 0 && (
        <div className="p-12 rounded-3xl bg-stone-900 border border-stone-800 text-center">

          <Sparkles className="w-10 h-10 text-purple-400 mx-auto mb-4" />

          <h3 className="font-serif text-2xl text-stone-100">
            No patterns detected yet
          </h3>

          <p className="text-sm font-mono text-stone-500 mt-2">
            Load more data to generate dataset-derived patterns.
          </p>

        </div>
      )}

    </div>
  );
}