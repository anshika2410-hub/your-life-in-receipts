import React from 'react';
import { ReceiptProvider, useReceipts } from './context/ReceiptContext';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ReceiptExplorer from './components/ReceiptExplorer';
import LifeChapters from './components/LifeChapters';
import ConnectionDiscovery from './components/ConnectionDiscovery';
import HiddenPatterns from './components/HiddenPatterns';
import StoryView from './components/StoryView';
import ReceiptModal from './components/ReceiptModal';
import DataImporterModal from './components/DataImporterModal';
import { Sparkles, Heart, Receipt, UploadCloud } from 'lucide-react';

function AppContent() {
  const { activeView, setIsImporterOpen, receipts } = useReceipts();

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0c10] text-stone-100 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content View Switcher */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 pt-8">
        {activeView === 'dashboard' && <Dashboard />}
        {activeView === 'explorer' && <ReceiptExplorer />}
        {activeView === 'chapters' && <LifeChapters />}
        {activeView === 'connections' && <ConnectionDiscovery />}
        {activeView === 'patterns' && <HiddenPatterns />}
        {activeView === 'story' && <StoryView />}
      </main>

      {/* Persistent Modals & Drawers */}
      <ReceiptModal />
      <DataImporterModal />

      {/* Editorial Footer */}
      <footer className="border-t border-stone-800/80 bg-[#09090d] py-10 px-4 mt-auto text-xs font-mono text-stone-400 no-print">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-stone-200 font-serif font-bold text-base">
              <Receipt className="w-4 h-4 text-amber-400" />
              <span>Your Life, In Receipts</span>
            </div>
            <p className="text-stone-400 text-[11px]">
              &ldquo;Don&rsquo;t just show what happened. Help the user discover what it meant.&rdquo;
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <span className="text-stone-400">&bull; Pure Frontend Architecture</span>
            <span className="text-stone-400">&bull; Kaggle Ready Ingestion</span>
            <button
              onClick={() => setIsImporterOpen(true)}
              className="text-amber-400 hover:underline flex items-center gap-1 font-bold"
            >
              <UploadCloud className="w-3 h-3" /> Import Custom Dataset
            </button>
          </div>

          <div className="text-stone-400 text-[11px] text-center md:text-right">
            {receipts.length} Memory Artifacts Cataloged &bull; Hackathon Edition
          </div>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <ReceiptProvider>
      <AppContent />
    </ReceiptProvider>
  );
}
