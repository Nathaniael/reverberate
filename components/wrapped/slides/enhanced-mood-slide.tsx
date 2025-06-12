'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MoodAnalysis } from '@/lib/soundstat'
import { type SpotifyUser, type SpotifyTrack, type SpotifyArtist } from '@/lib/spotify'
import { Sparkles, Music, Heart, Zap, Brain, Waves } from 'lucide-react'

interface WrappedData {
  user: SpotifyUser
  topTracks: SpotifyTrack[]
  topArtists: SpotifyArtist[]
}

interface EnhancedMoodSlideProps {
  data: WrappedData
}

export function EnhancedMoodSlide({ data }: EnhancedMoodSlideProps) {
  const [moodAnalysis, setMoodAnalysis] = useState<MoodAnalysis | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentInsight, setCurrentInsight] = useState(0)

  const SpectrumBar = ({ label, value, icon: Icon, color }: {
    label: string
    value: number
    icon: React.ElementType
    color: string
  }) => (
    <motion.div
      key={`spectrum-${label}`} // Unique key to prevent re-animation
      className="bg-white/5 backdrop-blur-lg rounded-xl p-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon size={20} className={color} />
          <span className="font-medium text-sm">{label}</span>
        </div>
        <span className="text-xl font-bold">{Math.round(value)}%</span>
      </div>
      <div className="relative">
        <div className="w-full bg-white/10 rounded-full h-2">
          <motion.div
            key={`spectrum-bar-${label}`} // Unique key for the bar animation
            className={`h-2 rounded-full bg-gradient-to-r ${color}`}
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  )

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

  // Cycle through insights
  useEffect(() => {
    if (moodAnalysis?.insights && moodAnalysis.insights.length > 1) {
      const interval = setInterval(() => {
        setCurrentInsight((prev) => (prev + 1) % moodAnalysis.insights.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [moodAnalysis?.insights])

    if (loading) {
    return (
      <div className="h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 md:p-8">
        <div className="text-center text-white">
          <motion.div
            className="flex justify-center mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles size={48} className="md:w-16 md:h-16 text-yellow-400" />
          </motion.div>
          <h1 className="text-2xl md:text-4xl font-bold mb-2">Analyzing Your Musical Soul...</h1>
          <p className="text-lg md:text-xl text-gray-300">Discovering the emotions in your music</p>
        </div>
      </div>
    )
  }

    if (error || !moodAnalysis) {
    return (
      <div className="h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center p-4 md:p-8">
        <div className="text-center text-white">
          <Music size={48} className="md:w-16 md:h-16 mx-auto mb-4 text-gray-400" />
          <h1 className="text-2xl md:text-4xl font-bold mb-4">Musical Mood Analysis</h1>
          <p className="text-lg md:text-xl text-gray-300 mb-6">
            {error || 'Unable to analyze your musical mood right now'}
          </p>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 md:p-6 max-w-md mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Try Again Later</h2>
            <p className="text-gray-300 text-sm md:text-base">
              We&apos;re working on enhancing your music analysis experience!
            </p>
          </div>
        </div>
      </div>
    )
  }

    const { mood, emotionalSpectrum, musicalProfile, insights } = moodAnalysis

    return (
    <div className={`h-screen bg-gradient-to-br ${mood.colorScheme.gradient} overflow-y-auto overflow-x-hidden`} style={{ scrollBehavior: 'smooth' }}>
      <div className="max-w-6xl mx-auto text-center text-white px-4 py-8 md:py-16">
        {/* Main Mood Display */}
        <motion.div
          className="mb-6 md:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {mood.primary}
          </motion.h1>

          {mood.secondary && (
            <motion.div
              className="text-xl md:text-2xl lg:text-3xl font-semibold text-white/90 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              with touches of {mood.secondary}
            </motion.div>
          )}

          <motion.div
            className="text-lg md:text-xl text-white/80 mb-3 md:mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Intensity: <span className="font-bold">{mood.intensity}</span>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {mood.description}
          </motion.p>
        </motion.div>

        {/* Emotional Spectrum */}
        <motion.div
          key="emotional-spectrum-section" // Unique key to prevent re-animation
          className="mb-6 md:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Your Emotional Spectrum</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <SpectrumBar
              label="Positivity"
              value={emotionalSpectrum.positivity}
              icon={Heart}
              color="text-pink-400 from-pink-500 to-rose-500"
            />
            <SpectrumBar
              label="Energy"
              value={emotionalSpectrum.energy}
              icon={Zap}
              color="text-yellow-400 from-yellow-500 to-orange-500"
            />
            <SpectrumBar
              label="Danceability"
              value={emotionalSpectrum.danceability}
              icon={Music}
              color="text-purple-400 from-purple-500 to-indigo-500"
            />
            <SpectrumBar
              label="Introspection"
              value={emotionalSpectrum.introspection}
              icon={Brain}
              color="text-blue-400 from-blue-500 to-cyan-500"
            />
          </div>
        </motion.div>

        {/* Musical Profile */}
        <motion.div
          key="musical-profile-section" // Unique key to prevent re-animation
          className="mb-6 md:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Your Musical Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Sound Characteristics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Tempo</span>
                  <span className="font-bold">{Math.round(musicalProfile.tempo)} BPM</span>
                </div>
                <div className="flex justify-between">
                  <span>Complexity</span>
                  <span className="font-bold">{Math.round(musicalProfile.complexity)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Organicness</span>
                  <span className="font-bold">{Math.round(musicalProfile.organicness)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Dynamism</span>
                  <span className="font-bold">{Math.round(musicalProfile.dynamism)}%</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Mood Characteristics</h3>
              <div className="space-y-2">
                {mood.characteristics.map((characteristic, index) => (
                  <motion.div
                    key={characteristic}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                  >
                    <Sparkles size={16} className="text-yellow-400" />
                    <span>{characteristic}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Insights */}
        {insights.length > 0 && (
          <motion.div
            className="mb-6 md:mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Musical Insights</h2>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 max-w-2xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentInsight}
                  className="text-lg text-white/90"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {insights[currentInsight]}
                </motion.p>
              </AnimatePresence>
              {insights.length > 1 && (
                <div className="flex justify-center mt-4 gap-2">
                  {insights.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentInsight ? 'bg-white' : 'bg-white/30'
                      }`}
                      onClick={() => setCurrentInsight(index)}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Recommended Activities */}
        <motion.div
          className="mb-6 md:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Perfect Activities for Your Mood</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {mood.recommendedActivities.map((activity, index) => (
              <motion.div
                key={activity}
                className="bg-white/10 backdrop-blur-lg rounded-lg p-4 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
              >
                <Waves size={24} className="mx-auto mb-2 text-white/80" />
                <span className="text-sm font-medium">{activity}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Musical Context */}
        <motion.div
          className="bg-white/5 backdrop-blur-lg rounded-xl p-4 md:p-6 max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <h3 className="text-lg md:text-xl font-semibold mb-3">Your Musical Context</h3>
          <p className="text-white/90 text-sm md:text-base">{mood.musicalContext}</p>
        </motion.div>
      </div>
    </div>
  )
}