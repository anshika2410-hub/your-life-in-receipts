import React from 'react';
import { useReceipts } from '../context/ReceiptContext';
import {
  Sparkles,
  Receipt,
  BookOpen,
  GitFork,
  Volume2,
  VolumeX,
  Compass,
  FileText
} from 'lucide-react';

export default function Navbar() {
  const {
    activeView,
    setActiveView,
    isSoundEnabled,
    toggleSound,
    receipts = [],
    triggerRevealPattern,
    hiddenPatterns = []
  } = useReceipts();

  const navItems = [
    {
      id: 'dashboard',
      label: 'Memory Hub',
      icon: Sparkles
    },
    {
      id: 'explorer',
      label: 'Receipt Explorer',
      icon: Receipt
    },
    {
      id: 'chapters',
      label: 'Life Chapters',
      icon: BookOpen
    },
    {
      id: 'connections',
      label: 'Connections',
      icon: GitFork
    },
    {
      id: 'patterns',
      label: 'Hidden Patterns',
      icon: Compass,
      count: hiddenPatterns.length
    },
    {
      id: 'story',
      label: 'Story View',
      icon: FileText
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0d0d11]/95 backdrop-blur-md border-b border-stone-800/80 px-4 lg:px-8 py-3">

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">

        {/* BRAND */}
        <div className="flex items-center justify-between w-full lg:w-auto">

          <button
            onClick={() => setActiveView('dashboard')}
            className="flex items-center gap-3 group text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-stone-800 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform shadow-lg shadow-amber-500/10">
              <Receipt className="w-5 h-5" />
            </div>

            <div>
              <h1 className="font-serif font-bold text-lg md:text-xl tracking-wide text-stone-100">
                Your Life,
                <span className="italic font-normal text-amber-400 font-display text-2xl ml-1">
                  In Receipts
                </span>
              </h1>

              <p className="text-[10px] md:text-[11px] font-mono text-stone-500 tracking-wider uppercase">
                Digital Life Archaeology • {receipts.length.toLocaleString()} Records
              </p>
            </div>
          </button>

          {/* MOBILE SOUND */}
          <div className="flex lg:hidden items-center gap-2">

            <button
              onClick={toggleSound}
              className="p-2.5 text-stone-300 hover:text-amber-400 bg-stone-900 border border-stone-800 rounded-lg transition"
              title={isSoundEnabled ? 'Mute Sound' : 'Enable Sound'}
            >
              {isSoundEnabled ? (
                <Volume2 className="w-4 h-4 text-amber-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-stone-600" />
              )}
            </button>

          </div>

        </div>

        {/* NAVIGATION */}
        <nav className="flex items-center gap-1 overflow-x-auto max-w-full pb-1 lg:pb-0 scrollbar-none">

          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/70 border border-transparent'
                }`}
              >

                <Icon
                  className={`w-3.5 h-3.5 ${
                    isActive
                      ? 'text-amber-400'
                      : 'text-stone-500'
                  }`}
                />

                <span>{item.label}</span>

                {item.count !== undefined && (
                  <span className="ml-1 text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-stone-800 text-stone-400 border border-stone-700">
                    {item.count}
                  </span>
                )}

              </button>
            );
          })}

        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="hidden lg:flex items-center gap-2">

          <button
            onClick={triggerRevealPattern}
            className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 text-purple-200 border border-purple-500/40 rounded-lg text-xs font-mono transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Reveal Pattern</span>
          </button>

          <button
            onClick={toggleSound}
            className="p-2.5 text-stone-400 hover:text-amber-400 hover:bg-stone-800 border border-stone-800 rounded-lg transition-colors"
            title={isSoundEnabled ? 'Audio Effects: ON' : 'Audio Effects: OFF'}
          >
            {isSoundEnabled ? (
              <Volume2 className="w-4 h-4 text-amber-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-stone-600" />
            )}
          </button>

        </div>

      </div>
    </header>
  );
}