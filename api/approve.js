export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { paymentId } = req.body;
    if (!paymentId) return res.status(400).json({ error: "paymentId missing" });

    const piRes = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
      method: 'POST',
      headers: { 'Authorization': `Key ${process.env.PI_API_KEY}` }
    });

    const data = await piRes.text();
    if (!piRes.ok) return res.status(500).json({ error: data });
    
    return res.status(200).json({ success: true, message: "Pi approved for UGX exchange" });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
