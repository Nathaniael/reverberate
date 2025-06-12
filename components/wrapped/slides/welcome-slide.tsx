import { motion } from 'framer-motion'
import { Music, Play, Heart, TrendingUp } from 'lucide-react'
import { SlideLayout } from '../shared/slide-layout'
import { type SlideProps, type FloatingElement, type BackgroundOrb } from '../types'

const floatingElements: FloatingElement[] = [
  { icon: Music, delay: 0, x: 20, y: 30 },
  { icon: Play, delay: 0.5, x: 80, y: 70 },
  { icon: Heart, delay: 1, x: 10, y: 80 },
  { icon: TrendingUp, delay: 1.5, x: 90, y: 20 },
]

const backgroundOrbs: BackgroundOrb[] = [
  {
    className: "absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl",
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.6, 0.3],
    },
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  {
    className: "absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl",
    animate: {
      scale: [1.2, 1, 1.2],
      opacity: [0.6, 0.3, 0.6],
    },
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 1
    }
  }
]

export function WelcomeSlide({ data }: SlideProps) {
  const currentYear = new Date().getFullYear()
  const stats = [
    { label: 'Top Tracks', value: data.topTracks.length, icon: Music },
    { label: 'Top Artists', value: data.topArtists.length, icon: TrendingUp },
  ]

  return (
    <SlideLayout
      gradientClasses="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900"
      floatingElements={floatingElements}
      backgroundOrbs={backgroundOrbs}
    >
      <div className="flex items-center justify-center p-8 flex-1 overflow-hidden">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center text-white max-w-4xl mx-auto"
        >
          {/* Year badge */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 mb-6 border border-white/20"
          >
            <Music size={16} />
            <span className="text-sm font-medium">{currentYear} Music Recap</span>
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
          >
            Your Musical
          </motion.h1>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent"
          >
            Journey
          </motion.h1>

          {/* User greeting */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mb-8"
          >
            <p className="text-xl md:text-2xl text-gray-300 mb-2">
              Hello,
            </p>
            <p className="text-2xl md:text-3xl font-semibold text-white">
              {data.user.display_name}
            </p>
          </motion.div>

          {/* Stats preview */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.3 + index * 0.2, duration: 0.6 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 min-w-[140px]"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <stat.icon size={20} className="text-purple-300" />
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                </div>
                <p className="text-sm text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to action */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.7, duration: 0.8 }}
            className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-lg rounded-xl p-6 max-w-md mx-auto border border-white/20"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Play size={20} className="text-purple-300" />
              <p className="text-lg font-medium text-white">
                Ready to explore?
              </p>
            </div>
            <p className="text-gray-300">
              Let&apos;s dive into your {currentYear} musical journey and discover the songs and artists that defined your year
            </p>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="mt-12"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white/60 text-sm"
            >
              Use bottom arrows to navigate
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </SlideLayout>
  )
}