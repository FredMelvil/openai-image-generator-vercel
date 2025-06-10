import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  // CORS headers pour toutes les méthodes
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Traiter la pré-requête CORS (OPTIONS) avant toute autre logique
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Test rapide GET
  if (req.method === 'GET') {
    return res.status(200).json({ hello: "API generate OK !" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

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
