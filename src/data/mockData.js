export const INITIAL_RECEIPTS = [
  // --- CHAPTER 1: The Indie Hackathon & Garage Era ---
  {
    id: 'rcpt_001',
    merchant: 'Ritual Coffee Roasters',
    date: '2025-09-12',
    time: '08:42 AM',
    total: 8.75,
    currency: '$',
    category: 'Coffee & Fuel',
    chapterId: 'chap_1',
    items: [
      { name: 'Oat Milk Flat White (Extra Shot)', price: 6.50, quantity: 1 },
      { name: 'Cardamom Morning Bun', price: 2.25, quantity: 1 }
    ],
    location: 'Hayes Valley, SF',
    mood: 'Nervous Optimism',
    tags: ['Morning Ritual', 'Coffee', 'Startup Era'],
    notes: 'Drafted the first napkin wireframes for the project. Hand was shaking from the third shot of espresso.',
    stamp: 'CORE MEMORY',
    weather: 'Brisk Fog (14°C)',
    paymentMethod: 'Apple Pay'
  },
  {
    id: 'rcpt_002',
    merchant: 'GitHub & Vercel Domains',
    date: '2025-09-14',
    time: '11:15 PM',
    total: 24.00,
    currency: '$',
    category: 'Tech & Creation',
    chapterId: 'chap_1',
    items: [
      { name: 'Domain Registration (theidea.dev)', price: 12.00, quantity: 1 },
      { name: 'Pro Tier Compute Quota', price: 12.00, quantity: 1 }
    ],
    location: 'Mission District Bedroom, SF',
    mood: 'Hyper-focused',
    tags: ['Code', 'Milestone', 'Late Night'],
    notes: 'Bought the domain at 11pm. We promised ourselves we would launch in 48 hours.',
    stamp: 'UNPLANNED',
    weather: 'Clear Night (12°C)',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'rcpt_003',
    merchant: 'Silver Crest 24hr Diner',
    date: '2025-09-15',
    time: '02:44 AM',
    total: 19.50,
    currency: '$',
    category: 'Late Night',
    chapterId: 'chap_1',
    items: [
      { name: 'Midnight Cheese Fries w/ Gravy', price: 9.00, quantity: 1 },
      { name: 'Bottomless Black Filter Coffee', price: 4.50, quantity: 2 },
      { name: 'Cherry Pie Slice (Warmed)', price: 6.00, quantity: 1 }
    ],
    location: 'Bayshore Blvd, SF',
    mood: 'Exhausted Euphoria',
    tags: ['Night Owl', 'Comfort Food', 'Hackathon'],
    notes: 'The server looked at our two glowing laptops and just kept refilling the mugs without asking. First deployment passed.',
    stamp: '2:00 AM RITUAL',
    weather: 'Dense Fog (11°C)',
    paymentMethod: 'Crinkled Cash'
  },
  {
    id: 'rcpt_004',
    merchant: 'Blick Art Materials',
    date: '2025-09-19',
    time: '04:15 PM',
    total: 38.20,
    currency: '$',
    category: 'Books & Art',
    chapterId: 'chap_1',
    items: [
      { name: 'Magnetic Dry-Erase Board (36x24)', price: 26.50, quantity: 1 },
      { name: 'Chisel-Tip Expo Markers (4-pack)', price: 8.70, quantity: 1 },
      { name: 'Dot Grid Moleskine Cahier', price: 3.00, quantity: 1 }
    ],
    location: 'Market St, SF',
    mood: 'Creative Chaos',
    tags: ['Supplies', 'Architecture', 'Brainstorm'],
    notes: 'Carried the giant whiteboard across Valencia street on a rented bicycle.',
    stamp: 'ESSENTIAL',
    weather: 'Sunny (19°C)',
    paymentMethod: 'Apple Pay'
  },
  {
    id: 'rcpt_005',
    merchant: 'Taqueria El Farolito',
    date: '2025-09-22',
    time: '01:18 AM',
    total: 16.25,
    currency: '$',
    category: 'Late Night',
    chapterId: 'chap_1',
    items: [
      { name: 'Super Burrito (Carne Asada)', price: 12.75, quantity: 1 },
      { name: 'Horchata (Large Jarrito)', price: 3.50, quantity: 1 }
    ],
    location: '24th & Mission, SF',
    mood: 'Triumphant',
    tags: ['Night Owl', 'Tradition', 'Mission Street'],
    notes: 'Eating on the curb under the neon sign after hitting 1,000 GitHub stars.',
    stamp: 'CORE MEMORY',
    weather: 'Warm Breeze (16°C)',
    paymentMethod: 'Crinkled Cash'
  },
  {
    id: 'rcpt_006',
    merchant: 'Uber Technologies Inc',
    date: '2025-09-22',
    time: '02:05 AM',
    total: 21.80,
    currency: '$',
    category: 'Transit & Wandering',
    chapterId: 'chap_1',
    items: [
      { name: 'UberX: Mission 24th to Cole Valley', price: 21.80, quantity: 1 }
    ],
    location: 'San Francisco, CA',
    mood: 'Peaceful Wind-down',
    tags: ['Late Night Ride', 'City Lights'],
    notes: 'Driver was playing lofi hip-hop. The city lights blurred through the fogged-up window.',
    stamp: 'PAID IN FULL',
    weather: 'Foggy (12°C)',
    paymentMethod: 'Apple Pay'
  },

  // --- CHAPTER 2: Midsummer Soundtracks & Brooklyn Vinyl ---
  {
    id: 'rcpt_007',
    merchant: 'Dice.fm Concert Tickets',
    date: '2025-06-18',
    time: '10:00 AM',
    total: 78.00,
    currency: '$',
    category: 'Music & Live',
    chapterId: 'chap_2',
    items: [
      { name: 'Live at Knockdown Center (2x GA)', price: 70.00, quantity: 2 },
      { name: 'Processing & Eco Fee', price: 8.00, quantity: 1 }
    ],
    location: 'Queens / Brooklyn border, NY',
    mood: 'Anticipation',
    tags: ['Live Music', 'Summer Nights', 'Shows'],
    notes: 'The tour we waited three years for. Secured the moment ticket drop opened.',
    stamp: 'CORE MEMORY',
    weather: 'Bright Summer (27°C)',
    paymentMethod: 'Apple Pay'
  },
  {
    id: 'rcpt_008',
    merchant: 'Rough Trade NYC',
    date: '2025-06-20',
    time: '03:45 PM',
    total: 58.40,
    currency: '$',
    category: 'Books & Art',
    chapterId: 'chap_2',
    items: [
      { name: 'Floating Points - Promises (Vinyl LP)', price: 34.00, quantity: 1 },
      { name: 'Independent Music Fanzine Issue #4', price: 8.00, quantity: 1 },
      { name: 'Tote Bag (Canvas)', price: 16.40, quantity: 1 }
    ],
    location: 'Rockefeller / Williamsburg, NY',
    mood: 'Slow Afternoon',
    tags: ['Vinyl', 'Music', 'Curation'],
    notes: 'Smelled like fresh pressed wax and iced espresso.',
    stamp: 'TREASURE',
    weather: 'Sunny & Humid (29°C)',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'rcpt_009',
    merchant: 'L-Train Vintage Thrift',
    date: '2025-06-20',
    time: '05:30 PM',
    total: 42.00,
    currency: '$',
    category: 'Books & Art',
    chapterId: 'chap_2',
    items: [
      { name: 'Washed Denim Chore Jacket (80s)', price: 32.00, quantity: 1 },
      { name: 'Bandana (Sun-faded Indigo)', price: 10.00, quantity: 1 }
    ],
    location: 'Bushwick, Brooklyn',
    mood: 'Euphoric',
    tags: ['Vintage', 'Style', 'Thrifting'],
    notes: 'Fits like it was tailored for me. Still has the faint scent of sandalwood.',
    stamp: 'SPLURGE',
    weather: 'Golden Hour (26°C)',
    paymentMethod: 'Crinkled Cash'
  },
  {
    id: 'rcpt_010',
    merchant: 'Knockdown Center Bar',
    date: '2025-06-21',
    time: '10:45 PM',
    total: 36.00,
    currency: '$',
    category: 'Music & Live',
    chapterId: 'chap_2',
    items: [
      { name: 'Mezcal Paloma w/ Smoked Salt', price: 16.00, quantity: 2 },
      { name: 'Club Soda w/ Lime', price: 4.00, quantity: 1 }
    ],
    location: 'Maspeth, Queens',
    mood: 'Electric Surge',
    tags: ['Live Sound', 'Bass Drops', 'Summer'],
    notes: 'Bass was vibrating our ribs. The synth drop at midnight shook the warehouse.',
    stamp: 'CORE MEMORY',
    weather: 'Warm Summer Drizzle (23°C)',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'rcpt_011',
    merchant: 'Kellogg’s Diner',
    date: '2025-06-22',
    time: '02:30 AM',
    total: 28.50,
    currency: '$',
    category: 'Late Night',
    chapterId: 'chap_2',
    items: [
      { name: 'Disco Fries (Mozzarella + Brown Gravy)', price: 11.50, quantity: 1 },
      { name: 'Chocolate Malt Milkshake', price: 8.50, quantity: 1 },
      { name: 'Stack of Buttermilk Pancakes', price: 8.50, quantity: 1 }
    ],
    location: 'Williamsburg, Brooklyn',
    mood: 'Post-Concert Daze',
    tags: ['Night Owl', 'Post-Show Ritual', 'Comfort'],
    notes: 'Ears ringing, sticky vinyl booth, sharing pancakes at 2:30am with friends.',
    stamp: '2:00 AM RITUAL',
    weather: 'Summer Mist (21°C)',
    paymentMethod: 'Crinkled Cash'
  },
  {
    id: 'rcpt_012',
    merchant: 'Bushwick Film Lab',
    date: '2025-06-25',
    time: '01:20 PM',
    total: 34.00,
    currency: '$',
    category: 'Books & Art',
    chapterId: 'chap_2',
    items: [
      { name: 'Kodak Portra 400 (35mm 36exp)', price: 18.00, quantity: 1 },
      { name: 'C-41 Color Dev + Hi-Res Scan', price: 16.00, quantity: 1 }
    ],
    location: 'Flushing Ave, Brooklyn',
    mood: 'Nostalgic',
    tags: ['Photography', '35mm Film', 'Memories'],
    notes: 'Developing the concert roll. The double exposures on track 4 turned out magical.',
    stamp: 'NO REGRETS',
    weather: 'Hazy Sun (28°C)',
    paymentMethod: 'Apple Pay'
  },

  // --- CHAPTER 3: Neon Tokyo Drizzle & 35mm Wanderlust ---
  {
    id: 'rcpt_013',
    merchant: 'JR East Railway (Shinkansen Ticket)',
    date: '2025-03-28',
    time: '07:15 AM',
    total: 142.00,
    currency: '$',
    category: 'Travel & Escapes',
    chapterId: 'chap_3',
    items: [
      { name: 'Nozomi Shinkansen: Tokyo to Kyoto (Reserved)', price: 130.00, quantity: 1 },
      { name: 'Green Tea Ekiben Bento Box', price: 12.00, quantity: 1 }
    ],
    location: 'Tokyo Central Station, Japan',
    mood: 'Quiet Wonder',
    tags: ['Bullet Train', 'Transit', 'Japan'],
    notes: 'Watched Mount Fuji peek through the morning mist as the train glided at 300 km/h.',
    stamp: 'CORE MEMORY',
    weather: 'Crisp Spring Morning (9°C)',
    paymentMethod: 'Transit IC Pass'
  },
  {
    id: 'rcpt_014',
    merchant: 'Map Camera Shinjuku',
    date: '2025-03-30',
    time: '04:10 PM',
    total: 210.00,
    currency: '$',
    category: 'Tech & Creation',
    chapterId: 'chap_3',
    items: [
      { name: 'Used Nikkor 50mm f/1.4 AI-s Prime Lens', price: 185.00, quantity: 1 },
      { name: 'UV Multi-Coated Filter (52mm)', price: 25.00, quantity: 1 }
    ],
    location: 'Nishi-Shinjuku, Tokyo',
    mood: 'Giddy Excitement',
    tags: ['Vintage Optics', 'Camera Gear', 'Splurge'],
    notes: 'Spent two hours testing aperture rings on the 4th floor. Glass is completely pristine.',
    stamp: 'SPLURGE',
    weather: 'Overcast Neon Glow (13°C)',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'rcpt_015',
    merchant: 'Omoide Yokocho Yakitori Alley',
    date: '2025-03-30',
    time: '08:45 PM',
    total: 32.50,
    currency: '$',
    category: 'Food & Dining',
    chapterId: 'chap_3',
    items: [
      { name: 'Negima & Tsukune Skewer Platter', price: 14.00, quantity: 1 },
      { name: 'Draft Sapporo Black Label (x2)', price: 12.00, quantity: 2 },
      { name: 'Salted Edamame', price: 6.50, quantity: 1 }
    ],
    location: 'Memory Lane, Shinjuku, Tokyo',
    mood: 'Immersion',
    tags: ['Night Market', 'Street Food', 'Atmosphere'],
    notes: 'Sitting shoulder-to-shoulder with strangers under yellow lantern light while coal smoke drifted out into the rain.',
    stamp: 'CORE MEMORY',
    weather: 'Tokyo Neon Drizzle (11°C)',
    paymentMethod: 'Crinkled Cash'
  },
  {
    id: 'rcpt_016',
    merchant: 'Tsutaya Books Daikanyama',
    date: '2025-04-02',
    time: '02:20 PM',
    total: 48.00,
    currency: '$',
    category: 'Books & Art',
    chapterId: 'chap_3',
    items: [
      { name: 'Japanese Architecture & Garden Monograph', price: 36.00, quantity: 1 },
      { name: 'Iced Hojicha Latte', price: 7.00, quantity: 1 },
      { name: 'Washi Paper Postcards (Set of 5)', price: 5.00, quantity: 1 }
    ],
    location: 'Daikanyama T-Site, Tokyo',
    mood: 'Serene Sanctuary',
    tags: ['Architecture', 'Tea', 'Slow Living'],
    notes: 'The architecture of this bookstore changed how I think about physical space and digital interfaces.',
    stamp: 'TREASURE',
    weather: 'Spring Sunshine (17°C)',
    paymentMethod: 'Apple Pay'
  },
  {
    id: 'rcpt_017',
    merchant: 'FamilyMart Shibuya Crossing',
    date: '2025-04-03',
    time: '01:50 AM',
    total: 11.20,
    currency: '$',
    category: 'Late Night',
    chapterId: 'chap_3',
    items: [
      { name: 'Famichiki Crispy Fried Chicken', price: 2.80, quantity: 2 },
      { name: 'Spicy Cod Roe Onigiri', price: 1.80, quantity: 2 },
      { name: 'Boss Coffee Rainbow Mountain Can', price: 2.00, quantity: 1 }
    ],
    location: 'Shibuya, Tokyo',
    mood: 'Late Night Euphoria',
    tags: ['Night Owl', 'Konbini', 'Tokyo Nights'],
    notes: 'Nothing on earth tastes as good as 2 AM Famichiki after walking 25,000 steps through the city.',
    stamp: '2:00 AM RITUAL',
    weather: 'Cool Rain (10°C)',
    paymentMethod: 'Transit IC Pass'
  },

  // --- CHAPTER 4: First Kitchen, Sourdough & Sunday Sanctuaries ---
  {
    id: 'rcpt_018',
    merchant: 'IKEA Home Furnishings',
    date: '2025-11-05',
    time: '01:15 PM',
    total: 289.00,
    currency: '$',
    category: 'Home & Nesting',
    chapterId: 'chap_4',
    items: [
      { name: 'LILLÅSEN Bamboo Writing Desk', price: 149.00, quantity: 1 },
      { name: 'HEKTAR Floor Lamp (Dark Grey)', price: 65.00, quantity: 1 },
      { name: 'Swedish Meatballs Plate + Lingonberry', price: 11.00, quantity: 1 },
      { name: 'Plant Pots & Ceramic Saucers', price: 64.00, quantity: 1 }
    ],
    location: 'Emeryville, CA',
    mood: 'Exhausted Pride',
    tags: ['First Apartment', 'Home', 'Milestone'],
    notes: 'Carrying the flat-pack boxes up three flights of stairs. Sitting on the floor eating pizza surrounded by Allen wrenches.',
    stamp: 'CORE MEMORY',
    weather: 'Autumn Breeze (16°C)',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'rcpt_019',
    merchant: 'Flora Grubb Gardens',
    date: '2025-11-08',
    time: '11:45 AM',
    total: 68.50,
    currency: '$',
    category: 'Home & Nesting',
    chapterId: 'chap_4',
    items: [
      { name: 'Monstera Deliciosa (8-inch pot)', price: 42.00, quantity: 1 },
      { name: 'Terracotta Cylinder Planter', price: 26.50, quantity: 1 }
    ],
    location: 'Bayview, San Francisco',
    mood: 'Nurturing & Rooted',
    tags: ['Houseplants', 'Living Space', 'Greenery'],
    notes: 'Named her Monty. Placed right next to the morning light window.',
    stamp: 'TREASURE',
    weather: 'Crisp Sun (18°C)',
    paymentMethod: 'Apple Pay'
  },
  {
    id: 'rcpt_020',
    merchant: 'Tartine Manufactory',
    date: '2025-11-16',
    time: '09:30 AM',
    total: 31.50,
    currency: '$',
    category: 'Food & Dining',
    chapterId: 'chap_4',
    items: [
      { name: 'Country Sourdough Loaf (Warm)', price: 14.00, quantity: 1 },
      { name: 'Smoked Salmon Tartine w/ Pickled Shallots', price: 17.50, quantity: 1 }
    ],
    location: 'Alabama St, Mission, SF',
    mood: 'Slow Sunday Peace',
    tags: ['Sunday Ritual', 'Sourdough', 'Brunch'],
    notes: 'The crust crackled when we sliced it at home. Smelled like toasted hazelnut and wild yeast.',
    stamp: 'CORE MEMORY',
    weather: 'Autumn Sunshine (17°C)',
    paymentMethod: 'Apple Pay'
  },
  {
    id: 'rcpt_021',
    merchant: 'Fellow Coffee Store',
    date: '2025-11-23',
    time: '03:10 PM',
    total: 165.00,
    currency: '$',
    category: 'Coffee & Fuel',
    chapterId: 'chap_4',
    items: [
      { name: 'Stagg EKG Electric Pour-Over Kettle (Matte Black)', price: 165.00, quantity: 1 }
    ],
    location: 'Valencia St, SF',
    mood: 'Obsessive Craft',
    tags: ['Coffee Gear', 'Pour Over', 'Ritual'],
    notes: 'The exact moment I transitioned from "drinking caffeine for survival" to "dialing in grind size at 93°C."',
    stamp: 'SPLURGE',
    weather: 'Chilly Rain (13°C)',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'rcpt_022',
    merchant: 'Ferry Plaza Farmers Market',
    date: '2025-11-30',
    time: '10:15 AM',
    total: 44.00,
    currency: '$',
    category: 'Food & Dining',
    chapterId: 'chap_4',
    items: [
      { name: 'Heirloom Tomatoes & Persian Cucumbers', price: 14.00, quantity: 1 },
      { name: 'Wild Blackberry Blossom Honey', price: 18.00, quantity: 1 },
      { name: 'Fresh Rosemary & Thyme Bouquets', price: 12.00, quantity: 1 }
    ],
    location: 'Embarcadero, San Francisco',
    mood: 'Grounded & Rested',
    tags: ['Farmers Market', 'Sunday Ritual', 'Home Cooking'],
    notes: 'Listening to the bay seagulls while picking out the sweetest winter citrus.',
    stamp: 'CORE MEMORY',
    weather: 'Sparkling Blue Sky (15°C)',
    paymentMethod: 'Crinkled Cash'
  },
  {
    id: 'rcpt_023',
    merchant: 'Green Apple Books on the Park',
    date: '2025-12-07',
    time: '04:45 PM',
    total: 39.50,
    currency: '$',
    category: 'Books & Art',
    chapterId: 'chap_4',
    items: [
      { name: 'A Pattern Language by Christopher Alexander', price: 28.00, quantity: 1 },
      { name: 'Letterpress Bookmark', price: 4.50, quantity: 1 },
      { name: 'Used Poetry Anthology', price: 7.00, quantity: 1 }
    ],
    location: '9th Ave, Inner Sunset, SF',
    mood: 'Contemplative',
    tags: ['Books', 'Design Philosophy', 'Architecture'],
    notes: 'Read chapter 159 (Light on Two Sides of Every Room) while sitting on a bench in Golden Gate Park.',
    stamp: 'TREASURE',
    weather: 'Fog Rolling In (12°C)',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'rcpt_024',
    merchant: 'Bi-Rite Creamery',
    date: '2025-12-07',
    time: '06:10 PM',
    total: 13.50,
    currency: '$',
    category: 'Food & Dining',
    chapterId: 'chap_4',
    items: [
      { name: 'Salted Caramel & Roasted Banana Double Scoop', price: 9.50, quantity: 1 },
      { name: 'Waffle Cone Upgrade', price: 2.00, quantity: 1 },
      { name: 'Tip for the Scooper', price: 2.00, quantity: 1 }
    ],
    location: '18th St, Dolores Park, SF',
    mood: 'Pure Sweetness',
    tags: ['Comfort', 'Sweet Tooth', 'Dolores'],
    notes: 'Walked through Dolores Park as the city lights started flicking on.',
    stamp: 'UNPLANNED',
    weather: 'Brisk Evening (13°C)',
    paymentMethod: 'Apple Pay'
  },

  // --- ADDITIONAL CONNECTIVE MOMENTS (Cross-Chapter & Cross-Category) ---
  {
    id: 'rcpt_025',
    merchant: 'Roxie Cinema Indie Screenings',
    date: '2025-10-14',
    time: '07:30 PM',
    total: 29.00,
    currency: '$',
    category: 'Books & Art',
    chapterId: 'chap_1',
    items: [
      { name: 'Wong Kar-wai 35mm Retrospective (2x Ticket)', price: 24.00, quantity: 2 },
      { name: 'Nutritional Yeast Stovetop Popcorn', price: 5.00, quantity: 1 }
    ],
    location: '16th St, Mission, SF',
    mood: 'Hypnotic',
    tags: ['Cinema', '35mm', 'Night Out'],
    notes: 'In the Mood for Love on 35mm. The cello score lingered in my head for weeks.',
    stamp: 'CORE MEMORY',
    weather: 'Misty Night (14°C)',
    paymentMethod: 'Apple Pay'
  },
  {
    id: 'rcpt_026',
    merchant: 'Smitten Liquid Nitrogen Ice Cream',
    date: '2025-10-14',
    time: '09:45 PM',
    total: 14.80,
    currency: '$',
    category: 'Food & Dining',
    chapterId: 'chap_1',
    items: [
      { name: 'Earl Grey with Chocolate Chunks', price: 11.50, quantity: 1 },
      { name: 'Housemade Marshmallow Fluff', price: 3.30, quantity: 1 }
    ],
    location: 'Hayes St, SF',
    mood: 'Dreamy',
    tags: ['Post-Cinema Ritual', 'Dessert'],
    notes: 'Our unbroken rule: every cinema night ends with ice cream and dissecting the camera angles.',
    stamp: 'UNPLANNED',
    weather: 'Cool Breeze (13°C)',
    paymentMethod: 'Apple Pay'
  },
  {
    id: 'rcpt_027',
    merchant: 'Blue Bottle Cafe Mint Plaza',
    date: '2025-10-18',
    time: '09:10 AM',
    total: 11.00,
    currency: '$',
    category: 'Coffee & Fuel',
    chapterId: 'chap_1',
    items: [
      { name: 'New Orleans Iced Coffee (Chicory)', price: 6.75, quantity: 1 },
      { name: 'Liege Waffle with Sugar Crystals', price: 4.25, quantity: 1 }
    ],
    location: 'Mint Plaza, SOMA, SF',
    mood: 'Focused Momentum',
    tags: ['Coffee', 'Morning Ritual', 'Work Session'],
    notes: 'Met with our first angel investor. Pitch took 20 minutes, then we talked about coffee beans for an hour.',
    stamp: 'CORE MEMORY',
    weather: 'Sunny & Bright (18°C)',
    paymentMethod: 'Apple Pay'
  },
  {
    id: 'rcpt_028',
    merchant: 'Apple Store Union Square',
    date: '2025-10-19',
    time: '02:00 PM',
    total: 399.00,
    currency: '$',
    category: 'Tech & Creation',
    chapterId: 'chap_1',
    items: [
      { name: 'Noise-Canceling Studio Headphones', price: 399.00, quantity: 1 }
    ],
    location: 'Post St, SF',
    mood: 'Absolute Focus',
    tags: ['Tech Gear', 'Productivity', 'Milestone'],
    notes: 'The investment check cleared. Bought the headphones that would become my second brain.',
    stamp: 'SPLURGE',
    weather: 'Clear (20°C)',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'rcpt_029',
    merchant: 'Spotify AB Subscription',
    date: '2025-06-01',
    time: '00:01 AM',
    total: 10.99,
    currency: '$',
    category: 'Music & Live',
    chapterId: 'chap_2',
    items: [
      { name: 'Premium Individual Monthly', price: 10.99, quantity: 1 }
    ],
    location: 'Digital / Cloud',
    mood: 'Ambient',
    tags: ['Soundtrack', 'Daily Life'],
    notes: 'Top song this month: "Bicep - Glue" played 184 times while coding.',
    stamp: 'AUTOMATED',
    weather: 'N/A',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'rcpt_030',
    merchant: '7-Eleven Convenience',
    date: '2025-06-21',
    time: '03:40 AM',
    total: 7.50,
    currency: '$',
    category: 'Late Night',
    chapterId: 'chap_2',
    items: [
      { name: 'Electrolyte Water (1L)', price: 3.50, quantity: 1 },
      { name: 'Sour Gummy Worms Pack', price: 4.00, quantity: 1 }
    ],
    location: 'Bedford Ave, Williamsburg, NY',
    mood: 'Tired & Grateful',
    tags: ['Night Owl', 'Post-Concert', 'Hydration'],
    notes: 'Sitting on the stoop waiting for the dawn sky to turn bruised purple.',
    stamp: '2:00 AM RITUAL',
    weather: 'Mild Night (20°C)',
    paymentMethod: 'Crinkled Cash'
  }
];

