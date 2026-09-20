import React, { useEffect, useMemo, useState } from 'react';
import { useReceipts } from '../context/ReceiptContext';

import {
  GitFork,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronDown,
  Clock3,
  MapPin,
  Music2,
  Receipt as ReceiptIcon,
  Link2
} from 'lucide-react';

import ReceiptCard from './ReceiptCard';
import { sfx } from '../utils/audioFx';

const PAGE_SIZE = 20;

export default function ConnectionDiscovery() {
  const {
    dynamicConnections,
    receipts,
    setSelectedReceipt
  } = useReceipts();

  const [activeConnectionId, setActiveConnectionId] =
    useState(null);

  const [visibleCount, setVisibleCount] =
    useState(PAGE_SIZE);

  // -----------------------------------------
  // VALID CONNECTIONS ONLY
  // -----------------------------------------

  const connections = useMemo(() => {
    return (dynamicConnections || []).filter(
      (connection) =>
        connection?.sourceReceipt &&
        connection?.targetReceipt
    );
  }, [dynamicConnections]);

  // -----------------------------------------
  // RESET PAGINATION WHEN DATA CHANGES
  // -----------------------------------------

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);

    setActiveConnectionId(
      connections[0]?.id || null
    );
  }, [connections]);

  // -----------------------------------------
  // VISIBLE CONNECTIONS
  // -----------------------------------------

  const visibleConnections = useMemo(() => {
    return connections.slice(
      0,
      visibleCount
    );
  }, [connections, visibleCount]);

  const activeConnection = useMemo(() => {
    return (
      connections.find(
        (connection) =>
          connection.id ===
          activeConnectionId
      ) ||
      connections[0] ||
      null
    );
  }, [
    connections,
    activeConnectionId
  ]);

  // -----------------------------------------
  // CATEGORY SUMMARY
  // -----------------------------------------

  const categoryPairs = useMemo(() => {
    const map = {};

    connections.forEach((connection) => {
      const source =
        connection.sourceReceipt?.category ||
        'Other';

      const target =
        connection.targetReceipt?.category ||
        'Other';

      const key =
        source < target
          ? `${source} → ${target}`
          : `${target} → ${source}`;

      map[key] =
        (map[key] || 0) + 1;
    });

    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [connections]);

  // -----------------------------------------
  // HELPERS
  // -----------------------------------------

  const formatDate = (value) => {
    if (!value) return 'Unknown date';

    const date = new Date(value);

    if (isNaN(date.getTime())) {
      return String(value);
    }

    return date.toLocaleDateString(
      'en-US',
      {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }
    );
  };

  const formatTime = (value) => {
    if (!value) return '';

    const date = new Date(value);

    if (isNaN(date.getTime())) {
      return '';
    }

    return date.toLocaleTimeString(
      'en-US',
      {
        hour: 'numeric',
        minute: '2-digit'
      }
    );
  };

  const getTitle = (receipt) => {
    return (
      receipt?.merchant ||
      receipt?.title ||
      receipt?.track ||
      receipt?.artist ||
      'Life Moment'
    );
  };

  const selectConnection = (connection) => {
    sfx.playPaperSlip();

    setActiveConnectionId(
      connection.id
    );
  };

  const openReceipt = (receipt) => {
    setSelectedReceipt(receipt);
  };

  // -----------------------------------------
  // EMPTY STATE
  // -----------------------------------------

  if (!connections.length) {
    return (
      <div className="space-y-8 pb-16 animate-fade-in">

        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-1 flex items-center gap-1.5">
            <GitFork className="w-4 h-4" />
            Connect the Dots
          </div>

          <h2 className="font-serif text-3xl md:text-4xl text-stone-100">
            Connection Discovery
          </h2>

          <p className="text-sm font-serif italic text-stone-400 mt-1">
            No cross-domain relationships have been detected yet.
          </p>
        </div>

        <div className="py-20 text-center rounded-3xl bg-stone-900/40 border border-dashed border-stone-800">

          <GitFork className="w-12 h-12 text-stone-600 mx-auto mb-4" />

          <h3 className="font-serif text-xl text-stone-300">
            No connections found
          </h3>

          <p className="text-xs font-mono text-stone-500 mt-2">
            Connections require related records across different categories.
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="space-y-10 pb-16 animate-fade-in">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div>

        <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-1 flex items-center gap-1.5">

          <GitFork className="w-4 h-4" />

          Connect the Dots

        </div>

        <h2 className="font-serif text-3xl md:text-4xl text-stone-100">
          Connection Discovery
        </h2>

        <p className="text-sm font-serif italic text-stone-400 mt-1 max-w-2xl">
          Discover relationships between different parts of the recorded timeline — based on actual dates, categories and activity.
        </p>

      </div>


      {/* ================================================= */}
      {/* SUMMARY */}
      {/* ================================================= */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        {/* CONNECTIONS */}

        <div className="p-5 rounded-2xl bg-stone-900/60 border border-cyan-500/20">

          <div className="flex items-center justify-between">

            <span className="text-[10px] uppercase tracking-widest font-mono text-stone-500">
              Connections
            </span>

            <Link2 className="w-4 h-4 text-cyan-400" />

          </div>

          <div className="font-serif text-3xl text-stone-100 mt-2">
            {connections.length.toLocaleString()}
          </div>

          <div className="text-[10px] font-mono text-stone-500 mt-1">
            detected relationships
          </div>

        </div>


        {/* DATASET */}

        <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800">

          <div className="flex items-center justify-between">

            <span className="text-[10px] uppercase tracking-widest font-mono text-stone-500">
              Records
            </span>

            <ReceiptIcon className="w-4 h-4 text-amber-400" />

          </div>

          <div className="font-serif text-3xl text-stone-100 mt-2">
            {receipts.length.toLocaleString()}
          </div>

          <div className="text-[10px] font-mono text-stone-500 mt-1">
            source artifacts
          </div>

        </div>


        {/* STRONG CONNECTIONS */}

        <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800">

          <div className="flex items-center justify-between">

            <span className="text-[10px] uppercase tracking-widest font-mono text-stone-500">
              Direct Links
            </span>

            <Sparkles className="w-4 h-4 text-purple-400" />

          </div>

          <div className="font-serif text-3xl text-stone-100 mt-2">

            {
              connections.filter(
                (connection) =>
                  connection.strength >= 0.9
              ).length.toLocaleString()
            }

          </div>

          <div className="text-[10px] font-mono text-stone-500 mt-1">
            same-day relationships
          </div>

        </div>


        {/* DOMAINS */}

        <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800">

          <div className="flex items-center justify-between">

            <span className="text-[10px] uppercase tracking-widest font-mono text-stone-500">
              Cross Domain
            </span>

            <Layers className="w-4 h-4 text-emerald-400" />

          </div>

          <div className="font-serif text-3xl text-stone-100 mt-2">
            {
              connections.filter(
                (connection) =>
                  connection.sourceReceipt
                    ?.category !==
                  connection.targetReceipt
                    ?.category
              ).length.toLocaleString()
            }
          </div>

          <div className="text-[10px] font-mono text-stone-500 mt-1">
            different categories
          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* CATEGORY RELATIONSHIPS */}
      {/* ================================================= */}

      {categoryPairs.length > 0 && (

        <section className="p-6 rounded-2xl bg-stone-900/50 border border-stone-800">

          <div className="flex items-center gap-2 mb-4">

            <Layers className="w-4 h-4 text-cyan-400" />

            <h3 className="font-serif text-xl text-stone-100">
              What Connects Across Domains
            </h3>

          </div>

          <div className="flex flex-wrap gap-2">

            {categoryPairs.map(
              ([pair, count]) => (

                <div
                  key={pair}
                  className="px-4 py-2 rounded-xl bg-stone-950 border border-stone-800 font-mono text-xs text-stone-300"
                >

                  <span className="text-cyan-300">
                    {pair}
                  </span>

                  <span className="ml-2 text-stone-500">
                    {count.toLocaleString()}
                  </span>

                </div>

              )
            )}

          </div>

        </section>

      )}


      {/* ================================================= */}
      {/* ACTIVE CONNECTION */}
      {/* ================================================= */}

      {activeConnection && (

        <section className="rounded-3xl overflow-hidden border border-cyan-500/20 bg-gradient-to-br from-stone-900 via-[#11131b] to-[#0c0c11] shadow-2xl">

          <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />

          <div className="p-7 md:p-10">

            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400">

              <Sparkles className="w-4 h-4" />

              Detected Relationship

            </div>


            <h3 className="font-serif text-2xl md:text-4xl text-stone-100 mt-3">
              Two Moments. One Connection.
            </h3>


            <p className="text-sm text-stone-400 mt-2 max-w-2xl">
              {activeConnection.narrative ||
                'These records occurred close together in the recorded timeline.'}
            </p>


            {/* TWO RECEIPTS */}

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-5 items-center mt-8">

              {/* SOURCE */}

              <div
                onClick={() =>
                  openReceipt(
                    activeConnection.sourceReceipt
                  )
                }
                className="cursor-pointer"
              >

                <ReceiptCard
                  receipt={
                    activeConnection.sourceReceipt
                  }
                />

              </div>


              {/* CONNECTION */}

              <div className="flex lg:flex-col items-center justify-center gap-2">

                <div className="w-11 h-11 rounded-full bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center">

                  <GitFork className="w-5 h-5 text-cyan-400" />

                </div>

                <ArrowRight className="hidden lg:block w-6 h-6 text-cyan-400" />

                <span className="text-[10px] font-mono text-cyan-300 whitespace-nowrap">
                  {activeConnection.type ||
                    'Connected'}
                </span>

              </div>


              {/* TARGET */}

              <div
                onClick={() =>
                  openReceipt(
                    activeConnection.targetReceipt
                  )
                }
                className="cursor-pointer"
              >

                <ReceiptCard
                  receipt={
                    activeConnection.targetReceipt
                  }
                />

              </div>

            </div>


            {/* CONNECTION METADATA */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-7">

              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">

                <div className="text-[10px] uppercase tracking-wider font-mono text-stone-500">
                  Source
                </div>

                <div className="text-xs text-stone-200 mt-1 truncate">
                  {getTitle(
                    activeConnection.sourceReceipt
                  )}
                </div>

              </div>


              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">

                <div className="text-[10px] uppercase tracking-wider font-mono text-stone-500">
                  Target
                </div>

                <div className="text-xs text-stone-200 mt-1 truncate">
                  {getTitle(
                    activeConnection.targetReceipt
                  )}
                </div>

              </div>


              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">

                <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-mono text-stone-500">

                  <Clock3 className="w-3 h-3" />

                  Timeline

                </div>

                <div className="text-xs text-stone-200 mt-1">
                  {formatDate(
                    activeConnection
                      .sourceReceipt?.date
                  )}
                </div>

              </div>


              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">

                <div className="text-[10px] uppercase tracking-wider font-mono text-stone-500">
                  Strength
                </div>

                <div className="text-cyan-300 font-bold text-sm mt-1">
                  {Math.round(
                    (activeConnection.strength ||
                      0) * 100
                  )}
                  %
                </div>

              </div>

            </div>

          </div>

        </section>

      )}


      {/* ================================================= */}
      {/* CONNECTION LEDGER */}
      {/* ================================================= */}

      <section className="space-y-4">

        <div className="flex items-end justify-between">

          <div>

            <div className="text-xs uppercase tracking-widest font-mono text-cyan-400">
              Relationship Ledger
            </div>

            <h3 className="font-serif text-2xl text-stone-100 mt-1">
              Detected Connections
            </h3>

            <p className="text-xs font-mono text-stone-500 mt-1">
              Showing{' '}
              {Math.min(
                visibleCount,
                connections.length
              ).toLocaleString()}{' '}
              of{' '}
              {connections.length.toLocaleString()}
            </p>

          </div>

        </div>


        <div className="space-y-2">

          {visibleConnections.map(
            (connection, index) => {

              const source =
                connection.sourceReceipt;

              const target =
                connection.targetReceipt;

              const isActive =
                connection.id ===
                activeConnectionId;

              return (
                <button
                  key={
                    connection.id ||
                    `connection-${index}`
                  }
                  onClick={() =>
                    selectConnection(
                      connection
                    )
                  }
                  className={`
                    w-full
                    text-left
                    p-4
                    rounded-xl
                    border
                    transition-all
                    ${
                      isActive
                        ? 'bg-cyan-500/10 border-cyan-500/50'
                        : 'bg-stone-950 border-stone-800 hover:border-cyan-500/30 hover:bg-stone-900'
                    }
                  `}
                >

                  <div className="flex flex-col md:flex-row md:items-center gap-3">

                    {/* SOURCE */}

                    <div className="flex items-center gap-2 min-w-0 flex-1">

                      <span className="px-2 py-1 rounded-lg bg-stone-900 border border-stone-800 text-[9px] font-mono text-amber-300 shrink-0">
                        {source?.category ||
                          'Other'}
                      </span>

                      <span className="font-serif text-sm text-stone-200 truncate">
                        {getTitle(source)}
                      </span>

                    </div>


                    {/* ARROW */}

                    <div className="flex items-center gap-2 shrink-0">

                      <ArrowRight className="w-4 h-4 text-cyan-400" />

                      <span className="text-[9px] font-mono text-stone-600">
                        {connection.type ||
                          'LINK'}
                      </span>

                    </div>


                    {/* TARGET */}

                    <div className="flex items-center gap-2 min-w-0 flex-1">

                      <span className="px-2 py-1 rounded-lg bg-stone-900 border border-stone-800 text-[9px] font-mono text-cyan-300 shrink-0">
                        {target?.category ||
                          'Other'}
                      </span>

                      <span className="font-serif text-sm text-stone-200 truncate">
                        {getTitle(target)}
                      </span>

                    </div>


                    {/* DATE */}

                    <div className="text-[10px] font-mono text-stone-500 shrink-0">

                      {formatDate(
                        source?.date
                      )}

                    </div>

                  </div>

                </button>
              );
            }
          )}

        </div>


        {/* LOAD MORE */}

        {visibleCount <
          connections.length && (

          <div className="flex flex-col items-center gap-2 pt-3">

            <button
              onClick={() =>
                setVisibleCount(
                  (value) =>
                    value + PAGE_SIZE
                )
              }
              className="px-7 py-3 rounded-xl bg-stone-900 border border-stone-700 hover:border-cyan-500/50 text-stone-300 hover:text-cyan-300 font-mono text-xs flex items-center gap-2 transition-all"
            >

              Load More Connections

              <ChevronDown className="w-4 h-4" />

            </button>

            <span className="text-[10px] font-mono text-stone-600">
              {(
                connections.length -
                visibleConnections.length
              ).toLocaleString()}{' '}
              remaining
            </span>

          </div>

        )}

      </section>

    </div>
  );
}