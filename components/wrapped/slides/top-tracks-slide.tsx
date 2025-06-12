import { motion } from 'framer-motion'
import Image from 'next/image'
import { type SpotifyUser, type SpotifyTrack, type SpotifyArtist, getImageUrl } from '@/lib/spotify'
import { formatDuration } from '@/lib/utils'

interface WrappedData {
  user: SpotifyUser
  topTracks: SpotifyTrack[]
  topArtists: SpotifyArtist[]
}

interface TopTracksSlideProps {
  data: WrappedData
}

export function TopTracksSlide({ data }: TopTracksSlideProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Your Top Tracks
          </h1>
          <p className="text-xl text-gray-300">
            The songs that defined your year
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.topTracks.slice(0, 6).map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-4 flex items-center space-x-4"
            >
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={getImageUrl(track.album.images, 'medium')}
                  alt={track.album.name}
                  fill
                  className="rounded-lg"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-white truncate">
                  {track.name}
                </h3>
                <p className="text-gray-300 text-sm truncate">
                  {track.artists.map(artist => artist.name).join(', ')}
                </p>
                <div className="flex items-center space-x-4 text-sm mt-1">
                  <span className="text-gray-400">{formatDuration(track.duration_ms)}</span>
                  <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
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