export const INITIAL_CHAPTERS = [
  {
    id: 'chap_1',
    title: 'The Indie Hackathon & Garage Era',
    period: 'September – November 2025',
    subtitle: 'High caffeine, low sleep, and the quiet thrill of shipping',
    vibe: 'electric',
    vibeScore: 94,
    quote: '"We measured progress not in days, but in empty diner coffee pots."',
    summary: 'A 3-month burst of uninhibited creative momentum. Characterized by 2 AM diner sessions, handwritten whiteboard architectures, and the transition from pure ideas to a deployed reality.',
    receiptIds: ['rcpt_001', 'rcpt_002', 'rcpt_003', 'rcpt_004', 'rcpt_005', 'rcpt_006', 'rcpt_025', 'rcpt_026', 'rcpt_027', 'rcpt_028'],
    stats: {
      totalSpent: 593.00,
      dominantCategory: 'Tech & Late Night',
      circadianPeak: '02:00 AM – 04:00 AM',
      topLocation: 'Mission District & Bayshore, SF'
    },
    coverTheme: 'from-amber-600/30 to-indigo-900/40',
    audioMood: 'Lofi keystrokes & diner background murmur'
  },
  {
    id: 'chap_2',
    title: 'Midsummer Soundtracks & Brooklyn Vinyl',
    period: 'June – August 2025',
    subtitle: 'Rumbling basslines, warm film grain, and 3 AM disco fries',
    vibe: 'nostalgic',
    vibeScore: 98,
    quote: '"The summer smelled like fresh vinyl wax, sun-faded denim, and midnight rain."',
    summary: 'A celebration of physical sound, community, and analog photography. Tracing the footsteps between warehouse gigs in Queens, thrift shops in Bushwick, and 24-hour diners.',
    receiptIds: ['rcpt_007', 'rcpt_008', 'rcpt_009', 'rcpt_010', 'rcpt_011', 'rcpt_012', 'rcpt_029', 'rcpt_030'],
    stats: {
      totalSpent: 295.39,
      dominantCategory: 'Music & Art',
      circadianPeak: '10:00 PM – 03:00 AM',
      topLocation: 'Bushwick & Williamsburg, Brooklyn'
    },
    coverTheme: 'from-pink-600/30 to-purple-900/40',
    audioMood: 'Vinyl hiss & distant warehouse kick drum'
  },
  {
    id: 'chap_3',
    title: 'Neon Tokyo Drizzle & 35mm Wanderlust',
    period: 'March – April 2025',
    subtitle: 'Bullet trains, vintage optics, and midnight Famichiki',
    vibe: 'adventurous',
    vibeScore: 96,
    quote: '"Lost in translation, found in the quiet glow of narrow alley lanterns."',
    summary: 'An intoxicating solo expedition through the rainy corridors of Shinjuku and the serene gardens of Kyoto. An archaeology of craftsmanship, fast trains, and roadside konbini comfort.',
    receiptIds: ['rcpt_013', 'rcpt_014', 'rcpt_015', 'rcpt_016', 'rcpt_017'],
    stats: {
      totalSpent: 443.70,
      dominantCategory: 'Travel & Tech',
      circadianPeak: '04:00 PM – 01:00 AM',
      topLocation: 'Shinjuku & Shibuya, Tokyo'
    },
    coverTheme: 'from-rose-600/30 to-cyan-900/40',
    audioMood: 'Shinkansen chime & gentle Tokyo rainfall'
  },
  {
    id: 'chap_4',
    title: 'First Kitchen, Sourdough & Sunday Sanctuaries',
    period: 'November 2025 – Present',
    subtitle: 'Learning to slow down, slice warm bread, and nurture living things',
    vibe: 'cozy',
    vibeScore: 91,
    quote: '"Building a home is just assembling memories one Allen wrench and pour-over at a time."',
    summary: 'The shift toward grounded domestic craft. Flat-pack bamboo desks, heirloom produce from Sunday farmers markets, precise water temperatures for coffee, and books on spatial architecture.',
    receiptIds: ['rcpt_018', 'rcpt_019', 'rcpt_020', 'rcpt_021', 'rcpt_022', 'rcpt_023', 'rcpt_024'],
    stats: {
      totalSpent: 650.50,
      dominantCategory: 'Home & Craft',
      circadianPeak: '09:00 AM – 02:00 PM',
      topLocation: 'Inner Sunset & Mission, SF'
    },
    coverTheme: 'from-emerald-600/30 to-amber-900/40',
    audioMood: 'Kettle boiling & page turns'
  }
];
