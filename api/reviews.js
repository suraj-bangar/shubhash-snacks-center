// Vercel serverless function. Env vars: GOOGLE_PLACES_API_KEY, GOOGLE_PLACE_ID
export default async function handler(req, res) {
  const key = process.env.GOOGLE_PLACES_API_KEY, id = process.env.GOOGLE_PLACE_ID;
  if (!key || !id) return res.status(503).json({ error: 'not configured' });
  const r = await fetch(`https://places.googleapis.com/v1/places/${id}`, {
    headers: { 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': 'rating,userRatingCount,reviews' } });
  if (!r.ok) return res.status(502).json({ error: 'google error' });
  const d = await r.json();
  res.setHeader('Cache-Control', 's-maxage=21600');
  res.json({ rating: d.rating, count: d.userRatingCount, reviews: (d.reviews || []).map(v => ({
    author: v.authorAttribution?.displayName, rating: v.rating,
    text: v.text?.text || '', date: v.relativePublishTimeDescription })) });
}
