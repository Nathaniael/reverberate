'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createSpotifyAPI, type SpotifyTrack, type SpotifyArtist, type SpotifyUser } from '@/lib/spotify'
import { WelcomeSlide } from './slides/welcome-slide'
import { TopTracksSlide } from './slides/top-tracks-slide'
import { TopArtistsSlide } from './slides/top-artists-slide'
import { SummarySlide } from './slides/summary-slide'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Home, ArrowLeft } from 'lucide-react'
import { EnhancedMoodSlide } from './slides/enhanced-mood-slide'

interface WrappedData {
  user: SpotifyUser
  topTracks: SpotifyTrack[]
  topArtists: SpotifyArtist[]
}

interface WrappedContentProps {
  accessToken: string
}

export function WrappedContent({ accessToken }: WrappedContentProps) {
  const [data, setData] = useState<WrappedData | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const slides = [
    { id: 'welcome', component: WelcomeSlide },
    { id: 'top-tracks', component: TopTracksSlide },
    { id: 'top-artists', component: TopArtistsSlide },
    { id: 'mood', component: EnhancedMoodSlide },
    { id: 'summary', component: SummarySlide },
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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium">Loading your musical journey...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-white">
          <p className="text-xl font-medium mb-4">Oops! Something went wrong</p>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    )
  }

  if (!data) return null

  const CurrentSlideComponent = slides[currentSlide].component

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Home Navigation - Fixed at top */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:transform group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
          </button>

          <div className="flex items-center gap-4">
            {/* Slide indicator */}
            <div className="hidden md:flex items-center gap-2 text-white/80 text-sm">
              <span>{currentSlide + 1}</span>
              <span>/</span>
              <span>{slides.length}</span>
            </div>

            <button
              onClick={() => window.location.href = '/'}
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors group"
            >
              <Home size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium hidden md:block">Home</span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="h-screen"
        >
          <CurrentSlideComponent data={data} />
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="text-white hover:bg-white/20"
          disabled={currentSlide === 0}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="text-white hover:bg-white/20"
          disabled={currentSlide === slides.length - 1}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}