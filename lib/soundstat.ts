export interface SoundStatTrack {
  id: string
  name: string
  artists: string[]
  popularity: number
  genre: string
  duration_ms: number
  features: {
    tempo: number,
    key: number
    mode: number
    key_confidence: number
    energy: number
    danceability: number
    valence: number
    instrumentalness: number
    acousticness: number
    loudness: number
    segments: {
      count: number,
      average_duration: number
    }
    beats: {
      count: number
      regularity: number
    }
  }
}

export interface SoundStatStatus {
  status: 'completed' | 'in_progress' | 'failed' | 'not_found'
  progress?: number
  message?: string
}

export interface AudioFeatures {
  danceability: number
  energy: number
  valence: number
  tempo: number
  acousticness: number
  instrumentalness: number
  loudness: number
  key: number
  mode: number
  time_signature: number
}

class SoundStatAPI {
  private apiKey: string
  private baseUrl = 'https://soundstat.info/api/v1'

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  private async fetch(endpoint: string) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        'X-API-Key': this.apiKey,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`SoundStat API error:`, {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        error: errorText
      })
      throw new Error(`SoundStat API error: ${response.status} - ${errorText}`)
    }

    return response.json()
  }

  async getTrackStatus(spotifyId: string): Promise<SoundStatStatus> {
    return this.fetch(`/track/${spotifyId}/status`)
  }

  async getTrackAnalysis(spotifyId: string): Promise<SoundStatTrack> {
    return this.fetch(`/track/${spotifyId}`)
  }

  async waitForAnalysis(spotifyId: string, maxWaitTime = 30000): Promise<SoundStatTrack | null> {
    const startTime = Date.now()
    const pollInterval = 10000 // 2 seconds

    while (Date.now() - startTime < maxWaitTime) {
      try {
        // First try to get the analysis directly
        const track = await this.getTrackAnalysis(spotifyId)
        if (track && track.features) {
          return track
        }
      } catch (error) {
        // If track analysis fails, check the status
        const errorMessage = error instanceof Error ? error.message : String(error)
        if (errorMessage.includes('404') || errorMessage.includes('in_progress')) {
          try {
            const status = await this.getTrackStatus(spotifyId)
            console.log(`Track ${spotifyId} status:`, status)

            if (status.status === 'completed') {
              // Analysis is complete, try to fetch again
              return this.getTrackAnalysis(spotifyId)
            } else if (status.status === 'failed' || status.status === 'not_found') {
              console.warn(`Track ${spotifyId} analysis failed or not found`)
              return null
            } else if (status.status === 'in_progress') {
              console.log(`Track ${spotifyId} analysis in progress (${status.progress || 0}%)`)
              // Wait before next poll
              await new Promise(resolve => setTimeout(resolve, pollInterval))
              continue
            }
          } catch (statusError) {
            console.warn(`Failed to check status for track ${spotifyId}:`, statusError)
            return null
          }
        } else {
          throw error
        }
      }
    }

    console.warn(`Timeout waiting for analysis of track ${spotifyId}`)
    return null
  }

  async getAudioFeatures(spotifyId: string): Promise<AudioFeatures> {
    try {
      const track = await this.waitForAnalysis(spotifyId)

      if (!track || !track.features) {
        throw new Error(`No analysis available for track ${spotifyId}`)
      }

      const analysis = track.features

      return {
        danceability: analysis.danceability,
        energy: analysis.energy,
        valence: analysis.valence,
        tempo: analysis.tempo,
        acousticness: analysis.acousticness,
        instrumentalness: analysis.instrumentalness,
        loudness: analysis.loudness,
        key: analysis.key,
        mode: analysis.mode,
        time_signature: 4, // Default, not provided by SoundStat
      }
    } catch (error) {
      console.warn(`Failed to get audio features for track ${spotifyId}:`, error)
      throw error
    }
  }

  async getBulkAudioFeatures(spotifyIds: string[]): Promise<AudioFeatures[]> {
    console.log(`Processing ${spotifyIds.length} tracks for audio analysis...`)

    // Process tracks in smaller batches to avoid overwhelming the API
    const batchSize = 5
    const allResults: (AudioFeatures | null)[] = []

    for (let i = 0; i < spotifyIds.length; i += batchSize) {
      const batch = spotifyIds.slice(i, i + batchSize)
      console.log(`Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(spotifyIds.length / batchSize)}`)

      const batchResults = await Promise.allSettled(
        batch.map(async (id) => {
          try {
            const feature = await this.getAudioFeatures(id)
            console.log(`Successfully fetched features for track ${id}`)
            return feature
          } catch (error) {
            console.warn(`Failed to fetch features for track ${id}:`, error)
            return null
          }
        })
      )

      const batchValues = batchResults
        .filter((result): result is PromiseFulfilledResult<AudioFeatures | null> =>
          result.status === 'fulfilled'
        )
        .map(result => result.value)

      allResults.push(...batchValues)

      // Small delay between batches to be respectful to the API
      if (i + batchSize < spotifyIds.length) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }

    const successfulFeatures = allResults.filter((result): result is AudioFeatures => result !== null)
    console.log(`Successfully fetched ${successfulFeatures.length} out of ${spotifyIds.length} audio features`)
    return successfulFeatures
  }
}

