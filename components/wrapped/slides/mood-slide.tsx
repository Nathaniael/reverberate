'use client'

import { useEffect, useState } from 'react'
import { MoodAnalysis } from '@/lib/soundstat'
import { type SpotifyTrack } from '@/lib/spotify'
import { type SlideProps } from '../types'
import { MoodLoadingScreen } from './mood/mood-loading-screen'
import { MoodErrorScreen } from './mood/mood-error-screen'
import { MainMoodDisplay } from './mood/main-mood-display'
import { EmotionalSpectrum } from './mood/emotional-spectrum'
import { MusicalProfile } from './mood/musical-profile'
import { MoodInsights } from './mood/mood-insights'
import { RecommendedActivities } from './mood/recommended-activities'
import { MusicalContext } from './mood/musical-context'

export function MoodSlide({ data }: SlideProps) {
  const [moodAnalysis, setMoodAnalysis] = useState<MoodAnalysis | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMoodAnalysis() {
      try {
        const trackIds = data.topTracks.slice(0, 10).map((track: SpotifyTrack) => track.id)
        console.log('Starting enhanced mood analysis for tracks:', trackIds)

        const response = await fetch('/api/audio-features', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ trackIds }),
        })

        const result = await response.json()

        if (result.success && result.moodAnalysis) {
          setMoodAnalysis(result.moodAnalysis)
          console.log('Successfully received mood analysis:', result.moodAnalysis)
        } else {
          setError(result.error || 'No mood analysis available for your tracks.')
        }
      } catch (err) {
        console.error('Error fetching mood analysis:', err)
        const errorMessage = err instanceof Error ? err.message : 'Failed to analyze your musical mood'
        setError(`Mood analysis unavailable: ${errorMessage}`)
      } finally {
        setLoading(false)
      }
    }

    if (data.topTracks.length > 0) {
      fetchMoodAnalysis()
    } else {
      setLoading(false)
    }
  }, [data.topTracks])

  if (loading) {
    return <MoodLoadingScreen />
  }

  if (error || !moodAnalysis) {
    return <MoodErrorScreen error={error || 'Unable to analyze your musical mood right now'} />
  }

  const { mood, emotionalSpectrum, musicalProfile, insights } = moodAnalysis

  return (
    <div className={`h-screen bg-gradient-to-br ${mood.colorScheme.gradient} overflow-y-auto overflow-x-hidden`} style={{ scrollBehavior: 'smooth' }}>
      <div className="max-w-6xl mx-auto text-center text-white px-4 py-8 md:py-16">
        <MainMoodDisplay mood={mood} />

        <EmotionalSpectrum emotionalSpectrum={emotionalSpectrum} />

        <MusicalProfile
          musicalProfile={musicalProfile}
          moodCharacteristics={mood.characteristics}
        />

        <MoodInsights
          insights={insights}
        />

        <RecommendedActivities activities={mood.recommendedActivities} />

        <MusicalContext musicalContext={mood.musicalContext} />
      </div>
    </div>
  )
}