import { motion } from 'framer-motion'
import { type SpotifyUser, type SpotifyTrack, type SpotifyArtist } from '@/lib/spotify'

interface WrappedData {
  user: SpotifyUser
  topTracks: SpotifyTrack[]
  topArtists: SpotifyArtist[]
}

interface SummarySlideProps {
  data: WrappedData
}

export function SummarySlide({ data }: SummarySlideProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900 flex items-center justify-center p-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center text-white"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Your 2024 Summary
        </h1>
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 max-w-md mx-auto">
          <p className="text-lg text-gray-300 mb-4">
            You discovered {data.topTracks.length} amazing tracks
          </p>
          <p className="text-lg text-gray-300 mb-4">
            And connected with {data.topArtists.length} incredible artists
          </p>
          <p className="text-lg text-gray-300">
            Keep exploring and creating your unique musical story!
          </p>
        </div>
      </motion.div>
    </div>
  )
}