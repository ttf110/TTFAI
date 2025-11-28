export default async function handler(req, res) {
  // Vercel serverless function style
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  const body = await (async () => {
    try {
      return req.body && Object.keys(req.body).length ? req.body : JSON.parse(await new Promise(r => {
        let d=''; req.on('data',c=>d+=c); req.on('end',()=>r(d))
      }))
    } catch (e) { return {} }
  })()

  const message = body.message || ''
  if (!message) {
    res.status(400).json({ error: 'Missing message' })
    return
  }

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY
  if (!OPENAI_API_KEY) {
    res.status(500).json({ error: 'OpenAI API key not configured on server' })
    return
  }

  try {
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: message }],
        max_tokens: 600
      })
    })
    if (!resp.ok) {
      const txt = await resp.text()
      res.status(502).json({ error: 'OpenAI error', detail: txt })
      return
    }
    const data = await resp.json()
    // Safely extract reply
    const reply = (data.choices && data.choices[0] && (data.choices[0].message?.content || data.choices[0].text)) || JSON.stringify(data)
    res.status(200).json({ reply })
  } catch (err) {
    res.status(500).json({ error: 'Server error', detail: String(err) })
  }
}
