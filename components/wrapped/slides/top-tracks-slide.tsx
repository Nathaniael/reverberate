import { motion } from 'framer-motion'
import Image from 'next/image'
import { type SpotifyUser, type SpotifyTrack, type SpotifyArtist, getImageUrl } from '@/lib/spotify'
import { formatDuration } from '@/lib/utils'
import { Music, Trophy, Clock, Play, Sparkles, Star, Disc, Headphones } from 'lucide-react'

interface WrappedData {
  user: SpotifyUser
  topTracks: SpotifyTrack[]
  topArtists: SpotifyArtist[]
}

interface TopTracksSlideProps {
  data: WrappedData
}

// Floating musical elements
const FloatingElements = () => {
  const elements = [
    { icon: Music, delay: 0, x: 12, y: 18, size: 26, color: "text-emerald-400/20" },
    { icon: Star, delay: 0.7, x: 88, y: 25, size: 22, color: "text-teal-400/20" },
    { icon: Disc, delay: 1.4, x: 8, y: 75, size: 28, color: "text-cyan-400/20" },
    { icon: Sparkles, delay: 2.1, x: 90, y: 80, size: 24, color: "text-green-400/20" },
    { icon: Headphones, delay: 1.8, x: 15, y: 45, size: 25, color: "text-blue-400/20" },
    { icon: Play, delay: 2.8, x: 85, y: 50, size: 20, color: "text-indigo-400/20" },
  ]

  return (
    <>
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.color}`}
          style={{ left: `${element.x}%`, top: `${element.y}%` }}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
            y: [-12, 12, -12],
            x: [-6, 6, -6],
          }}
          transition={{
            delay: element.delay,
            duration: 0.9,
            y: {
              duration: 3.5 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            },
            x: {
              duration: 5 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <element.icon size={element.size} />
        </motion.div>
      ))}
    </>
  )
}

// Animated background orbs
const BackgroundOrbs = () => (
  <>
    <motion.div
      className="absolute top-1/6 left-1/6 w-88 h-88 bg-emerald-500/12 rounded-full blur-3xl"
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.25, 0.45, 0.25],
        x: [0, 25, 0],
        y: [0, -15, 0],
      }}
      transition={{
        duration: 9,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <motion.div
      className="absolute bottom-1/5 right-1/6 w-96 h-96 bg-teal-500/12 rounded-full blur-3xl"
      animate={{
        scale: [1.2, 1, 1.2],
        opacity: [0.35, 0.55, 0.35],
        x: [0, -30, 0],
        y: [0, 20, 0],
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.5
      }}
    />
    <motion.div
      className="absolute top-1/2 left-1/2 w-72 h-72 bg-cyan-500/12 rounded-full blur-3xl"
      animate={{
        scale: [1, 1.4, 1],
        opacity: [0.2, 0.4, 0.2],
        x: [0, 18, 0],
        y: [0, -25, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 3
      }}
    />
  </>
)

export function TopTracksSlide({ data }: TopTracksSlideProps) {
  const topTrack = data.topTracks[0]
  const remainingTracks = data.topTracks.slice(1)

  return (
    <div className="relative h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <FloatingElements />
        <BackgroundOrbs />
      </div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center p-8 pt-20 flex-shrink-0"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 mb-4 border border-white/20"
          >
            <Trophy size={16} className="text-emerald-400" />
            <span className="text-sm font-medium text-white">Your Greatest Hits</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-cyan-200 mb-4"
          >
            Your Top Tracks
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-300"
          >
            The songs that defined your year
          </motion.p>
        </motion.div>

        <div className="flex-1 overflow-y-auto px-8 pb-32">
          <div className="max-w-7xl mx-auto">
            {/* Featured Top Track */}
            {topTrack && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="mb-8"
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 relative overflow-hidden"
                >
                  {/* Spotlight effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />

                  <div className="relative flex flex-col md:flex-row items-center gap-6">
                    <div className="relative">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 3 }}
                        transition={{ type: "spring", stiffness: 100 }}
                        className="relative w-24 h-24 md:w-32 md:h-32"
                      >
                        <Image
                          src={getImageUrl(topTrack.album.images, 'large')}
                          alt={topTrack.album.name}
                          fill
                          className="rounded-lg border-4 border-emerald-400/50 shadow-lg"
                        />
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                          className="absolute -inset-2 border-2 border-dashed border-emerald-400/30 rounded-lg"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.2, type: "spring" }}
                        className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2"
                      >
                        <Trophy size={16} className="text-white" />
                      </motion.div>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text text-lg font-bold">
                          #1 TRACK
                        </span>
                        <motion.div
                          animate={{ rotate: [0, 15, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Sparkles size={20} className="text-yellow-400" />
                        </motion.div>
                      </div>
                      <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
                        {topTrack.name}
                      </h2>
                      <p className="text-xl text-emerald-200 mb-3">
                        {topTrack.artists.map(artist => artist.name).join(', ')}
                      </p>
                      <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                        <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
                          <Clock size={14} className="text-blue-400" />
                          <span className="text-gray-300">{formatDuration(topTrack.duration_ms)}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
                          <Disc size={14} className="text-green-400" />
                          <span className="text-gray-300">{topTrack.album.name}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
                          <Star size={14} className="text-yellow-400" />
                          <span className="text-gray-300">{topTrack.popularity}% popularity</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Remaining Tracks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pb-8">
              {remainingTracks.map((track: SpotifyTrack, index: number) => (
                <motion.div
                  key={track.id}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                  whileHover={{
                    scale: 1.03,
                    y: -5,
                    transition: { type: "spring", stiffness: 100 }
                  }}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-4 flex items-center space-x-4 border border-white/20 hover:border-white/40 transition-all duration-300 group relative overflow-hidden"
                >
                  {/* Hover gradient effect */}
                  <motion.div
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  />

                  <div className="relative w-16 h-16 flex-shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 2 }}
                      transition={{ type: "spring", stiffness: 100 }}
                    >
                      <Image
                        src={getImageUrl(track.album.images, 'medium')}
                        alt={track.album.name}
                        fill
                        className="rounded-lg group-hover:shadow-lg transition-shadow duration-300"
                      />
                    </motion.div>
                    {/* Play button overlay on hover */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center"
                    >
                      <Play size={20} className="text-white fill-white" />
                    </motion.div>
                  </div>

                  <div className="flex-1 min-w-0 relative">
                    <h3 className="text-lg font-semibold text-white truncate group-hover:text-emerald-200 transition-colors">
                      {track.name}
                    </h3>
                    <p className="text-gray-300 text-sm truncate">
                      {track.artists.map(artist => artist.name).join(', ')}
                    </p>
                    <div className="flex items-center space-x-4 text-sm mt-2">
                      <span className="text-gray-400">{formatDuration(track.duration_ms)}</span>
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        className="bg-gradient-to-r from-emerald-500/30 to-cyan-500/30 text-emerald-300 px-3 py-1 rounded-full border border-emerald-400/30"
                      >
                        #{index + 2}
                      </motion.span>
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