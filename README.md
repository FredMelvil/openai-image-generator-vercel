# OpenAI Image Generator API

Une API déployable sur Vercel pour générer des images avec OpenAI DALL·E 3.

## Endpoint

POST `/api/generate`

Body JSON :
```json
{
  "prompt": "un chat avec un casque qui danse"
}
```

Réponse :
```json
{
  "image": "https://..."
}
```