export function createSoundStatAPI(apiKey: string) {
  return new SoundStatAPI(apiKey)
}

// Utility functions for audio feature analysis
export function calculateAverageFeatures(features: AudioFeatures[]): AudioFeatures {
  if (features.length === 0) {
    throw new Error('No features to calculate average from')
  }

  const sums = features.reduce((acc, feature) => ({
    danceability: acc.danceability + feature.danceability,
    energy: acc.energy + feature.energy,
    valence: acc.valence + feature.valence,
    tempo: acc.tempo + feature.tempo,
    acousticness: acc.acousticness + feature.acousticness,
    instrumentalness: acc.instrumentalness + feature.instrumentalness,
    loudness: acc.loudness + feature.loudness,
    key: acc.key + feature.key,
    mode: acc.mode + feature.mode,
    time_signature: acc.time_signature + feature.time_signature,
  }), {
    danceability: 0,
    energy: 0,
    valence: 0,
    tempo: 0,
    acousticness: 0,
    instrumentalness: 0,
    loudness: 0,
    key: 0,
    mode: 0,
    time_signature: 0,
  })

  const count = features.length
  return {
    danceability: sums.danceability / count,
    energy: sums.energy / count,
    valence: sums.valence / count,
    tempo: sums.tempo / count,
    acousticness: sums.acousticness / count,
    instrumentalness: sums.instrumentalness / count,
    loudness: sums.loudness / count,
    key: Math.round(sums.key / count),
    mode: Math.round(sums.mode / count),
    time_signature: Math.round(sums.time_signature / count),
  }
}

// Enhanced mood analysis types and functions
export interface DetailedMood {
  primary: string
  secondary?: string
  intensity: 'Low' | 'Medium' | 'High'
  description: string
  characteristics: string[]
  musicalContext: string
  recommendedActivities: string[]
  colorScheme: {
    primary: string
    secondary: string
    gradient: string
  }
}

export interface MoodAnalysis {
  mood: DetailedMood
  emotionalSpectrum: {
    positivity: number
    energy: number
    danceability: number
    introspection: number
  }
  musicalProfile: {
    tempo: number
    complexity: number
    organicness: number // opposite of electronic
    dynamism: number
  }
  insights: string[]
}

