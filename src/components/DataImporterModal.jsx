import React, { useState } from 'react';
import { useReceipts } from '../context/ReceiptContext';
import { parseCSV, detectColumnMappings, normalizeDataset } from '../data/adapter';
import { 
  X, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  RotateCcw,
  Sparkles,
  Download,
  Table
} from 'lucide-react';
import { sfx } from '../utils/audioFx';

const SAMPLE_KAGGLE_CSV = `Transaction_ID,Vendor,Date,Amount,Category,Location,Notes
TX_901,Philz Coffee Mint,2025-10-01,7.25,Coffee,San Francisco CA,Mint Mojito iced coffee while sketching ideas
TX_902,Amoeba Music Vinyl,2025-10-03,45.00,Music,Haight-Ashbury SF,Found rare ambient techno LP on Japanese import
TX_903,Super Duper Burger,2025-10-03,18.50,Food,Market St SF,Late dinner with friends after record shopping
TX_904,Caltrain Transit Pass,2025-10-05,14.00,Transit,Palo Alto CA,Riding down to Stanford for hardware demo
TX_905,Fry's Electronics Stash,2025-10-06,89.50,Tech,Sunnyvale CA,Soldering iron and breadboards for prototype
TX_906,24hr Mel's Drive-In,2025-10-07,22.00,Late Night,Lombard St SF,2 AM milkshakes and debugging memory leaks`;

