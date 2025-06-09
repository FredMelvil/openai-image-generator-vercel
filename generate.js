import { OpenAI } from 'openai';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Méthode non autorisée');

  const { prompt } = req.body;

  if (!prompt) return res.status(400).json({ error: 'Prompt manquant' });

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: '1024x1024'
    });

    const imageUrl = response.data[0].url;
    res.status(200).json({ imageUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