const MOOD_DEFINITIONS: Record<string, {
  description: string
  characteristics: string[]
  musicalContext: string
  recommendedActivities: string[]
  colorScheme: {
    primary: string
    secondary: string
    gradient: string
  }
}> = {
  "Euphoric": {
    description: "Pure bliss and overwhelming joy in your musical choices",
    characteristics: ["High energy", "Extremely positive", "Uplifting", "Celebratory"],
    musicalContext: "Music that makes you feel like you're on top of the world",
    recommendedActivities: ["Dancing", "Celebrating", "Working out", "Party hosting"],
    colorScheme: {
      primary: "#FFD700",
      secondary: "#FF6B6B",
      gradient: "from-yellow-400 via-orange-400 to-pink-500"
    }
  },
  "Ecstatic": {
    description: "High-energy euphoria with an irresistible urge to move",
    characteristics: ["Maximum energy", "Dance-inducing", "Rhythmic", "Explosive"],
    musicalContext: "Tracks that demand movement and celebration",
    recommendedActivities: ["Club dancing", "Festival vibes", "High-intensity workouts", "Party games"],
    colorScheme: {
      primary: "#FF1493",
      secondary: "#00FFFF",
      gradient: "from-pink-500 via-purple-500 to-cyan-400"
    }
  },
  "Blissful": {
    description: "Serene happiness and contentment flow through your music",
    characteristics: ["Peaceful joy", "Harmonious", "Uplifting", "Gentle"],
    musicalContext: "Music that brings inner peace and gentle happiness",
    recommendedActivities: ["Meditation", "Yoga", "Sunset watching", "Reading"],
    colorScheme: {
      primary: "#87CEEB",
      secondary: "#FFE4B5",
      gradient: "from-blue-300 via-teal-200 to-yellow-200"
    }
  },
  "Energetic": {
    description: "High-octane music that fuels your drive and motivation",
    characteristics: ["High tempo", "Driving beats", "Motivational", "Powerful"],
    musicalContext: "Music that pushes you forward and keeps you going",
    recommendedActivities: ["Working out", "Running", "Productivity sessions", "Cleaning"],
    colorScheme: {
      primary: "#FF4500",
      secondary: "#FFD700",
      gradient: "from-red-500 via-orange-500 to-yellow-400"
    }
  },
  "Happy": {
    description: "Cheerful and optimistic vibes dominate your playlist",
    characteristics: ["Upbeat", "Positive", "Feel-good", "Sunny"],
    musicalContext: "Music that brightens your day and lifts your spirits",
    recommendedActivities: ["Socializing", "Cooking", "Road trips", "Creative projects"],
    colorScheme: {
      primary: "#32CD32",
      secondary: "#FFD700",
      gradient: "from-green-400 via-yellow-400 to-orange-300"
    }
  },
  "Party": {
    description: "Your music screams celebration and social energy",
    characteristics: ["Dance-friendly", "Social", "Rhythmic", "Fun"],
    musicalContext: "Perfect soundtrack for gatherings and good times",
    recommendedActivities: ["Hosting parties", "Social dancing", "Karaoke", "Game nights"],
    colorScheme: {
      primary: "#FF69B4",
      secondary: "#00CED1",
      gradient: "from-pink-400 via-purple-400 to-blue-400"
    }
  },
  "Balanced": {
    description: "A harmonious blend of emotions and energies",
    characteristics: ["Versatile", "Moderate energy", "Adaptable", "Well-rounded"],
    musicalContext: "Music that works for many moods and situations",
    recommendedActivities: ["Background music", "Work", "Casual listening", "Mixed activities"],
    colorScheme: {
      primary: "#9370DB",
      secondary: "#20B2AA",
      gradient: "from-purple-400 via-blue-400 to-teal-400"
    }
  },
  "Chill": {
    description: "Relaxed and laid-back musical preferences",
    characteristics: ["Low energy", "Relaxing", "Mellow", "Easygoing"],
    musicalContext: "Perfect for unwinding and taking life slowly",
    recommendedActivities: ["Lounging", "Coffee time", "Reading", "Casual conversations"],
    colorScheme: {
      primary: "#4682B4",
      secondary: "#B0E0E6",
      gradient: "from-blue-400 via-blue-300 to-blue-200"
    }
  },
  "Contemplative": {
    description: "Thoughtful and introspective musical journey",
    characteristics: ["Reflective", "Deep", "Atmospheric", "Meaningful"],
    musicalContext: "Music that encourages deep thinking and self-reflection",
    recommendedActivities: ["Journaling", "Long walks", "Art creation", "Philosophy"],
    colorScheme: {
      primary: "#708090",
      secondary: "#DDA0DD",
      gradient: "from-gray-500 via-purple-300 to-indigo-300"
    }
  },
  "Melancholic": {
    description: "Beautiful sadness and bittersweet emotions",
    characteristics: ["Emotionally rich", "Nostalgic", "Deep", "Poignant"],
    musicalContext: "Music that embraces the beauty in sadness",
    recommendedActivities: ["Reflection", "Art appreciation", "Rainy day activities", "Memory processing"],
    colorScheme: {
      primary: "#4169E1",
      secondary: "#9932CC",
      gradient: "from-blue-600 via-indigo-500 to-purple-500"
    }
  },
  "Moody": {
    description: "Complex emotional landscapes with shifting energies",
    characteristics: ["Variable energy", "Emotionally complex", "Dynamic", "Unpredictable"],
    musicalContext: "Music that captures the full spectrum of human emotion",
    recommendedActivities: ["Creative expression", "Mood journaling", "Artistic pursuits", "Emotional processing"],
    colorScheme: {
      primary: "#8A2BE2",
      secondary: "#DC143C",
      gradient: "from-purple-600 via-indigo-600 to-red-500"
    }
  },
  "Dreamy": {
    description: "Ethereal and otherworldly musical atmosphere",
    characteristics: ["Atmospheric", "Floating", "Surreal", "Ambient"],
    musicalContext: "Music that transports you to another realm",
    recommendedActivities: ["Stargazing", "Meditation", "Creative visualization", "Relaxation"],
    colorScheme: {
      primary: "#E6E6FA",
      secondary: "#FFB6C1",
      gradient: "from-lavender via-pink-200 to-blue-200"
    }
  },
  "Nostalgic": {
    description: "Wistful longing for times past",
    characteristics: ["Sentimental", "Warm", "Familiar", "Timeless"],
    musicalContext: "Music that evokes memories and past experiences",
    recommendedActivities: ["Photo browsing", "Memory sharing", "Vintage activities", "Storytelling"],
    colorScheme: {
      primary: "#CD853F",
      secondary: "#F0E68C",
      gradient: "from-amber-600 via-yellow-400 to-orange-300"
    }
  },
  "Intense": {
    description: "Powerful and overwhelming musical experiences",
    characteristics: ["High intensity", "Dramatic", "Emotionally charged", "Immersive"],
    musicalContext: "Music that demands your full attention and emotional investment",
    recommendedActivities: ["Focused listening", "Intense workouts", "Emotional release", "Deep conversations"],
    colorScheme: {
      primary: "#B22222",
      secondary: "#FF4500",
      gradient: "from-red-700 via-red-500 to-orange-500"
    }
  }
}

