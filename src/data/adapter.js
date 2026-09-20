/**
 * Kaggle & External Dataset Abstraction Layer
 * Converts any Kaggle / CSV / JSON receipt dataset into our normalized Receipt format.
 */

// Heuristic column detection rules for Kaggle / Banking / Personal Finance datasets
const FIELD_CANDIDATES = {
  merchant: ['merchant', 'vendor', 'store', 'shop', 'business_name', 'payee', 'name', 'place', 'description'],
  date: ['date', 'timestamp', 'transaction_date', 'datetime', 'time_stamp', 'posted_date', 'created_at'],
  time: ['time', 'time_of_day', 'hour', 'trans_time'],
  total: ['total', 'amount', 'cost', 'price', 'spent', 'grand_total', 'value', 'charge', 'debit'],
  category: ['category', 'category_name', 'type', 'genre', 'tag', 'group', 'department'],
  items: ['items', 'item_name', 'product', 'products', 'line_items', 'purchased_items', 'item_list'],
  location: ['location', 'city', 'address', 'venue', 'state', 'country', 'place_name'],
  notes: ['notes', 'memo', 'comment', 'narrative', 'description', 'reflection', 'memory'],
  mood: ['mood', 'sentiment', 'vibe', 'feeling', 'emotion'],
  currency: ['currency', 'currency_code', 'symbol']
};

/**
 * Robust CSV parser that handles quotes, commas, and multiline cells
 */
