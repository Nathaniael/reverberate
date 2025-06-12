# Reverberate - Spotify Wrapped Clone

A beautiful, dynamic Spotify Wrapped clone built with Next.js 15, React 19, and the Spotify Web API. Experience your musical journey through stunning visualizations and smooth animations.

## Features

- 🎵 **Top Tracks & Artists**: Discover your most played songs and favorite artists
- 🧬 **Musical DNA**: Analyze your music's mood, energy, and emotional fingerprint
- ✨ **Beautiful Animations**: Smooth transitions and engaging visual storytelling
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- 🔐 **Secure OAuth**: Safe authentication through Spotify

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS v4, Radix UI
- **Animation**: Framer Motion
- **Authentication**: NextAuth.js v5
- **API**: Spotify Web API

## Setup Instructions

### 1. Spotify App Setup

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Add redirect URI: `http://localhost:3000/api/auth/callback/spotify`
4. Note your Client ID and Client Secret

### 2. Environment Variables

Create a `.env.local` file with:

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id_here
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
NEXTAUTH_SECRET=your_random_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### 3. Installation & Running

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` and connect your Spotify account!

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── page.tsx           # Landing page
│   ├── wrapped/           # Wrapped experience
│   └── api/auth/          # Authentication endpoints
├── components/
│   ├── ui/                # Reusable UI components
│   ├── auth/              # Authentication components
│   └── wrapped/           # Wrapped-specific components
├── lib/
│   ├── spotify.ts         # Spotify API utilities
│   └── utils.ts           # General utilities
└── auth.ts                # NextAuth configuration
```

## Features Overview

### Welcome Slide
- Personal greeting with user avatar
- Quick stats overview
- Beautiful gradient animations

### Top Tracks
- Your most played songs with album artwork
- Play duration and popularity metrics
- Smooth staggered animations

### Top Artists
- Artist rankings with follower counts
- Genre analysis and insights
- Circular avatar layouts

### Musical DNA
- Audio feature analysis (danceability, energy, valence)
- Mood and tempo insights
- Animated progress bars

### Summary
- Year in review with key statistics
- Personalized music personality
- Shareable highlights

## License

MIT License - feel free to use this project for learning and personal use.

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.
