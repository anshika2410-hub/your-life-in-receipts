export function clusterIntoLifeChapters(receipts = []) {
  if (!Array.isArray(receipts) || receipts.length === 0) {
    return [];
  }

  const valid = receipts
    .filter(Boolean)
    .filter((r) => r.date)
    .sort(
      (a, b) =>
        new Date(a.date) - new Date(b.date)
    );

  if (!valid.length) return [];

  const chapters = [];

  // Group records by month
  const groups = {};

  valid.forEach((receipt) => {
    const date = new Date(receipt.date);

    if (isNaN(date.getTime())) return;

    const key =
      `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(receipt);
  });

  Object.entries(groups).forEach(
    ([key, items], index) => {
      if (!items.length) return;

      const firstDate = new Date(items[0].date);
      const lastDate = new Date(
        items[items.length - 1].date
      );

      // Category distribution
      const categoryCounts = {};

      items.forEach((r) => {
        const category =
          r.category ||
          r.type ||
          "Other";

        categoryCounts[category] =
          (categoryCounts[category] || 0) + 1;
      });

      const dominantCategory =
        Object.entries(categoryCounts)
          .sort((a, b) => b[1] - a[1])[0]?.[0] ||
        "Other";

      // Location distribution
      const locationCounts = {};

      items.forEach((r) => {
        const location =
          r.location ||
          r.city ||
          r.state;

        if (!location) return;

        locationCounts[location] =
          (locationCounts[location] || 0) + 1;
      });

      const dominantLocation =
        Object.entries(locationCounts)
          .sort((a, b) => b[1] - a[1])[0]?.[0] ||
        null;

      // Spending
      const totalAmount = items.reduce(
        (sum, r) =>
          sum +
          (Number(
            r.total ??
              r.amount ??
              r.amt ??
              0
          ) || 0),
        0
      );

      // Time of day
      const hourCounts = {};

      items.forEach((r) => {
        const d = new Date(r.date);

        if (isNaN(d.getTime())) return;

        const hour = d.getHours();

        hourCounts[hour] =
          (hourCounts[hour] || 0) + 1;
      });

      const dominantHour =
        Object.entries(hourCounts)
          .sort((a, b) => b[1] - a[1])[0]?.[0];

      let timeLabel = "Throughout the day";

      if (dominantHour !== undefined) {
        const hour = Number(dominantHour);

        if (hour < 6) {
          timeLabel = "Late night";
        } else if (hour < 12) {
          timeLabel = "Morning";
        } else if (hour < 18) {
          timeLabel = "Afternoon";
        } else {
          timeLabel = "Evening";
        }
      }

      const monthName =
        firstDate.toLocaleDateString(
          "en-US",
          {
            month: "short",
            year: "numeric",
          }
        );

      chapters.push({
        id: `chapter-${key}`,

        title:
          `Chapter ${index + 1}: ${monthName}`,

        startDate:
          items[0].date,

        endDate:
          items[items.length - 1].date,

        receipts: items,

        receiptIds:
          items.map((r) => r.id),

        count: items.length,

        dominantCategory,

        dominantLocation,

        totalAmount,

        categoryCounts,

        timeLabel,

        subtitle:
          `${items.length} recorded moments • ${dominantCategory}`,

        quote:
          `This chapter contains ${items.length} recorded moments, with ${dominantCategory} appearing most often.`,

        description:
          `From ${firstDate.toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
              year: "numeric",
            }
          )} to ${lastDate.toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
              year: "numeric",
            }
          )}, the dataset records ${items.length} moments. The dominant category was ${dominantCategory}.`,

        financialFootprint:
          totalAmount,

        vibeScore:
          Math.min(
            100,
            Math.round(
              50 +
                Math.min(
                  items.length / 10,
                  40
                )
            )
          ),

        circadianPeak:
          timeLabel,

        geographicAnchor:
          dominantLocation ||
          "No location recorded",
      });
    }
  );

  return chapters;
}