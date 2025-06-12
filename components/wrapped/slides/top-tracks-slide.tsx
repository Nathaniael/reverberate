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
    <div className="h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 overflow-hidden">
      <div className="h-full flex flex-col p-8 pt-20">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 flex-shrink-0"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            Your Top Tracks
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            The songs that defined your year
          </p>
        </motion.div>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pb-8">
              {data.topTracks.map((track: SpotifyTrack, index: number) => (
                <motion.div
                  key={track.id}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-3 md:p-4 flex items-center space-x-3 md:space-x-4"
                >
                  <div className="relative w-12 h-12 md:w-16 md:h-16 flex-shrink-0">
                    <Image
                      src={getImageUrl(track.album.images, 'medium')}
                      alt={track.album.name}
                      fill
                      className="rounded-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg font-semibold text-white truncate">
                      {track.name}
                    </h3>
                    <p className="text-gray-300 text-sm truncate">
                      {track.artists.map(artist => artist.name).join(', ')}
                    </p>
                    <div className="flex items-center space-x-2 md:space-x-4 text-xs md:text-sm mt-1">
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
      </div>
    </div>
  )
}