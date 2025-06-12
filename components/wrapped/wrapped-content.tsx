'use client'

import { useEffect, useState } from 'react'
import { createSpotifyAPI } from '@/lib/spotify'
import { WelcomeSlide } from './slides/welcome-slide'
import { TopTracksSlide } from './slides/top-tracks-slide'
import { TopArtistsSlide } from './slides/top-artists-slide'
import { MoodSlide } from './slides/mood-slide'
import { SlideController } from './slide-controller'
import { LoadingScreen } from './ui/loading-screen'
import { ErrorScreen } from './ui/error-screen'
import { type WrappedData } from './types'

interface WrappedContentProps {
  accessToken: string
}

export function WrappedContent({ accessToken }: WrappedContentProps) {
  const [data, setData] = useState<WrappedData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const slides = [
    { id: 'welcome', component: WelcomeSlide },
    { id: 'top-tracks', component: TopTracksSlide },
    { id: 'top-artists', component: TopArtistsSlide },
    { id: 'mood', component: MoodSlide },
  ]

  useEffect(() => {
    async function fetchData() {
      try {
        const api = createSpotifyAPI(accessToken)

        const user = await api.getCurrentUser().catch(err => {
          console.error('Error fetching user:', err)
          throw err
        })
        const topTracks = await api.getTopTracks('medium_term').catch(err => {
          console.error('Error fetching top tracks:', err)
          return { items: [] }
        })
        const topArtists = await api.getTopArtists('medium_term', 20).catch(err => {
          console.error('Error fetching top artists:', err)
          return { items: [] }
        })

        setData({
          user,
          topTracks: topTracks.items,
          topArtists: topArtists.items,
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [accessToken])

  if (loading) {
    return <LoadingScreen />
  }

  if (error) {
    return <ErrorScreen message={error} />
  }

  if (!data) return null

  return <SlideController slides={slides} data={data} />
}