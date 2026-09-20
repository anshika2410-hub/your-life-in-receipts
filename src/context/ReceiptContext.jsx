import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect
} from 'react';

import { INITIAL_RECEIPTS, INITIAL_CHAPTERS } from '../data/mockData';
import { discoverHiddenPatterns } from '../engines/patternEngine';
import { clusterIntoLifeChapters } from '../engines/chapterEngine';
import {
  buildReceiptConnections,
  CURATED_TRAILS
} from '../engines/connectionEngine';
import { generateNarrativeStory } from '../engines/storyEngine';
import { sfx } from '../utils/audioFx';

const ReceiptContext = createContext();

export function ReceiptProvider({ children }) {
  // Start empty and load REAL hackathon data
  const [receipts, setReceipts] = useState([]);
  const [spotifyInsights, setSpotifyInsights] = useState(null);
  const [datasetMeta, setDatasetMeta] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const [activeView, setActiveView] = useState('dashboard');
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [isImporterOpen, setIsImporterOpen] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  const [datasetName, setDatasetName] = useState(
    'Your Life, In Receipts'
  );

  // Explorer filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMood, setSelectedMood] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');

  // Pattern UI
  const [revealedPatternIndex, setRevealedPatternIndex] = useState(null);
  const [isScanningPatterns, setIsScanningPatterns] = useState(false);

  // --------------------------------------------------
  // LOAD REAL DATA
  // --------------------------------------------------

  useEffect(() => {
    let cancelled = false;

    async function loadRealData() {
      try {
        setIsLoadingData(true);

        const [receiptsResponse, spotifyResponse, metaResponse] =
          await Promise.all([
            fetch('/data/lifeReceipts.json'),
            fetch('/data/spotifyInsights.json'),
            fetch('/data/datasetMeta.json')
          ]);

        if (!receiptsResponse.ok) {
          throw new Error('lifeReceipts.json not found');
        }

        const realReceipts = await receiptsResponse.json();

        let spotifyData = null;
        let metaData = null;

        if (spotifyResponse.ok) {
          spotifyData = await spotifyResponse.json();
        }

        if (metaResponse.ok) {
          metaData = await metaResponse.json();
        }

        if (!cancelled) {
          setReceipts(
            Array.isArray(realReceipts)
              ? realReceipts
              : []
          );

          setSpotifyInsights(spotifyData);
          setDatasetMeta(metaData);

          setDatasetName(
            'Real Life Dataset • Transactions • Household • Spotify'
          );
        }
      } catch (error) {
        console.error('Failed to load real dataset:', error);

        // Fallback only if real files are unavailable
        if (!cancelled) {
          setReceipts(INITIAL_RECEIPTS);
          setDatasetName(
            'Demo Dataset — Real data files not found'
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoadingData(false);
        }
      }
    }

    loadRealData();

    return () => {
      cancelled = true;
    };
  }, []);

  // --------------------------------------------------
  // DERIVED DATA
  // --------------------------------------------------

  const chapters = useMemo(() => {
    if (!receipts.length) return [];

    try {
      return clusterIntoLifeChapters(receipts);
    } catch (error) {
      console.error('Chapter engine error:', error);
      return [];
    }
  }, [receipts]);

  const hiddenPatterns = useMemo(() => {
    if (!receipts.length) return [];

    try {
      return discoverHiddenPatterns(receipts);
    } catch (error) {
      console.error('Pattern engine error:', error);
      return [];
    }
  }, [receipts]);

  const dynamicConnections = useMemo(() => {
    if (!receipts.length) return [];

    try {
      return buildReceiptConnections(receipts);
    } catch (error) {
      console.error('Connection engine error:', error);
      return [];
    }
  }, [receipts]);

  const narrativeStory = useMemo(() => {
    if (!receipts.length || !chapters.length) return null;

    try {
      return generateNarrativeStory(chapters, receipts);
    } catch (error) {
      console.error('Story engine error:', error);
      return null;
    }
  }, [chapters, receipts]);

  // --------------------------------------------------
  // STATS
  // --------------------------------------------------

  const stats = useMemo(() => {
    const totalMoments = receipts.length;

    const totalSpend = receipts.reduce(
      (sum, r) => sum + (Number(r.total) || 0),
      0
    );

    const uniqueLocations = new Set(
      receipts
        .map(r => r.location)
        .filter(Boolean)
    ).size;

    const uniqueCategories = new Set(
      receipts
        .map(r => r.category)
        .filter(Boolean)
    ).size;

    const categoryCounts = {};
    const categoryTotals = {};

    receipts.forEach(r => {
      const category = r.category || 'Other';

      categoryCounts[category] =
        (categoryCounts[category] || 0) + 1;

      categoryTotals[category] =
        (categoryTotals[category] || 0) +
        (Number(r.total) || 0);
    });

    const dominantCategory =
      Object.entries(categoryCounts)
        .sort((a, b) => b[1] - a[1])[0]?.[0] ||
      'Other';

    const moodCounts = {};

    receipts.forEach(r => {
      if (r.mood) {
        moodCounts[r.mood] =
          (moodCounts[r.mood] || 0) + 1;
      }
    });

    const dominantMood =
      Object.entries(moodCounts)
        .sort((a, b) => b[1] - a[1])[0]?.[0] ||
      'Observed activity';

    return {
      totalMoments,
      totalSpend,
      uniqueLocations,
      uniqueCategories,
      totalConnections: dynamicConnections.length,
      dominantMood,
      dominantCategory,
      categoryCounts,
      categoryTotals,
      totalChapters: chapters.length
    };
  }, [receipts, dynamicConnections, chapters]);

  // --------------------------------------------------
  // FILTERING
  // --------------------------------------------------

  const filteredReceipts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return receipts
      .filter(r => {
        const matchesCategory =
          selectedCategory === 'all' ||
          r.category === selectedCategory;

        const matchesMood =
          selectedMood === 'all' ||
          r.mood === selectedMood;

        const matchesSearch =
          !query ||
          String(r.merchant || '')
            .toLowerCase()
            .includes(query) ||
          String(r.title || '')
            .toLowerCase()
            .includes(query) ||
          String(r.location || '')
            .toLowerCase()
            .includes(query) ||
          String(r.notes || '')
            .toLowerCase()
            .includes(query) ||
          String(r.artist || '')
            .toLowerCase()
            .includes(query) ||
          String(r.album || '')
            .toLowerCase()
            .includes(query) ||
          String(r.track || '')
            .toLowerCase()
            .includes(query) ||
          (Array.isArray(r.tags) &&
            r.tags.some(tag =>
              String(tag)
                .toLowerCase()
                .includes(query)
            )) ||
          (Array.isArray(r.items) &&
            r.items.some(item =>
              String(item.name || '')
                .toLowerCase()
                .includes(query)
            ));

        return (
          matchesCategory &&
          matchesMood &&
          matchesSearch
        );
      })
      .sort((a, b) => {
        if (sortBy === 'date-desc') {
          return (
            new Date(b.date) -
            new Date(a.date)
          );
        }

        if (sortBy === 'date-asc') {
          return (
            new Date(a.date) -
            new Date(b.date)
          );
        }

        if (sortBy === 'amount-desc') {
          return (
            (Number(b.total) || 0) -
            (Number(a.total) || 0)
          );
        }

        if (sortBy === 'amount-asc') {
          return (
            (Number(a.total) || 0) -
            (Number(b.total) || 0)
          );
        }

        return 0;
      });
  }, [
    receipts,
    selectedCategory,
    selectedMood,
    searchQuery,
    sortBy
  ]);

  // --------------------------------------------------
  // IMPORT DATASET
  // --------------------------------------------------

  const importDataset = (
    rawData,
    name = 'Imported Dataset',
    customMapping = {}
  ) => {
    console.warn(
      'Manual import is currently disabled in favor of bundled hackathon data.'
    );

    return {
      success: false,
      error:
        'Use the bundled hackathon datasets from /public/data.'
    };
  };

  // --------------------------------------------------
  // RESET
  // --------------------------------------------------

  const resetToDefaultDataset = () => {
    setReceipts(INITIAL_RECEIPTS);

    setDatasetName(
      'Demo Dataset'
    );

    setSelectedReceipt(null);
    setSelectedChapterId(null);
    setRevealedPatternIndex(null);

    sfx.playStamp();
  };

  // --------------------------------------------------
  // PATTERN REVEAL
  // --------------------------------------------------

  const triggerRevealPattern = () => {
    if (!hiddenPatterns.length) return;

    setIsScanningPatterns(true);

    sfx.playPaperSlip();

    setTimeout(() => {
      setIsScanningPatterns(false);

      setRevealedPatternIndex(prev => {
        const next =
          prev === null
            ? 0
            : (prev + 1) %
              hiddenPatterns.length;

        sfx.playEureka();

        return next;
      });
    }, 600);
  };

  // --------------------------------------------------
  // SOUND
  // --------------------------------------------------

  const toggleSound = () => {
    const state = sfx.toggleSound();
    setIsSoundEnabled(state);
  };

  // --------------------------------------------------
  // PROVIDER
  // --------------------------------------------------

  return (
    <ReceiptContext.Provider
      value={{
        receipts,
        filteredReceipts,

        chapters,
        hiddenPatterns,
        dynamicConnections,

        curatedTrails: [],

        narrativeStory,

        stats,

        spotifyInsights,
        datasetMeta,

        isLoadingData,

        activeView,
        setActiveView,

        selectedReceipt,
        setSelectedReceipt,

        selectedChapterId,
        setSelectedChapterId,

        isImporterOpen,
        setIsImporterOpen,

        isSoundEnabled,
        toggleSound,

        datasetName,

        searchQuery,
        setSearchQuery,

        selectedCategory,
        setSelectedCategory,

        selectedMood,
        setSelectedMood,

        sortBy,
        setSortBy,

        revealedPatternIndex,
        setRevealedPatternIndex,

        isScanningPatterns,
        triggerRevealPattern,

        importDataset,
        resetToDefaultDataset
      }}
    >
      {children}
    </ReceiptContext.Provider>
  );
}

export function useReceipts() {
  const context = useContext(ReceiptContext);

  if (!context) {
    throw new Error(
      'useReceipts must be used within a ReceiptProvider'
    );
  }

  return context;
}