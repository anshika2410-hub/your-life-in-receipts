import React, { useEffect, useMemo, useState } from 'react';
import { useReceipts } from '../context/ReceiptContext';
import { CATEGORIES } from '../types';

import {
  Search,
  ArrowUpDown,
  Receipt as ReceiptIcon,
  Tag,
  Coffee,
  Music,
  Moon,
  UtensilsCrossed,
  Compass,
  BookOpen,
  Cpu,
  Home,
  Plane,
  RotateCcw,
  ChevronDown
} from 'lucide-react';

import ReceiptCard from './ReceiptCard';
import { sfx } from '../utils/audioFx';

const ICON_MAP = {
  Sparkles: Compass,
  Coffee,
  Music,
  Moon,
  UtensilsCrossed,
  Compass,
  BookOpen,
  Cpu,
  Home,
  Plane
};

const PAGE_SIZE = 30;

export default function ReceiptExplorer() {
  const {
    filteredReceipts,
    receipts,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedMood,
    setSelectedMood,
    sortBy,
    setSortBy
  } = useReceipts();

  const [visibleCount, setVisibleCount] =
    useState(PAGE_SIZE);

  // ---------------------------------------
  // RESET PAGINATION WHEN FILTER CHANGES
  // ---------------------------------------

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [
    searchQuery,
    selectedCategory,
    selectedMood,
    sortBy
  ]);

  // ---------------------------------------
  // UNIQUE MOODS
  // ---------------------------------------

  const availableMoods = useMemo(() => {
    const moods = new Set();

    receipts.forEach((receipt) => {
      if (receipt?.mood) {
        moods.add(receipt.mood);
      }
    });

    return ['all', ...Array.from(moods)];
  }, [receipts]);

  // ---------------------------------------
  // CATEGORY COUNTS
  // ---------------------------------------

  const categoryCounts = useMemo(() => {
    const counts = {
      all: receipts.length
    };

    receipts.forEach((receipt) => {
      const category =
        receipt?.category || 'Other';

      counts[category] =
        (counts[category] || 0) + 1;
    });

    return counts;
  }, [receipts]);

  // ---------------------------------------
  // ONLY RENDER A SMALL WINDOW
  // ---------------------------------------

  const visibleReceipts = useMemo(() => {
    return filteredReceipts.slice(
      0,
      visibleCount
    );
  }, [filteredReceipts, visibleCount]);

  const hasMore =
    visibleCount < filteredReceipts.length;

  // ---------------------------------------
  // HANDLERS
  // ---------------------------------------

  const handleCategorySelect = (catId) => {
    sfx.playPaperSlip();
    setSelectedCategory(catId);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedMood('all');
    setSortBy('date-desc');
    setVisibleCount(PAGE_SIZE);
  };

  const handleLoadMore = () => {
    setVisibleCount(
      (previous) =>
        previous + PAGE_SIZE
    );
  };

  return (
    <div className="space-y-8 pb-16 animate-fade-in">

      {/* -------------------------------- */}
      {/* HEADER */}
      {/* -------------------------------- */}

      <div className="space-y-4">

        <div>

          <div className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-1 flex items-center gap-1.5">

            <ReceiptIcon className="w-4 h-4" />

            Archaeological Ledger

          </div>

          <h2 className="font-serif text-3xl md:text-4xl text-stone-100">
            Receipt Explorer
          </h2>

          <p className="text-sm font-serif italic text-stone-400 mt-1">
            Search and explore the recorded moments across your datasets.
          </p>

        </div>


        {/* -------------------------------- */}
        {/* SEARCH + FILTERS */}
        {/* -------------------------------- */}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">

          {/* SEARCH */}

          <div className="md:col-span-6 relative">

            <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />

            <input
              type="text"
              placeholder="Search merchants, artists, tracks, notes, tags, cities..."
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(
                  e.target.value
                )
              }
              className="w-full pl-10 pr-12 py-2.5 rounded-xl bg-stone-900/90 border border-stone-800 text-stone-100 placeholder-stone-500 text-xs md:text-sm font-mono focus:outline-none focus:border-amber-500/50 transition-colors"
            />

            {searchQuery && (
              <button
                onClick={() =>
                  setSearchQuery('')
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 text-xs font-mono"
              >
                clear
              </button>
            )}

          </div>


          {/* MOOD */}

          <div className="md:col-span-3">

            <select
              value={selectedMood}
              onChange={(e) =>
                setSelectedMood(
                  e.target.value
                )
              }
              className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 text-xs font-mono focus:outline-none focus:border-amber-500/50"
            >

              <option value="all">
                All Emotional Moods
              </option>

              {availableMoods
                .filter(
                  (mood) =>
                    mood !== 'all'
                )
                .map((mood) => (
                  <option
                    key={mood}
                    value={mood}
                  >
                    Vibe: {mood}
                  </option>
                ))}

            </select>

          </div>


          {/* SORT */}

          <div className="md:col-span-3">

            <div className="relative">

              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value
                  )
                }
                className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 text-xs font-mono focus:outline-none focus:border-amber-500/50 appearance-none"
              >

                <option value="date-desc">
                  Date: Newest First
                </option>

                <option value="date-asc">
                  Date: Oldest First
                </option>

                <option value="amount-desc">
                  Amount: Highest First
                </option>

                <option value="amount-asc">
                  Amount: Lowest First
                </option>

              </select>

              <ArrowUpDown className="w-3.5 h-3.5 text-stone-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />

            </div>

          </div>

        </div>


        {/* -------------------------------- */}
        {/* CATEGORY PILLS */}
        {/* -------------------------------- */}

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-1">

          {CATEGORIES.map((cat) => {

            const Icon =
              ICON_MAP[cat.icon] ||
              Tag;

            const isSelected =
              selectedCategory === cat.id;

            const count =
              categoryCounts[cat.id] ||
              0;

            return (
              <button
                key={cat.id}
                onClick={() =>
                  handleCategorySelect(
                    cat.id
                  )
                }
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-stone-900/80 hover:bg-stone-800 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >

                <Icon
                  className={`w-3.5 h-3.5 ${
                    isSelected
                      ? 'text-stone-950'
                      : 'text-stone-400'
                  }`}
                />

                <span>
                  {cat.label}
                </span>

                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-stone-950/20 text-stone-950'
                      : 'bg-stone-800 text-stone-400'
                  }`}
                >
                  {count.toLocaleString()}
                </span>

              </button>
            );
          })}

        </div>

      </div>


      {/* -------------------------------- */}
      {/* RESULTS BAR */}
      {/* -------------------------------- */}

      <div className="flex items-center justify-between text-xs font-mono text-stone-400 border-b border-stone-800 pb-3">

        <div>

          Showing{' '}

          <span className="text-amber-400 font-bold">
            {Math.min(
              visibleCount,
              filteredReceipts.length
            ).toLocaleString()}
          </span>

          {' '}of{' '}

          <span className="text-stone-300">
            {filteredReceipts.length.toLocaleString()}
          </span>

          {' '}matching receipts

          {selectedCategory !== 'all' && (
            <span>
              {' '}• Category:{' '}
              <strong className="text-stone-200">
                {selectedCategory}
              </strong>
            </span>
          )}

          {selectedMood !== 'all' && (
            <span>
              {' '}• Mood:{' '}
              <strong className="text-stone-200">
                {selectedMood}
              </strong>
            </span>
          )}

        </div>


        {(searchQuery ||
          selectedCategory !== 'all' ||
          selectedMood !== 'all') && (

          <button
            onClick={
              handleResetFilters
            }
            className="flex items-center gap-1 text-amber-400 hover:text-amber-300 hover:underline"
          >

            <RotateCcw className="w-3 h-3" />

            Reset Filters

          </button>

        )}

      </div>


      {/* -------------------------------- */}
      {/* RECEIPTS */}
      {/* -------------------------------- */}

      {visibleReceipts.length > 0 ? (

        <>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {visibleReceipts.map(
              (receipt) => (
                <ReceiptCard
                  key={receipt.id}
                  receipt={receipt}
                />
              )
            )}

          </div>


          {/* -------------------------------- */}
          {/* LOAD MORE */}
          {/* -------------------------------- */}

          {hasMore && (

            <div className="flex flex-col items-center gap-3 pt-4">

              <button
                onClick={
                  handleLoadMore
                }
                className="px-8 py-3 bg-stone-900 hover:bg-stone-800 border border-stone-700 hover:border-amber-500/50 text-stone-200 hover:text-amber-300 rounded-xl font-mono text-xs flex items-center gap-2 transition-all"
              >

                Load More Receipts

                <ChevronDown className="w-4 h-4" />

              </button>

              <span className="text-[11px] font-mono text-stone-500">

                {(
                  filteredReceipts.length -
                  visibleReceipts.length
                ).toLocaleString()}{' '}

                more matching records

              </span>

            </div>

          )}

        </>

      ) : (

        /* -------------------------------- */
        /* EMPTY STATE */
        /* -------------------------------- */

        <div className="text-center py-16 px-4 rounded-3xl bg-stone-900/30 border border-dashed border-stone-800 space-y-4">

          <ReceiptIcon className="w-12 h-12 text-stone-600 mx-auto" />

          <h3 className="font-serif text-xl text-stone-300">
            No matching memory receipts found
          </h3>

          <p className="text-xs font-mono text-stone-500 max-w-sm mx-auto">
            Try adjusting your search query or resetting your category filters.
          </p>

          <button
            onClick={
              handleResetFilters
            }
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-mono"
          >
            Clear All Filters
          </button>

        </div>

      )}

    </div>
  );
}