export function getAdvancedMoodFromFeatures(features: AudioFeatures): MoodAnalysis {
  const { valence, energy, danceability, acousticness, instrumentalness, tempo, loudness } = features

  // Calculate emotional spectrum
  const emotionalSpectrum = {
    positivity: valence * 100,
    energy: energy * 100,
    danceability: danceability * 100,
    introspection: (1 - valence + instrumentalness + acousticness) / 3 * 100
  }

  // Calculate musical profile
  const musicalProfile = {
    tempo: tempo,
    complexity: ((1 - danceability) + instrumentalness + (Math.abs(loudness) / 60)) / 3 * 100,
    organicness: acousticness * 100,
    dynamism: (energy + (tempo / 200) + (Math.abs(loudness) / 60)) / 3 * 100
  }

  // Determine primary mood with more nuanced logic
  let primaryMood: string
  let secondaryMood: string | undefined
  let intensity: 'Low' | 'Medium' | 'High'

  // Determine intensity based on overall musical intensity
  const overallIntensity = (energy + danceability + (tempo / 200) + (Math.abs(loudness) / 60)) / 4
  if (overallIntensity > 0.7) intensity = 'High'
  else if (overallIntensity > 0.4) intensity = 'Medium'
  else intensity = 'Low'

  // Complex mood detection algorithm
  if (valence > 0.8 && energy > 0.8 && danceability > 0.7) {
    primaryMood = "Euphoric"
    if (tempo > 130) secondaryMood = "Ecstatic"
  } else if (valence > 0.7 && energy > 0.8 && tempo > 140) {
    primaryMood = "Ecstatic"
  } else if (valence > 0.6 && acousticness > 0.5 && energy < 0.6) {
    primaryMood = "Blissful"
  } else if (danceability > 0.75 && energy > 0.6 && valence > 0.5) {
    primaryMood = "Party"
  } else if (energy > 0.8 && tempo > 120) {
    primaryMood = "Energetic"
  } else if (valence > 0.6 && energy > 0.5) {
    primaryMood = "Happy"
  } else if (valence < 0.3 && energy < 0.4 && acousticness > 0.4) {
    primaryMood = "Melancholic"
    if (instrumentalness > 0.5) secondaryMood = "Contemplative"
  } else if (valence < 0.4 && energy < 0.6) {
    if (acousticness > 0.6) primaryMood = "Contemplative"
    else primaryMood = "Moody"
  } else if (energy < 0.3 && tempo < 100) {
    if (acousticness > 0.7) primaryMood = "Dreamy"
    else primaryMood = "Chill"
  } else if (instrumentalness > 0.7 && acousticness > 0.5) {
    primaryMood = "Contemplative"
  } else if (valence < 0.5 && valence > 0.3 && acousticness > 0.5) {
    primaryMood = "Nostalgic"
  } else if (energy > 0.7 && Math.abs(loudness) > 10) {
    primaryMood = "Intense"
  } else {
    primaryMood = "Balanced"
  }

  // Generate insights based on the analysis
  const insights: string[] = []

  if (emotionalSpectrum.positivity > 70) {
    insights.push("Your music radiates exceptional positivity and joy")
  } else if (emotionalSpectrum.positivity < 30) {
    insights.push("You're drawn to deeper, more complex emotional expressions")
  }

  if (musicalProfile.organicness > 70) {
    insights.push("You have a strong preference for organic, acoustic sounds")
  } else if (musicalProfile.organicness < 30) {
    insights.push("Electronic and produced sounds dominate your taste")
  }

  if (musicalProfile.complexity > 70) {
    insights.push("You appreciate sophisticated and intricate musical arrangements")
  }

  if (tempo > 140) {
    insights.push("High-tempo tracks fuel your musical experience")
  } else if (tempo < 80) {
    insights.push("Slower, more contemplative tempos define your style")
  }

  if (emotionalSpectrum.danceability > 80) {
    insights.push("Music that moves your body is essential to your listening experience")
  }

  const moodData = MOOD_DEFINITIONS[primaryMood] || MOOD_DEFINITIONS["Balanced"]

  return {
    mood: {
      primary: primaryMood,
      secondary: secondaryMood,
      intensity,
      description: moodData.description,
      characteristics: moodData.characteristics,
      musicalContext: moodData.musicalContext,
      recommendedActivities: moodData.recommendedActivities,
      colorScheme: moodData.colorScheme
    },
    emotionalSpectrum,
    musicalProfile,
    insights
  }
}

// Keep the original function for backward compatibility
export function getMoodFromFeatures(features: AudioFeatures): string {
  const analysis = getAdvancedMoodFromFeatures(features)
  return analysis.mood.primary
}

export function getGenreFromFeatures(features: AudioFeatures): string {
  const { tempo, danceability, energy, acousticness, instrumentalness } = features

  if (danceability > 0.8 && tempo > 120) return "Electronic/Dance"
  if (acousticness > 0.7) return "Acoustic/Folk"
  if (instrumentalness > 0.7) return "Instrumental"
  if (energy > 0.8 && tempo > 140) return "Rock/Metal"
  if (tempo > 120 && danceability > 0.6) return "Pop"
  if (tempo < 80 && energy < 0.4) return "Ambient/Chill"
  return "Alternative"
}