export default function DataImporterModal() {
  const { 
    isImporterOpen, 
    setIsImporterOpen, 
    importDataset, 
    resetToDefaultDataset,
    datasetName,
    receipts 
  } = useReceipts();

  const [rawText, setRawText] = useState('');
  const [detectedHeaders, setDetectedHeaders] = useState([]);
  const [parsedRows, setParsedRows] = useState([]);
  const [columnMap, setColumnMap] = useState({});
  const [previewReceipts, setPreviewReceipts] = useState([]);
  const [datasetTitle, setDatasetTitle] = useState('Kaggle Ingested Ledger');
  const [errorMsg, setErrorMsg] = useState('');
  const [step, setStep] = useState('input'); // 'input' | 'mapping' | 'preview'

  if (!isImporterOpen) return null;

  const close = () => {
    sfx.playPaperSlip();
    setIsImporterOpen(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      setRawText(content);
      processRawContent(content, file.name.replace(/\.[^/.]+$/, ''));
    };
    reader.readAsText(file);
  };

  const processRawContent = (content, defaultName = 'Kaggle Dataset') => {
    setErrorMsg('');
    try {
      // Check if JSON
      if (content.trim().startsWith('[') || content.trim().startsWith('{')) {
        const parsed = JSON.parse(content);
        const arrayData = Array.isArray(parsed) ? parsed : [parsed];
        const headers = Object.keys(arrayData[0] || {});
        setDetectedHeaders(headers);
        setParsedRows(arrayData);
        const autoMap = detectColumnMappings(headers);
        setColumnMap(autoMap);
        const normalized = normalizeDataset(arrayData, autoMap);
        setPreviewReceipts(normalized);
        setDatasetTitle(defaultName);
        setStep('mapping');
        return;
      }

      // Otherwise parse as CSV
      const { headers, rows } = parseCSV(content);
      if (headers.length === 0 || rows.length === 0) {
        setErrorMsg('Could not detect valid CSV rows. Please verify formatting.');
        return;
      }

      setDetectedHeaders(headers);
      setParsedRows(rows);
      const autoMap = detectColumnMappings(headers);
      setColumnMap(autoMap);
      const normalized = normalizeDataset(rows, autoMap);
      setPreviewReceipts(normalized);
      setDatasetTitle(defaultName);
      setStep('mapping');
    } catch (err) {
      setErrorMsg(`Parsing error: ${err.message}`);
    }
  };

  const handleColumnMapChange = (field, selectedHeader) => {
    const newMap = { ...columnMap, [field]: selectedHeader };
    setColumnMap(newMap);
    const normalized = normalizeDataset(parsedRows, newMap);
    setPreviewReceipts(normalized);
  };

  const handleLoadSampleKaggle = () => {
    setRawText(SAMPLE_KAGGLE_CSV);
    processRawContent(SAMPLE_KAGGLE_CSV, 'Kaggle SF Tech Odyssey Sample');
  };

  const handleFinalImport = () => {
    const result = importDataset(parsedRows, datasetTitle, columnMap);
    if (result.success) {
      close();
    } else {
      setErrorMsg(result.error || 'Failed to import dataset.');
    }
  };

  const handleExportCurrent = () => {
    sfx.playPaperSlip();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(receipts, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'your-life-in-receipts-normalized.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#121218] border border-stone-700 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-900/60">
          <div className="flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-100">
                Kaggle Dataset Abstraction & Importer
              </h3>
              <p className="text-[11px] font-mono text-stone-400">
                Map any external CSV or JSON dataset into normalized memory receipts.
              </p>
            </div>
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
          
          {/* Active Dataset Status Bar */}
          <div className="p-4 rounded-xl bg-stone-900/90 border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <div>
              <span className="text-stone-400">Currently Loaded:</span>
              <strong className="text-amber-300 ml-1">{datasetName}</strong>
              <span className="text-stone-500 ml-2">({receipts.length} receipts)</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={resetToDefaultDataset}
                className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3 text-amber-400" /> Restore Curated Memoir
              </button>
              <button
                onClick={handleExportCurrent}
                className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center gap-1 transition-colors"
              >
                <Download className="w-3 h-3 text-cyan-400" /> Export JSON
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {step === 'input' && (
            <div className="space-y-6">
              {/* File Dropzone */}
              <div className="border-2 border-dashed border-stone-700 hover:border-amber-500/50 rounded-2xl p-8 text-center bg-stone-950/50 transition-colors cursor-pointer relative group">
                <input 
                  type="file" 
                  accept=".csv,.json,.txt"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <UploadCloud className="w-10 h-10 text-stone-500 group-hover:text-amber-400 mx-auto mb-2 transition-colors" />
                <h4 className="font-serif text-lg text-stone-200">
                  Drop your Kaggle CSV or JSON file here
                </h4>
                <p className="text-xs font-mono text-stone-400 mt-1">
                  Supports standard Kaggle columns (Date, Vendor, Amount, Items, Location, Category...)
                </p>
              </div>

              {/* Paste Raw Text or Load Sample */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-stone-300">Or paste raw CSV / JSON text:</span>
                  <button 
                    onClick={handleLoadSampleKaggle}
                    className="text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" /> Load Sample Kaggle Dataset
                  </button>
                </div>

                <textarea
                  rows={5}
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder="Paste CSV or JSON content here..."
                  className="w-full p-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 font-mono text-xs focus:outline-none focus:border-amber-500/50"
                />

                <div className="flex justify-end pt-2">
                  <button
                    disabled={!rawText.trim()}
                    onClick={() => processRawContent(rawText, 'Pasted Kaggle Dataset')}
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 font-bold text-xs font-mono rounded-xl transition-all flex items-center gap-1.5"
                  >
                    <span>Analyze & Map Schema</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 'mapping' && (
            <div className="space-y-6">
              {/* Dataset Title Input */}
              <div>
                <label className="text-xs font-mono text-stone-400 block mb-1">Dataset Label:</label>
                <input
                  type="text"
                  value={datasetTitle}
                  onChange={(e) => setDatasetTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs font-mono focus:outline-none focus:border-amber-500/50"
                />
              </div>

              {/* Dynamic Column Mapping Matrix */}
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-4">
                <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                  <h4 className="font-serif font-bold text-base text-stone-200 flex items-center gap-2">
                    <Table className="w-4 h-4 text-amber-400" /> Schema Column Mapper
                  </h4>
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Auto-detected matches
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-mono">
                  {[
                    { field: 'merchant', label: 'Merchant / Store *' },
                    { field: 'total', label: 'Amount / Price *' },
                    { field: 'date', label: 'Date / Timestamp *' },
                    { field: 'category', label: 'Category' },
                    { field: 'location', label: 'Location / City' },
                    { field: 'notes', label: 'Notes / Description' },
                  ].map(({ field, label }) => (
                    <div key={field} className="space-y-1">
                      <label className="text-stone-400 block text-[11px]">{label}</label>
                      <select
                        value={columnMap[field] || ''}
                        onChange={(e) => handleColumnMapChange(field, e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-200 text-xs focus:outline-none focus:border-amber-500"
                      >
                        <option value="">-- Select Column --</option>
                        {detectedHeaders.map(header => (
                          <option key={header} value={header}>{header}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Preview Table */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-stone-400">
                  <span>Normalized Preview ({previewReceipts.length} items parsed):</span>
                  <span>Zero UI breaking guarantee</span>
                </div>

                <div className="border border-stone-800 rounded-xl overflow-x-auto max-h-48 bg-stone-950">
                  <table className="w-full text-left text-xs font-mono text-stone-300">
                    <thead className="bg-stone-900/80 text-stone-400 border-b border-stone-800">
                      <tr>
                        <th className="p-2">Merchant</th>
                        <th className="p-2">Date</th>
                        <th className="p-2">Amount</th>
                        <th className="p-2">Category</th>
                        <th className="p-2">Location</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-800/60">
                      {previewReceipts.slice(0, 5).map((r, idx) => (
                        <tr key={idx} className="hover:bg-stone-900/40">
                          <td className="p-2 font-bold text-stone-100">{r.merchant}</td>
                          <td className="p-2 text-stone-400">{r.date}</td>
                          <td className="p-2 text-amber-300 font-bold">${r.total}</td>
                          <td className="p-2 text-stone-400">{r.category}</td>
                          <td className="p-2 text-stone-400">{r.location}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-2 border-t border-stone-800">
                <button
                  onClick={() => setStep('input')}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-mono rounded-xl"
                >
                  &larr; Back to Input
                </button>

                <button
                  onClick={handleFinalImport}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs font-mono rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" /> Ingest {previewReceipts.length} Receipts Now
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