export function parseCSV(csvText) {
  if (!csvText || typeof csvText !== 'string') return { headers: [], rows: [] };
  
  const lines = [];
  let currentRow = [];
  let currentField = '';
  let inQuotes = false;
  
  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentField += '"';
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentField.trim());
      currentField = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') i++;
      currentRow.push(currentField.trim());
      if (currentRow.some(f => f.length > 0)) {
        lines.push(currentRow);
      }
      currentRow = [];
      currentField = '';
    } else {
      currentField += char;
    }
  }
  
  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some(f => f.length > 0)) {
      lines.push(currentRow);
    }
  }
  
  if (lines.length === 0) return { headers: [], rows: [] };
  
  const headers = lines[0].map(h => h.replace(/^["']|["']$/g, '').trim());
  const rows = lines.slice(1).map(line => {
    const rowObj = {};
    headers.forEach((header, idx) => {
      rowObj[header] = line[idx] !== undefined ? line[idx] : '';
    });
    return rowObj;
  });
  
  return { headers, rows };
}

/**
 * Suggests best column mappings for a dataset based on its headers
 */
export function detectColumnMappings(headers) {
  const mapping = {};
  const normalizedHeaders = headers.map(h => h.toLowerCase().replace(/[^a-z0-9]/g, '_'));
  
  Object.keys(FIELD_CANDIDATES).forEach(field => {
    const candidates = FIELD_CANDIDATES[field];
    for (const candidate of candidates) {
      const foundIdx = normalizedHeaders.findIndex(h => h === candidate || h.includes(candidate));
      if (foundIdx !== -1) {
        mapping[field] = headers[foundIdx];
        break;
      }
    }
  });
  
  return mapping;
}

/**
 * Categorize a receipt if category is missing or ambiguous
 */
export function inferCategory(merchant = '', items = '', notes = '') {
  const text = `${merchant}`.toLowerCase();
  
  if (text.match(/coffee|cafe|roaster|espresso|latte|bakery|cappuccino|starbucks|blue bottle/)) {
    return 'Coffee & Fuel';
  }
  if (text.match(/concert|ticket|gig|vinyl|record|music|band|show|club|festival|spotify|sound/)) {
    return 'Music & Live';
  }
  if (text.match(/diner|taco|burger|ramen|pizza|sushi|restaurant|eat|bar|bakery|food|bento|market/)) {
    return 'Food & Dining';
  }
  if (text.match(/uber|lyft|train|subway|transit|rail|flight|airline|metro|cab|taxi|gas|bus/)) {
    return 'Transit & Wandering';
  }
  if (text.match(/book|art|gallery|museum|film|kodak|print|cinema|theatre|exhibition|vintage|thrift/)) {
    return 'Books & Art';
  }
  if (text.match(/apple|github|hosting|tech|camera|lens|domain|software|hardware|laptop|headphone|dev/)) {
    return 'Tech & Creation';
  }
  if (text.match(/ikea|home|furniture|plant|nursery|decor|hardware|kitchen|garden|bed/)) {
    return 'Home & Nesting';
  }
  if (text.match(/hotel|airbnb|shinkansen|travel|flight|airport|tourist|passport|resort/)) {
    return 'Travel & Escapes';
  }
  
  return 'Other';
}

/**
 * Normalizes raw Kaggle/CSV/JSON records into strict Receipt models
 */
export function normalizeDataset(rawRecords, columnMapping = {}) {
  if (!Array.isArray(rawRecords)) return [];
  
  return rawRecords.map((raw, idx) => {
    // Extract mapped or fallback fields
    const getVal = (field) => {
      const mappedKey = columnMapping[field];
      if (mappedKey && raw[mappedKey] !== undefined) return raw[mappedKey];
      // Check direct property if no mapping
      if (raw[field] !== undefined) return raw[field];
      return '';
    };
    
   const merchant = String(getVal('merchant') || raw.merchant || raw.Vendor || raw.Store || 'Moment #').trim();
    
    // Parse total
    let total = getVal('total') || raw.total || raw.Amount || raw.cost || 0;
    if (typeof total === 'string') {
      total = parseFloat(total.replace(/[^0-9.-]+/g, '')) || 0;
    }
    total = Math.abs(Number(total) || 0);
    
    // Parse Date & Time
    let dateStr = String(getVal('date') || raw.date || raw.Date || new Date().toISOString().split('T')[0]).trim();
    let timeStr = String(getVal('time') || raw.time || raw.Time || '12:00 PM').trim();
    
    // If date contains timestamp
    if (dateStr.includes('T')) {
      const parts = dateStr.split('T');
      dateStr = parts[0];
      if (parts[1] && !timeStr) timeStr = parts[1].substring(0, 5);
    }
    
    // Parse Items
    let rawItems = getVal('items') || raw.items || raw.Items || [];
    let items = [];
    if (typeof rawItems === 'string') {
      if (rawItems.startsWith('[') || rawItems.startsWith('{')) {
        try {
          const parsed = JSON.parse(rawItems);
          items = Array.isArray(parsed) ? parsed : [parsed];
        } catch {
          items = rawItems.split(/[,;|]/).map(name => ({ name: name.trim(), price: total / (rawItems.split(/[,;|]/).length || 1), quantity: 1 }));
        }
      } else {
        items = rawItems.split(/[,;|]/).map(name => ({ name: name.trim(), price: total / (rawItems.split(/[,;|]/).length || 1), quantity: 1 }));
      }
    } else if (Array.isArray(rawItems)) {
      items = rawItems.map(item => typeof item === 'object' ? item : { name: String(item), price: total / rawItems.length, quantity: 1 });
    }
    
    if (items.length === 0) {
      items = [{ name: merchant, price: total, quantity: 1 }];
    }
    
    // Category & Tags
    let category = String(getVal('category') || raw.category || '').trim();
    if (!category || category === 'undefined') {
      category = inferCategory(merchant, items.map(i => i.name).join(' '), getVal('notes'));
    }
    
    // Night-owl check for stamp
    let stamp = raw.stamp || 'PAID IN FULL';
    const hour = parseInt(timeStr, 10);
    const isLateNight = (timeStr.toLowerCase().includes('am') && (hour >= 0 && hour < 5)) || 
                        (timeStr.includes(':') && (hour >= 0 && hour < 5));
    if (isLateNight && stamp === 'PAID IN FULL') {
      stamp = '2:00 AM RITUAL';
    } else if (total > 150 && stamp === 'PAID IN FULL') {
      stamp = 'SPLURGE';
    }

    return {
      id: raw.id || `rcpt_${idx + 1}`,
      merchant,
      date: dateStr,
      time: timeStr,
      total: Number(total.toFixed(2)),
      currency: getVal('currency') || raw.currency || '$',
      category: category || 'General',
      items: items.map(i => ({
        name: i.name || 'Item',
        price: Number(i.price || 0),
        quantity: i.quantity || 1
      })),
      location: String(getVal('location') || raw.location || 'Local Spot').trim(),
      mood: String(getVal('mood') || raw.mood || 'Reflective').trim(),
      tags: Array.isArray(raw.tags) ? raw.tags : [category, merchant.split(' ')[0]],
      notes: String(
  getVal('notes') ||
  raw.notes ||
  raw.memo ||
  raw.description ||
  'Captured moment at'
).trim(),
      stamp,
      weather: raw.weather || 'Clear Sky',
      paymentMethod: raw.paymentMethod || 'Card'
    };
  });
}
