# 🧾 Your Life, In Receipts

### Memory Archaeology & Data Story

> **What if your receipts weren't just records of what you did, but fragments of the story you lived?**

**Your Life, In Receipts** transforms everyday digital-life records into an interactive visual story.

Instead of treating transactions, purchases, locations, household expenses, and listening history as isolated records, the application connects them to uncover **patterns, relationships, life chapters, and a chronological story** from raw data.

---

## 🌐 Live Demo

🚀 **[Open Your Life, In Receipts](https://your-life-in-receipts-phi.vercel.app/)**

---

## 🎯 Project Idea

Digital life creates thousands of small records:

- What we purchased
- Where activity happened
- What we listened to
- How activity changed over time
- Which categories repeatedly appeared
- Which records are connected

Normally, these records remain disconnected.

**Your Life, In Receipts** turns these records into an interactive digital memory archive.

```text
Raw Datasets
     ↓
Data Normalization
     ↓
Unified Receipt Model
     ↓
Pattern Detection
     ↓
Relationship Discovery
     ↓
Life Chapters
     ↓
Interactive Story
```

---

# ✨ Features

## 🏠 Memory Hub

A high-level overview of the complete dataset.

The dashboard provides:

- Total records
- Activity categories
- Locations
- Spending information
- Listening activity
- Time-based patterns
- Dataset-derived insights

---

## 🧾 Receipt Explorer

Explore individual records through an interactive receipt interface.

### Features

- 🔎 Search
- 🏷️ Category filtering
- 📊 Sorting
- 📄 Pagination
- 👁️ Detailed receipt view
- 🎵 Spotify listening records
- 💰 Transaction records
- 📍 Location information

The explorer uses pagination so that thousands of records do not need to be rendered simultaneously.

---

## 📖 Life Chapters

Instead of displaying a flat list of records, the application groups activity chronologically into chapters.

Each chapter can highlight:

- Time period
- Number of records
- Dominant category
- Dominant location
- Activity patterns
- Supporting records
- Narrative description

This transforms raw chronological data into an understandable timeline.

---

## 🔗 Connections

The Connection Engine discovers relationships between records.

Examples include:

- Repeated activity in the same location
- Repeated categories
- Temporal relationships between music and transactions
- Cross-category relationships

These relationships allow users to explore how different records can be connected within the same timeline.

---

## 🔍 Hidden Patterns

The Pattern Engine searches the dataset for recurring patterns across:

- 📂 Categories
- 📍 Locations
- 💰 Spending
- 🎵 Music
- 🕐 Time of activity

Every detected pattern is supported by records from the underlying dataset.

The application presents these as **data-derived patterns rather than assumptions about the user**.

---

## 📜 Story View

The final storytelling layer transforms discovered chapters and records into a chronological narrative.

Instead of simply showing:

```text
Record → Record → Record → Record
```

the application creates:

```text
Records
   ↓
Patterns
   ↓
Connections
   ↓
Chapters
   ↓
Story
```

The story is grounded in the available dataset rather than manually invented events.

---

# 📊 Datasets

The application combines multiple datasets into a normalized receipt model.

## 🎵 Spotify Listening History

Contains information such as:

- Timestamp
- Track name
- Artist
- Album
- Listening duration
- Platform
- Shuffle status
- Skip status
- Listening reason

---

## 💳 India Transactions

Contains transaction-level information such as:

- Transaction date and time
- Merchant
- Category
- Amount
- City
- State
- Job
- Fraud indicator
- Transaction metadata

---

## 🏠 Daily Household Transactions

Contains:

- Date
- Mode
- Category
- Subcategory
- Note
- Amount
- Income / Expense
- Currency

---

# 🧠 Data Processing Architecture

Different source formats are converted into a common receipt representation.

```text
Spotify Dataset ──────────┐
                          │
India Transactions ───────┼──→ Data Normalization
                          │           │
Household Transactions ──┘           ↓
                              Unified Receipt Model
                                       │
                                       ↓
                         ┌─────────────────────────┐
                         │    Analysis Engines     │
                         ├─────────────────────────┤
                         │ Chapter Engine           │
                         │ Connection Engine        │
                         │ Pattern Engine           │
                         │ Story Engine             │
                         └─────────────────────────┘
                                       │
                                       ↓
                              Interactive Experience
```

---

# 🛠️ Tech Stack

## Frontend

| Technology | Purpose |
|---|---|
| **React** | Component-based user interface |
| **Vite** | Development and production build tooling |
| **JavaScript (ES6+)** | Application logic and data processing |
| **Tailwind CSS** | Responsive styling and UI design |
| **Lucide React** | Interface icons |

## Application Architecture

| Technology / Module | Purpose |
|---|---|
| **React Context API** | Global application and receipt state |
| **Custom JavaScript Engines** | Pattern, connection, chapter and story generation |
| **JSON** | Dataset storage |
| **Client-side Processing** | Dataset analysis directly in the browser |

## Additional Libraries

| Library | Purpose |
|---|---|
| **canvas-confetti** | Pattern reveal interaction |
| **Custom Audio FX** | Interactive sound effects |

## Deployment

| Platform | Purpose |
|---|---|
| **Vercel** | Production deployment |

---

# 🏗️ Application Architecture

```text
                    ┌─────────────────────┐
                    │     React App       │
                    └──────────┬──────────┘
                               │
                               ↓
                    ┌─────────────────────┐
                    │  Receipt Context    │
                    │   Global State      │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              ↓                ↓                ↓
        Receipt Data      Analysis Engines     UI
              │                │                │
              │        ┌───────┼───────┐        │
              │        ↓       ↓       ↓        │
              │    Chapters Connections Patterns │
              │        │       │       │        │
              └────────┴───────┴───────┴────────┘
                               │
                               ↓
                         Story Engine
                               │
                               ↓
                     Interactive Life Story
```

---

# 📁 Project Structure

```text
your-life-in-receipts/
│
├── public/
│   └── data/
│       ├── lifeReceipts.json
│       ├── spotifyInsights.json
│       └── datasetMeta.json
│
├── src/
│   │
│   ├── components/
│   │   ├── ConnectionDiscovery.jsx
│   │   ├── Dashboard.jsx
│   │   ├── DataImporterModal.jsx
│   │   ├── HiddenPatterns.jsx
│   │   ├── LifeChapters.jsx
│   │   ├── Navbar.jsx
│   │   ├── ReceiptCard.jsx
│   │   ├── ReceiptExplorer.jsx
│   │   ├── ReceiptModal.jsx
│   │   └── StoryView.jsx
│   │
│   ├── context/
│   │   └── ReceiptContext.jsx
│   │
│   ├── engines/
│   │   ├── chapterEngine.js
│   │   ├── connectionEngine.js
│   │   ├── patternEngine.js
│   │   └── storyEngine.js
│   │
│   ├── data/
│   │
│   └── utils/
│       ├── audioFx.js
│       └── formatters.js
│
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

# ⚙️ Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/anshika2410-hub/your-life-in-receipts.git
```

## 2. Navigate to the project

```bash
cd your-life-in-receipts
```

## 3. Install dependencies

```bash
npm install
```

## 4. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

## 5. Create a production build

```bash
npm run build
```

---

# 📱 Responsive Design

The interface is designed for:

- 💻 Desktop
- 💻 Laptop
- 📱 Mobile

The Receipt Explorer uses pagination to maintain responsiveness when working with a large number of records.

---

# 🔐 Data & Privacy

The application is designed as a **frontend-only experience**.

The bundled datasets are loaded by the browser and processed client-side.

No backend database or authentication service is required for the core experience.

---

# 🎨 Design Philosophy

The visual design combines:

- Digital scrapbook aesthetics
- Dark cinematic UI
- Receipt-inspired cards
- Timeline visualization
- Editorial typography
- Micro-interactions
- Data-driven storytelling

The goal is to make a large dataset feel like a **personal archive rather than a spreadsheet**.

---

# 🔄 User Journey

The application is designed around five stages:

```text
EXPLORE
   ↓
CONNECT
   ↓
DISCOVER
   ↓
REMEMBER
   ↓
TELL THE STORY
```

### 1. Explore

Browse individual records through the Receipt Explorer.

### 2. Connect

Discover relationships between different records and categories.

### 3. Discover

Reveal recurring patterns across the dataset.

### 4. Remember

View chronological Life Chapters.

### 5. Tell the Story

Experience the final Story View generated from the discovered data.

---

# 🚀 Performance

The application is designed to handle a large normalized dataset efficiently.

Performance considerations include:

- Paginated receipt rendering
- Memoized filtered results
- Limited evidence rendering
- Client-side data normalization
- Efficient pattern calculations
- Lazy-style incremental record loading through "Load More"

This prevents thousands of receipt components from being rendered simultaneously.

---

# 🏆 Hackathon Concept

The project explores the idea that **small digital records can collectively tell a larger story**.

Instead of presenting raw datasets as tables, the application creates multiple layers of interpretation:

```text
Raw Data
   ↓
Receipts
   ↓
Patterns
   ↓
Connections
   ↓
Chapters
   ↓
Story
```

This allows users to move from individual events to higher-level patterns while still being able to inspect the underlying records.

---

# 🔮 Future Improvements

Potential extensions include:

- 🗺️ Geographic map visualization
- 📈 Advanced temporal analytics
- 🎵 More detailed music analysis
- 🔗 More sophisticated relationship detection
- 📊 Interactive data visualizations
- 📥 User-controlled dataset importing
- 📕 Exportable personal storybooks
- 🔒 More privacy-focused local data processing
- 🧩 Additional dataset adapters
- 🤖 Optional AI-assisted narrative generation

---

# 🔗 Project Links

### 🚀 Live Application

https://your-life-in-receipts-phi.vercel.app/

### 💻 GitHub Repository

https://github.com/anshika2410-hub/your-life-in-receipts

---

# 👩‍💻 Built With

```text
React
Vite
JavaScript
Tailwind CSS
Lucide React
Canvas Confetti
Custom JavaScript Analysis Engines
Vercel
```

---

# 📌 Project Summary

**Your Life, In Receipts** turns raw digital-life records into an interactive memory archive by combining:

- Data exploration
- Pattern detection
- Relationship discovery
- Chronological clustering
- Visual storytelling

The result is a frontend experience where thousands of individual records become a connected story of digital life.

---

## ⭐ If you found the project interesting

Explore the live application and discover what your receipts can reveal.
