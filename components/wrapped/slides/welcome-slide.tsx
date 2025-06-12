import { motion } from 'framer-motion'
import { type SpotifyUser, type SpotifyTrack, type SpotifyArtist } from '@/lib/spotify'

interface WrappedData {
  user: SpotifyUser
  topTracks: SpotifyTrack[]
  topArtists: SpotifyArtist[]
}

interface WelcomeSlideProps {
  data: WrappedData
}

export function WelcomeSlide({ data }: WelcomeSlideProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center text-white"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Welcome to Your Wrapped
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          {data.user.display_name}
        </p>
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 max-w-md mx-auto">
          <p className="text-lg text-gray-300">
            Let&apos;s explore your musical journey through 2024
          </p>
        </div>
      </motion.div>
    </div>
  )
}