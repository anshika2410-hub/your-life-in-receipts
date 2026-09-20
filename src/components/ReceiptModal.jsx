import React from 'react';
import { useReceipts } from '../context/ReceiptContext';
import { formatCurrency, formatDate } from '../utils/formatters';
import { 
  X, 
  MapPin, 
  Clock, 
  Cloud, 
  CreditCard, 
  Tag, 
  Sparkles, 
  ArrowRight, 
  GitFork, 
  BookOpen 
} from 'lucide-react';
import { sfx } from '../utils/audioFx';

export default function ReceiptModal() {
  const { 
    selectedReceipt, 
    setSelectedReceipt, 
    receipts, 
    dynamicConnections,
    setActiveView,
    setSelectedChapterId
  } = useReceipts();

  if (!selectedReceipt) return null;

  const close = () => {
    sfx.playPaperSlip();
    setSelectedReceipt(null);
  };

  const relatedReceipts = receipts.filter(r => 
    r.id !== selectedReceipt.id && 
    (r.chapterId === selectedReceipt.chapterId || r.location === selectedReceipt.location || r.category === selectedReceipt.category)
  ).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#14141c] border border-stone-700/80 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-900/50">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              EVIDENCE ARTIFACT #{selectedReceipt.id}
            </span>
            <span className="text-xs text-stone-400 font-mono">
              {formatDate(selectedReceipt.date)}
            </span>
          </div>
          <button 
            onClick={close}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Main Summary Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Physical Receipt View */}
            <div className="paper-texture p-6 rounded text-stone-900 font-mono shadow-md receipt-tear-bottom">
              <div className="text-center border-b border-dashed border-stone-400 pb-3 mb-3">
                <h2 className="font-serif font-black text-2xl uppercase tracking-tight">
                  {selectedReceipt.merchant}
                </h2>
                <p className="text-xs text-stone-600 mt-1 flex items-center justify-center gap-1">
                  <MapPin className="w-3 h-3" /> {selectedReceipt.location}
                </p>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  {selectedReceipt.time} &bull; {selectedReceipt.date}
                </p>
              </div>

              {/* Items / Activity Details */}
<div className="space-y-2 text-xs py-2 border-b border-dotted border-stone-300">

  {Array.isArray(selectedReceipt.items) &&
    selectedReceipt.items.length > 0 ? (

    selectedReceipt.items.map((item, idx) => (
      <div
        key={idx}
        className="flex justify-between items-center"
      >
        <span className="text-stone-800 font-mono">
          {item?.quantity
            ? `${item.quantity}x `
            : ''}
          {item?.name ||
            item?.title ||
            'Item'}
        </span>

        {item?.price !== undefined && (
          <span className="text-stone-700 font-mono">
            {item.price}
          </span>
        )}
      </div>
    ))

  ) : selectedReceipt.track ||
    selectedReceipt.track_name ? (

    <div className="space-y-1">

      <div className="text-stone-800 font-mono font-semibold">
        🎵 {selectedReceipt.track ||
          selectedReceipt.track_name}
      </div>

      {(selectedReceipt.artist ||
        selectedReceipt.artist_name) && (
        <div className="text-stone-600 font-mono">
          Artist:{" "}
          {selectedReceipt.artist ||
            selectedReceipt.artist_name}
        </div>
      )}

      {(selectedReceipt.album ||
        selectedReceipt.album_name) && (
        <div className="text-stone-600 font-mono">
          Album:{" "}
          {selectedReceipt.album ||
            selectedReceipt.album_name}
        </div>
      )}

    </div>

  ) : (

    <div className="text-stone-500 font-mono">
      No item-level details recorded.
    </div>

  )}

</div>

              {/* Total & Payment */}
              <div className="pt-3 flex justify-between items-baseline font-bold">
                <span className="text-sm uppercase tracking-wider">AMOUNT PAID</span>
                <span className="font-serif font-black text-2xl text-stone-950">
                  {formatCurrency(selectedReceipt.total, selectedReceipt.currency)}
                </span>
              </div>

              <div className="mt-3 pt-2 border-t border-dashed border-stone-400 text-[10px] text-stone-600 flex justify-between items-center">
                <span>METHOD: {selectedReceipt.paymentMethod || 'Contactless'}</span>
                <span className="font-bold uppercase tracking-widest text-rose-800">
                  {selectedReceipt.stamp || 'VERIFIED'}
                </span>
              </div>
            </div>

            {/* Right: Emotional & Archaeological Context */}
            <div className="space-y-4">
              {/* Handwritten Journal Note */}
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-200">
                <div className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" /> The Memory Fragment
                </div>
                <p className="font-serif italic text-sm text-stone-200 leading-relaxed">
                  &ldquo;{selectedReceipt.notes}&rdquo;
                </p>
              </div>

              {/* Metadata Badges */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-lg bg-stone-900 border border-stone-800">
                  <span className="text-stone-500 text-[10px] uppercase block">Atmospheric Mood</span>
                  <span className="text-stone-200 font-medium">{selectedReceipt.mood || 'Reflective'}</span>
                </div>
                <div className="p-3 rounded-lg bg-stone-900 border border-stone-800">
                  <span className="text-stone-500 text-[10px] uppercase block">Weather Context</span>
                  <span className="text-stone-200 font-medium">{selectedReceipt.weather || 'Clear'}</span>
                </div>
              </div>

              {/* Tags */}
              {selectedReceipt.tags && selectedReceipt.tags.length > 0 && (
                <div>
                  <span className="text-[11px] font-mono uppercase text-stone-400 block mb-2">Semantic Tags:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedReceipt.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-stone-800 text-stone-300 border border-stone-700">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Cross-Category Linkages & Memory Trail */}
          {relatedReceipts.length > 0 && (
            <div className="border-t border-stone-800 pt-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                  <GitFork className="w-3.5 h-3.5 text-amber-400" /> Connected Life Artifacts
                </h4>
                <button 
                  onClick={() => { close(); setActiveView('connections'); }}
                  className="text-xs font-mono text-amber-400 hover:underline flex items-center gap-1"
                >
                  View Full Galaxy <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {relatedReceipts.map(r => (
                  <div 
                    key={r.id}
                    onClick={() => setSelectedReceipt(r)}
                    className="p-3 rounded-lg bg-stone-900/80 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/40 cursor-pointer transition-all"
                  >
                    <div className="text-[10px] font-mono text-amber-400">{r.category}</div>
                    <div className="font-serif font-bold text-sm text-stone-200 truncate">{r.merchant}</div>
                    <div className="text-xs text-stone-400 font-mono mt-1 flex justify-between">
                      <span>{r.time}</span>
                      <span className="text-stone-300 font-bold">{formatCurrency(r.total, r.currency)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-stone-800 bg-stone-900/60 flex items-center justify-between text-xs font-mono text-stone-400">
          <span>Category: <strong className="text-stone-200">{selectedReceipt.category}</strong></span>
          <button 
            onClick={close}
            className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors"
          >
            Close Artifact
          </button>
        </div>

      </div>
    </div>
  );
}
