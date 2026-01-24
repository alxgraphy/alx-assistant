# ALX Assistant

A brutalist AI portfolio assistant built with Next.js and Google's Gemini API.

## Features

- **AI Chat Interface** - Powered by Gemini 2.5 Flash
- **5 Personality Modes** - Professional, Sarcastic, Enthusiastic, Brutalist, Chaotic
- **Dark/Light Mode** - Pure black and white toggle
- **Rate Limiting** - 10 requests per minute per IP
- **Brutalist Design** - Heavy borders, bold typography, zero curves
- **Custom 404 Page** - Random sarcastic error messages

## Tech Stack

- Next.js 16
- TypeScript
- Google Gemini API
- Tailwind CSS
- Lucide Icons

## Setup

1. Clone the repo:
```bash
git clone https://github.com/alxgraphy/alx-assistant.git
cd alx-assistant
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` and add your Gemini API key:
```
GEMINI_API_KEY=your_key_here
```

Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

4. Run locally:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

1. Push to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add `GEMINI_API_KEY` environment variable
4. Deploy

## License

MIT

## Author

Made with ❤️ in Toronto, Canada 🇨🇦 by Alexander Wondwossen [@alxgraphy](https://github.com/alxgraphy)
