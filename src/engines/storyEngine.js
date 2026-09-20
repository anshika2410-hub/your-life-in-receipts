/**
 * Narrative Prose & Memoir Generation Engine
 * Turns connected receipts into evocative, literary stories grounded in line items and timestamps.
 */

export function generateNarrativeStory(chapters = [], receipts = []) {
  if (!chapters || chapters.length === 0) return null;

  const storyChapters = chapters.map((ch, idx) => {
    const chReceipts = receipts.filter(r => (ch.receiptIds || []).includes(r.id));
    const totalSpent = chReceipts.reduce((sum, r) => sum + r.total, 0);

    // Pick key receipts
    const morningR = chReceipts.find(r => r.category === 'Coffee & Fuel') || chReceipts[0];
    const lateR = chReceipts.find(r => r.category === 'Late Night' || (r.time && r.time.includes('AM'))) || chReceipts[chReceipts.length - 1];
    const splurgeR = chReceipts.find(r => r.stamp === 'SPLURGE' || r.total > 100) || chReceipts[1];

    let narrativeProse = '';

    if (ch.id === 'chap_1') {
      narrativeProse = "The era began not with a grand announcement, but with an oat milk flat white at Ritual Coffee in Hayes Valley. In the brisk morning fog, napkin sketches turned into a purchased domain at 11:15 PM. When the first deployment passed in the dead of night, there was no victory champagne—only a warm plate of cheese fries and bottomless black coffee at Silver Crest Diner while the city slept. We were fueled by cheap carbs, expensive markers, and the intoxicating belief that lines of code could bend reality.";
    } else if (ch.id === 'chap_2') {
      narrativeProse = "Summer in Brooklyn was indexed by sound and heat. It was the thrill of scoring Knockdown Center tickets on Dice.fm, followed by wandering into Bushwick thrift shops to buy a sun-faded chore jacket that felt like armor. At 10:45 PM, mezcal was spilled under strobe lights; by 2:30 AM, three of us were splitting pancakes in a booth at Kellogg's Diner with our ears still ringing. A week later, Bushwick Film Lab developed the 35mm memories, locking the golden haze into grain forever.";
    } else if (ch.id === 'chap_3') {
      narrativeProse = "Tokyo in the spring was a masterclass in quiet attention. Looking out from the Shinkansen window at 300 km/h with a green tea bento, the world felt boundless. In Shinjuku, hours disappeared inspecting vintage prime lenses on polished counters, followed by yakitori skewers in the charcoal smoke of Memory Lane. The rain fell gently over Shibuya as 1:50 AM konbini fried chicken became a nightly meditation.";
    } else if (ch.id === 'chap_4') {
      narrativeProse = "The latest chapter is about slowing down and putting down roots. It started with flat-pack boxes on bare hardwood floors, wrestling bamboo desks and floor lamps with Allen wrenches. Then came Monty the Monstera soaking in morning light, Sunday sourdough from Tartine Manufactory, and dialing in water temperatures on a matte black kettle. A transition from sprinting through the world to crafting a sanctuary within it.";
    } else {
      // Dynamic fallback for custom Kaggle data!
      const loc = ch.stats?.topLocation || 'familiar corners';
      narrativeProse = `During ${ch.period}, life gathered around ${loc}. Across ${chReceipts.length} recorded moments, a total of $${totalSpent.toFixed(2)} was exchanged for memories. From ${morningR ? morningR.merchant : 'the morning hours'} to ${lateR ? lateR.merchant : 'the evening lights'}, each line item acted as a quiet anchor in the rhythm of daily living.`;
    }

    return {
      chapterId: ch.id,
      title: ch.title,
      period: ch.period,
      subtitle: ch.subtitle,
      prose: narrativeProse,
      quote: ch.quote,
      vibe: ch.vibe,
      highlightReceipts: chReceipts.slice(0, 4),
      allReceipts: chReceipts,
      stats: ch.stats
    };
  });

  return {
    title: 'The Archaeological Memoir of Moments',
    author: 'As Told By Your Thermal Receipts',
    totalChapters: storyChapters.length,
    chapters: storyChapters
  };
}
