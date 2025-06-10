import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  // Sécurité CORS : n'autorise que ton site officiel
  res.setHeader('Access-Control-Allow-Origin', 'https://myiacontent.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Gestion de la pré-demande CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Test GET (utile pour vérifier que l’API fonctionne)
  if (req.method === 'GET') {
    return res.status(200).json({ hello: "API generate OK !" });
  }

  // Refuse toutes les autres méthodes que POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Récupération du prompt envoyé
  let prompt = null;
  try {
    if (req.body && typeof req.body === "string") {
      prompt = JSON.parse(req.body).prompt;
    } else {
      prompt = req.body.prompt;
    }
  } catch (e) {
    return res.status(400).json({ error: "Invalid JSON" });
  }

  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt" });
  }

  // Appel à l'API OpenAI/DALL·E
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024"
    });

    res.status(200).json({ imageUrl: response.data[0].url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate image" });
  }
}
