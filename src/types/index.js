/**
 * @typedef {Object} ReceiptItem
 * @property {string} name
 * @property {number} price
 * @property {number} [quantity]
 * @property {string} [notes]
 */

/**
 * @typedef {Object} Receipt
 * @property {string} id - Unique receipt identifier
 * @property {string} merchant - Store, venue, or vendor name
 * @property {string} date - ISO Date string (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss)
 * @property {string} time - Time string (e.g. '02:42 AM', '14:30')
 * @property {number} total - Total transaction amount
 * @property {string} currency - e.g. '$', 'EUR', 'JPY'
 * @property {string} category - e.g. 'Coffee & Fuel', 'Music & Live', 'Late Night', 'Transit', 'Tech & Tools', 'Home & Craft', 'Books & Art', 'Travel & Wandering'
 * @property {ReceiptItem[]} items - Itemized breakdown
 * @property {string} location - City, neighborhood, or specific address
 * @property {string} [mood] - Emotional state or vibe (e.g. 'Electric', 'Exhausted & Inspired', 'Nostalgic', 'Cozy')
 * @property {string[]} [tags] - Categorical or thematic tags
 * @property {string} [notes] - Personal memory fragment or handwritten journal note
 * @property {string} [stamp] - Visual stamp label ('PAID IN FULL', 'CORE MEMORY', '2:00 AM RITUAL', 'UNPLANNED', 'SPLURGE', 'NO REGRETS')
 * @property {string} [weather] - Atmospheric context ('Rainy & Cold', 'Golden Hour', 'Humid Summer Night', 'Tokyo Neon Drizzle')
 * @property {string} [paymentMethod] - 'Apple Pay', 'Crinkled Cash', 'Credit Card', 'Transit IC Pass'
 * @property {string} [chapterId] - Associated Life Chapter ID
 */

export const CATEGORIES = [
  { id: 'all', label: 'All Artifacts', icon: 'Sparkles', color: '#f59e0b', bg: 'bg-amber-500/10' },
  { id: 'Coffee & Fuel', label: 'Coffee & Fuel', icon: 'Coffee', color: '#d97706', bg: 'bg-amber-600/10' },
  { id: 'Music & Live', label: 'Music & Gigs', icon: 'Music', color: '#ec4899', bg: 'bg-pink-500/10' },
  { id: 'Late Night', label: 'Late Night (00:00 - 05:00)', icon: 'Moon', color: '#8b5cf6', bg: 'bg-purple-500/10' },
  { id: 'Food & Dining', label: 'Food & Diners', icon: 'UtensilsCrossed', color: '#f97316', bg: 'bg-orange-500/10' },
  { id: 'Transit & Wandering', label: 'Transit & Motion', icon: 'Compass', color: '#06b6d4', bg: 'bg-cyan-500/10' },
  { id: 'Books & Art', label: 'Books & Artifacts', icon: 'BookOpen', color: '#10b981', bg: 'bg-emerald-500/10' },
  { id: 'Tech & Creation', label: 'Tech & Craft', icon: 'Cpu', color: '#3b82f6', bg: 'bg-blue-500/10' },
  { id: 'Home & Nesting', label: 'Home & Nesting', icon: 'Home', color: '#84cc16', bg: 'bg-lime-500/10' },
  { id: 'Travel & Escapes', label: 'Travel & Escapes', icon: 'Plane', color: '#e11d48', bg: 'bg-rose-500/10' },
];

export const VIBE_PALETTES = {
  electric: 'from-pink-500/20 via-purple-500/20 to-blue-500/20 border-pink-500/30',
  nostalgic: 'from-amber-600/20 via-orange-500/20 to-stone-700/20 border-amber-600/30',
  cozy: 'from-emerald-600/20 via-teal-500/20 to-stone-800/20 border-emerald-600/30',
  adventurous: 'from-rose-500/20 via-cyan-500/20 to-indigo-600/20 border-cyan-500/30',
  grind: 'from-blue-600/20 via-violet-600/20 to-slate-800/20 border-blue-500/30',
};
