import { motion } from 'framer-motion'
import Image from 'next/image'
import { type SpotifyTrack, getImageUrl } from '@/lib/spotify'
import { formatDuration } from '@/lib/utils'
import { Music, Trophy, Clock, Play, Sparkles, Star, Disc, Headphones } from 'lucide-react'
import { SlideLayout } from '../shared/slide-layout'
import { SlideHeader } from '../shared/slide-header'
import { type SlideProps, type FloatingElement, type BackgroundOrb } from '../types'

const floatingElements: FloatingElement[] = [
  { icon: Music, delay: 0, x: 12, y: 18, size: 26, color: "text-emerald-400/20" },
  { icon: Star, delay: 0.7, x: 88, y: 25, size: 22, color: "text-teal-400/20" },
  { icon: Disc, delay: 1.4, x: 8, y: 75, size: 28, color: "text-cyan-400/20" },
  { icon: Sparkles, delay: 2.1, x: 90, y: 80, size: 24, color: "text-green-400/20" },
  { icon: Headphones, delay: 1.8, x: 15, y: 45, size: 25, color: "text-blue-400/20" },
  { icon: Play, delay: 2.8, x: 85, y: 50, size: 20, color: "text-indigo-400/20" },
]

const backgroundOrbs: BackgroundOrb[] = [
  {
    className: "absolute top-1/6 left-1/6 w-88 h-88 bg-emerald-500/12 rounded-full blur-3xl",
    animate: {
      scale: [1, 1.3, 1],
      opacity: [0.25, 0.45, 0.25],
      x: [0, 25, 0],
      y: [0, -15, 0],
    },
    transition: {
      duration: 9,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  {
    className: "absolute bottom-1/5 right-1/6 w-96 h-96 bg-teal-500/12 rounded-full blur-3xl",
    animate: {
      scale: [1.2, 1, 1.2],
      opacity: [0.35, 0.55, 0.35],
      x: [0, -30, 0],
      y: [0, 20, 0],
    },
    transition: {
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 1.5
    }
  },
  {
    className: "absolute top-1/2 left-1/2 w-72 h-72 bg-cyan-500/12 rounded-full blur-3xl",
    animate: {
      scale: [1, 1.4, 1],
      opacity: [0.2, 0.4, 0.2],
      x: [0, 18, 0],
      y: [0, -25, 0],
    },
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 3
    }
  }
]

export function TopTracksSlide({ data }: SlideProps) {
  const topTrack = data.topTracks[0]
  const remainingTracks = data.topTracks.slice(1)

  return (
    <SlideLayout
      gradientClasses="bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900"
      floatingElements={floatingElements}
      backgroundOrbs={backgroundOrbs}
    >
      <SlideHeader
        badge={{
          icon: Trophy,
          text: "Your Greatest Hits",
          iconColor: "text-emerald-400"
        }}
        title="Your Top Tracks"
        subtitle="The songs that defined your year"
        titleGradient="bg-gradient-to-r from-emerald-200 to-cyan-200"
      />

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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 hover:border-emerald-400/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 relative">
                      <Image
                        src={getImageUrl(track.album.images, 'medium')}
                        alt={track.album.name}
                        fill
                        className="rounded-lg"
                      />
                    </div>
                    <div className="absolute -top-1 -left-1 bg-emerald-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {index + 2}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white truncate text-lg">
                      {track.name}
                    </h3>
                    <p className="text-gray-300 truncate">
                      {track.artists.map(artist => artist.name).join(', ')}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {formatDuration(track.duration_ms)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star size={12} />
                        {track.popularity}%
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  )
}