import { motion } from 'framer-motion'
import Image from 'next/image'
import { type SpotifyUser, type SpotifyTrack, type SpotifyArtist, getImageUrl } from '@/lib/spotify'
import { formatNumber } from '@/lib/utils'

interface WrappedData {
  user: SpotifyUser
  topTracks: SpotifyTrack[]
  topArtists: SpotifyArtist[]
}

interface TopArtistsSlideProps {
  data: WrappedData
}

export function TopArtistsSlide({ data }: TopArtistsSlideProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900 p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Your Top Artists
          </h1>
          <p className="text-xl text-gray-300">
            The voices that shaped your year
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.topArtists.slice(0, 6).map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-4 flex items-center space-x-4"
            >
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={getImageUrl(artist.images, 'medium')}
                  alt={artist.name}
                  fill
                  className="rounded-full"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-white truncate">
                  {artist.name}
                </h3>
                <p className="text-gray-300 text-sm truncate">
                  {formatNumber(artist.followers.total)} followers
                </p>
                <div className="flex items-center space-x-4 text-sm mt-1">
                  <span className="text-gray-400">{artist.popularity}% popularity</span>
                  <span className="bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full">
                    #{index + 1}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}