export function discoverHiddenPatterns(receipts = []) {
  if (!Array.isArray(receipts) || receipts.length === 0) {
    return [];
  }

  const safe = receipts.filter(Boolean);

  const patterns = [];

  // --------------------------------
  // 1. CATEGORY PATTERN
  // --------------------------------
  const categoryCounts = {};

  safe.forEach((r) => {
    const category = r.category || "Other";
    categoryCounts[category] =
      (categoryCounts[category] || 0) + 1;
  });

  const topCategory = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])[0];

  if (topCategory) {
    patterns.push({
      id: "pattern-category",
      type: "Category Rhythm",
      title: `${topCategory[0]} appears frequently`,
      description: `${topCategory[0]} accounts for ${topCategory[1]} of your recorded moments.`,
      evidence: safe
        .filter((r) => r.category === topCategory[0])
        .slice(0, 5),
      strength: Math.min(
        0.95,
        topCategory[1] / Math.max(safe.length, 1)
      ),
    });
  }

  // --------------------------------
  // 2. LOCATION PATTERN
  // --------------------------------
  const locationCounts = {};

  safe.forEach((r) => {
    const location =
      r.location ||
      r.city ||
      r.state ||
      null;

    if (location) {
      locationCounts[location] =
        (locationCounts[location] || 0) + 1;
    }
  });

  const topLocation = Object.entries(locationCounts)
    .sort((a, b) => b[1] - a[1])[0];

  if (topLocation) {
    patterns.push({
      id: "pattern-location",
      type: "Place Pattern",
      title: `${topLocation[0]} keeps appearing`,
      description: `${topLocation[0]} is the most frequently recorded location.`,
      evidence: safe
        .filter(
          (r) =>
            r.location === topLocation[0] ||
            r.city === topLocation[0] ||
            r.state === topLocation[0]
        )
        .slice(0, 5),
      strength: Math.min(
        0.9,
        topLocation[1] / Math.max(safe.length, 1)
      ),
    });
  }

  // --------------------------------
  // 3. SPENDING PATTERN
  // --------------------------------
  const amounts = safe
    .map((r) => Number(r.total ?? r.amount ?? r.amt))
    .filter((n) => Number.isFinite(n) && n > 0);

  if (amounts.length > 0) {
    const total = amounts.reduce(
      (sum, value) => sum + value,
      0
    );

    const average = total / amounts.length;

    patterns.push({
      id: "pattern-spending",
      type: "Spending Pattern",
      title: "Your recorded spending has a rhythm",
      description: `Average recorded transaction value is ${average.toFixed(
        2
      )}.`,
      evidence: safe
        .filter((r) => {
          const value = Number(
            r.total ?? r.amount ?? r.amt
          );
          return Number.isFinite(value) && value > average;
        })
        .slice(0, 5),
      strength: 0.72,
    });
  }

  // --------------------------------
  // 4. MUSIC / SPOTIFY PATTERN
  // --------------------------------
  const musicReceipts = safe.filter(
    (r) =>
      r.category === "Music" ||
      r.type === "music" ||
      r.artist ||
      r.track ||
      r.track_name
  );

  if (musicReceipts.length > 0) {
    const artists = {};

    musicReceipts.forEach((r) => {
      const artist =
        r.artist ||
        r.artist_name ||
        "Unknown artist";

      artists[artist] =
        (artists[artist] || 0) + 1;
    });

    const topArtist = Object.entries(artists)
      .sort((a, b) => b[1] - a[1])[0];

    if (topArtist) {
      patterns.push({
        id: "pattern-music",
        type: "Listening Pattern",
        title: `${topArtist[0]} appears repeatedly`,
        description: `${topArtist[0]} appears in ${topArtist[1]} recorded listening moments.`,
        evidence: musicReceipts
          .filter(
            (r) =>
              (r.artist ||
                r.artist_name ||
                "Unknown artist") === topArtist[0]
          )
          .slice(0, 5),
        strength: 0.8,
      });
    }
  }

  // --------------------------------
  // 5. TIME PATTERN
  // --------------------------------
  const hourCounts = {};

  safe.forEach((r) => {
    if (!r.date) return;

    const date = new Date(r.date);

    if (isNaN(date.getTime())) return;

    const hour = date.getHours();

    hourCounts[hour] =
      (hourCounts[hour] || 0) + 1;
  });

  const topHour = Object.entries(hourCounts)
    .sort((a, b) => b[1] - a[1])[0];

  if (topHour) {
    const hour = Number(topHour[0]);

    const label =
      hour < 6
        ? "late night"
        : hour < 12
        ? "morning"
        : hour < 18
        ? "afternoon"
        : "evening";

    patterns.push({
      id: "pattern-time",
      type: "Time Pattern",
      title: `A ${label} rhythm appears`,
      description: `A large share of recorded moments happened during the ${label}.`,
      evidence: safe
        .filter((r) => {
          if (!r.date) return false;

          const date = new Date(r.date);

          return (
            !isNaN(date.getTime()) &&
            date.getHours() === hour
          );
        })
        .slice(0, 5),
      strength: 0.68,
    });
  }

  return patterns;
}