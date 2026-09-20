export async function loadRealData() {
  const [receiptsRes, spotifyRes, metaRes] = await Promise.all([
    fetch('/data/lifeReceipts.json'),
    fetch('/data/spotifyInsights.json'),
    fetch('/data/datasetMeta.json')
  ]);
  if (!receiptsRes.ok || !spotifyRes.ok || !metaRes.ok) throw new Error('Failed to load hackathon datasets');
  return { receipts: await receiptsRes.json(), spotifyInsights: await spotifyRes.json(), meta: await metaRes.json() };
}
