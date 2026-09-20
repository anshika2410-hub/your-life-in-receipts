/**
 * Cross-Category Connection Discovery Engine
 * Builds multi-hop relationship graphs and narrative trails across diverse spending domains.
 */

export const CURATED_TRAILS = [
  {
    id: 'trail_brooklyn_sound',
    title: 'The Midsummer Sound-to-Senses Arc',
    categorySequence: ['Music & Live', 'Books & Art', 'Music & Live', 'Late Night', 'Books & Art'],
    summary: 'How a concert ticket unfolded into vintage denim, mezcal under warehouse lasers, 2:30 AM disco fries, and developing a roll of 35mm film.',
    theme: 'Music → Style → Experience → Food → Memory',
    receiptIds: ['rcpt_007', 'rcpt_009', 'rcpt_010', 'rcpt_011', 'rcpt_012'],
    nodes: [
      { receiptId: 'rcpt_007', step: '1. The Catalyst', role: 'Securing the live show tickets months in advance.' },
      { receiptId: 'rcpt_009', step: '2. The Uniform', role: 'Finding the vintage 80s chore jacket in Bushwick for the night.' },
      { receiptId: 'rcpt_010', step: '3. The Immersion', role: 'Mezcal and chest-rattling bass at Knockdown Center.' },
      { receiptId: 'rcpt_011', step: '4. The Debrief', role: 'Decompressing over buttermilk pancakes at 2:30 AM diner.' },
      { receiptId: 'rcpt_012', step: '5. The Physical Memory', role: 'Developing the double-exposed Kodak film roll.' },
    ]
  },
  {
    id: 'trail_hackathon_spark',
    title: 'The 0-to-1 Hackathon Inception Trail',
    categorySequence: ['Coffee & Fuel', 'Tech & Creation', 'Books & Art', 'Late Night', 'Transit & Wandering'],
    summary: 'From a frantic morning espresso and domain purchase to whiteboard schematics, bottomless diner coffee, and foggy 2 AM taxi rides.',
    theme: 'Fuel → Infrastructure → Architecture → Sustenance → Reflection',
    receiptIds: ['rcpt_001', 'rcpt_002', 'rcpt_004', 'rcpt_003', 'rcpt_005', 'rcpt_006'],
    nodes: [
      { receiptId: 'rcpt_001', step: '1. The Spark', role: 'Morning flat white while drafting raw wireframes.' },
      { receiptId: 'rcpt_002', step: '2. The Commitment', role: 'Purchasing domain and cloud compute at 11 PM.' },
      { receiptId: 'rcpt_004', step: '3. The Blueprint', role: 'Carrying a 36-inch dry-erase whiteboard on a bicycle.' },
      { receiptId: 'rcpt_003', step: '4. The Crucible', role: 'Bottomless black coffee and cheese fries at Silver Crest Diner.' },
      { receiptId: 'rcpt_005', step: '5. The First Milestone', role: 'Street burrito on 24th Mission celebrating 1,000 users.' },
      { receiptId: 'rcpt_006', step: '6. The Cool-down', role: 'Late-night ride home through the San Francisco fog.' },
    ]
  },
  {
    id: 'trail_tokyo_wandering',
    title: 'The Tokyo Neon Sensorium Journey',
    categorySequence: ['Travel & Escapes', 'Tech & Creation', 'Food & Dining', 'Books & Art', 'Late Night'],
    summary: 'Mount Fuji views from the bullet train leading to vintage camera glass in Shinjuku, smokey yakitori alleys, and 2 AM konbini fried chicken.',
    theme: 'Motion → Optics → Flavor → Design → Night Sanctuary',
    receiptIds: ['rcpt_013', 'rcpt_014', 'rcpt_015', 'rcpt_016', 'rcpt_017'],
    nodes: [
      { receiptId: 'rcpt_013', step: '1. The Velocity', role: 'Riding Nozomi Shinkansen past Mt. Fuji with morning bento.' },
      { receiptId: 'rcpt_014', step: '2. The Lens', role: 'Acquiring vintage 1980s Nikkor 50mm f/1.4 prime lens in Shinjuku.' },
      { receiptId: 'rcpt_015', step: '3. The Atmosphere', role: 'Sitting shoulder-to-shoulder in charcoal-scented yakitori alley.' },
      { receiptId: 'rcpt_016', step: '4. The Philosophy', role: 'Daikanyama Tsutaya Books and architectural inspiration.' },
      { receiptId: 'rcpt_017', step: '5. The Midnight Fuel', role: 'Warm Famichiki and Boss Coffee under Shibuya neon.' },
    ]
  },
  {
    id: 'trail_home_sanctuary',
    title: 'The Domesticity & Grounding Loop',
    categorySequence: ['Home & Nesting', 'Home & Nesting', 'Food & Dining', 'Coffee & Fuel', 'Books & Art'],
    summary: 'Transforming an empty apartment into a living sanctuary with bamboo desks, monsteras, warm sourdough crusts, and precision pour-overs.',
    theme: 'Foundation → Growth → Nourishment → Precision → Mind',
    receiptIds: ['rcpt_018', 'rcpt_019', 'rcpt_020', 'rcpt_021', 'rcpt_023'],
    nodes: [
      { receiptId: 'rcpt_018', step: '1. The Foundation', role: 'Flat-pack bamboo desk and assembling home on bare floors.' },
      { receiptId: 'rcpt_019', step: '2. The Greenery', role: 'First Monstera plant placed in the morning sunlight.' },
      { receiptId: 'rcpt_020', step: '3. The Sourdough', role: 'Warm country loaf from Tartine Manufactory on a Sunday.' },
      { receiptId: 'rcpt_021', step: '4. The Precision', role: 'Matte-black electric kettle dialed to 93°C.' },
      { receiptId: 'rcpt_023', step: '5. The Architecture', role: 'Reading Christopher Alexander in Golden Gate Park.' },
    ]
  }
];

