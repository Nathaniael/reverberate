import { motion } from 'framer-motion'
import Image from 'next/image'
import { getImageUrl } from '@/lib/spotify'
import { formatNumber } from '@/lib/utils'
import { Music, Crown, Users, TrendingUp, Sparkles, Star } from 'lucide-react'
import { SlideLayout } from '../shared/slide-layout'
import { SlideHeader } from '../shared/slide-header'
import { type SlideProps, type FloatingElement, type BackgroundOrb } from '../types'

const floatingElements: FloatingElement[] = [
  { icon: Music, delay: 0, x: 10, y: 15, size: 24, color: "text-violet-400/20" },
  { icon: Star, delay: 0.8, x: 90, y: 20, size: 20, color: "text-purple-400/20" },
  { icon: Crown, delay: 1.6, x: 15, y: 80, size: 28, color: "text-fuchsia-400/20" },
  { icon: Sparkles, delay: 2.4, x: 85, y: 75, size: 22, color: "text-pink-400/20" },
  { icon: TrendingUp, delay: 1.2, x: 5, y: 50, size: 26, color: "text-indigo-400/20" },
]

const backgroundOrbs: BackgroundOrb[] = [
  {
    className: "absolute top-1/4 left-1/6 w-80 h-80 bg-violet-500/15 rounded-full blur-3xl",
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3],
      x: [0, 20, 0],
      y: [0, -10, 0],
    },
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  {
    className: "absolute bottom-1/4 right-1/6 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl",
    animate: {
      scale: [1.3, 1, 1.3],
      opacity: [0.4, 0.6, 0.4],
      x: [0, -25, 0],
      y: [0, 15, 0],
    },
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 1
    }
  },
  {
    className: "absolute top-1/2 left-1/2 w-64 h-64 bg-fuchsia-500/15 rounded-full blur-3xl",
    animate: {
      scale: [1, 1.4, 1],
      opacity: [0.2, 0.4, 0.2],
      x: [0, 15, 0],
      y: [0, -20, 0],
    },
    transition: {
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 2
    }
  }
]

export function TopArtistsSlide({ data }: SlideProps) {
  const topArtist = data.topArtists[0]
  const remainingArtists = data.topArtists.slice(1)

  return (
    <SlideLayout
      gradientClasses="bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900"
      floatingElements={floatingElements}
      backgroundOrbs={backgroundOrbs}
    >
      <SlideHeader
        badge={{
          icon: Crown,
          text: "Your Musical Royalty",
          iconColor: "text-fuchsia-400"
        }}
        title="Your Top Artists"
        subtitle="The voices that shaped your year"
        titleGradient="bg-gradient-to-r from-violet-200 to-fuchsia-200"
      />

      <div className="flex-1 overflow-y-auto px-8 pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Featured Top Artist */}
          {topArtist && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mb-8"
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 relative overflow-hidden"
              >
                {/* Spotlight effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />

                <div className="relative flex flex-col md:flex-row items-center gap-6">
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 100 }}
                      className="relative w-24 h-24 md:w-32 md:h-32"
                    >
                      <Image
                        src={getImageUrl(topArtist.images, 'large')}
                        alt={topArtist.name}
                        fill
                        className="rounded-full border-4 border-fuchsia-400/50"
                      />
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-2 border-2 border-dashed border-fuchsia-400/30 rounded-full"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.2, type: "spring" }}
                      className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2"
                    >
                      <Crown size={16} className="text-white" />
                    </motion.div>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text text-lg font-bold">
                        #1 ARTIST
                      </span>
                      <motion.div
                        animate={{ rotate: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Sparkles size={20} className="text-yellow-400" />
                      </motion.div>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
                      {topArtist.name}
                    </h2>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                      <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
                        <Users size={14} className="text-purple-400" />
                        <span className="text-gray-300">{formatNumber(topArtist.followers.total)} followers</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
                        <TrendingUp size={14} className="text-green-400" />
                        <span className="text-gray-300">{topArtist.popularity}% popularity</span>
                      </div>
                      {topArtist.genres && topArtist.genres.length > 0 && (
                        <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
                          <Music size={14} className="text-pink-400" />
                          <span className="text-gray-300">{topArtist.genres[0]}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Remaining Artists Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pb-8">
            {remainingArtists.map((artist, index) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 hover:border-fuchsia-400/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 relative">
                      <Image
                        src={getImageUrl(artist.images, 'medium')}
                        alt={artist.name}
                        fill
                        className="rounded-full"
                      />
                    </div>
                    <div className="absolute -top-1 -left-1 bg-fuchsia-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {index + 2}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white truncate text-lg">
                      {artist.name}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Users size={12} />
                        {formatNumber(artist.followers.total)}
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp size={12} />
                        {artist.popularity}%
                      </span>
                    </div>
                    {artist.genres && artist.genres.length > 0 && (
                      <div className="mt-2">
                        <span className="text-xs text-purple-300 bg-purple-500/20 px-2 py-1 rounded-full">
                          {artist.genres[0]}
                        </span>
                      </div>
                    )}
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