/**
 * Dynamically builds relational links between receipts based on temporal proximity,
 * category progression, or common geographical anchors.
 */
export function buildReceiptConnections(receipts = []) {
  if (!Array.isArray(receipts) || receipts.length < 2) {
    return [];
  }

  const connections = [];

  const valid = receipts
    .filter((r) => r && r.date)
    .sort(
      (a, b) =>
        new Date(a.date) - new Date(b.date)
    );

  // Limit connections so the UI stays meaningful
  const MAX_CONNECTIONS = 40;

  // ---------------------------------------
  // 1. SAME LOCATION + DIFFERENT CATEGORY
  // ---------------------------------------

  for (let i = 0; i < valid.length; i++) {
    if (connections.length >= MAX_CONNECTIONS) break;

    const current = valid[i];

    const currentLocation =
      current.location ||
      current.city ||
      current.state;

    if (!currentLocation) continue;

    for (
      let j = i + 1;
      j < Math.min(i + 20, valid.length);
      j++
    ) {
      const next = valid[j];

      const nextLocation =
        next.location ||
        next.city ||
        next.state;

      if (!nextLocation) continue;

      const sameLocation =
        String(currentLocation).toLowerCase() ===
        String(nextLocation).toLowerCase();

      const differentCategory =
        current.category !== next.category;

      if (
        sameLocation &&
        differentCategory
      ) {
        connections.push({
          id: `location-${current.id}-${next.id}`,

          sourceId: current.id,

          targetId: next.id,

          sourceReceipt: current,

          targetReceipt: next,

          type: "Shared Place",

          narrative:
            `${currentLocation} appears across different activity categories.`,

          strength: 0.85,
        });

        break;
      }
    }
  }

  // ---------------------------------------
  // 2. REPEATED CATEGORY PATTERN
  // ---------------------------------------

  const categoryGroups = {};

  valid.forEach((r) => {
    const category =
      r.category ||
      r.type ||
      "Other";

    if (!categoryGroups[category]) {
      categoryGroups[category] = [];
    }

    categoryGroups[category].push(r);
  });

  Object.entries(categoryGroups).forEach(
    ([category, items]) => {
      if (connections.length >= MAX_CONNECTIONS)
        return;

      if (items.length < 2) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (first.id === last.id) return;

      connections.push({
        id: `category-${first.id}-${last.id}`,

        sourceId: first.id,

        targetId: last.id,

        sourceReceipt: first,

        targetReceipt: last,

        type: "Recurring Category",

        narrative:
          `${category} appears repeatedly across the recorded timeline.`,

        strength: 0.7,
      });
    }
  );

  // ---------------------------------------
  // 3. MUSIC → SPENDING CONNECTION
  // ---------------------------------------

  const music = valid.filter(
    (r) =>
      r.category === "Music" ||
      r.artist ||
      r.artist_name ||
      r.track ||
      r.track_name
  );

  const spending = valid.filter(
    (r) =>
      Number(
        r.total ??
          r.amount ??
          r.amt ??
          0
      ) > 0
  );

  for (
    let i = 0;
    i < music.length &&
    connections.length < MAX_CONNECTIONS;
    i++
  ) {
    const musicReceipt = music[i];

    for (
      let j = 0;
      j < spending.length &&
      j < 20;
      j++
    ) {
      const spendingReceipt = spending[j];

      const d1 = new Date(
        musicReceipt.date
      );

      const d2 = new Date(
        spendingReceipt.date
      );

      if (
        isNaN(d1.getTime()) ||
        isNaN(d2.getTime())
      ) {
        continue;
      }

      const days =
        Math.abs(d2 - d1) /
        (1000 * 60 * 60 * 24);

      if (days <= 7) {
        connections.push({
          id: `activity-${musicReceipt.id}-${spendingReceipt.id}`,

          sourceId: musicReceipt.id,

          targetId: spendingReceipt.id,

          sourceReceipt: musicReceipt,

          targetReceipt: spendingReceipt,

          type: "Activity Proximity",

          narrative:
            `Music activity and a recorded transaction occurred within the same week.`,

          strength: 0.55,
        });

        break;
      }
    }
  }

  return connections.slice(
    0,
    MAX_CONNECTIONS
  );
}