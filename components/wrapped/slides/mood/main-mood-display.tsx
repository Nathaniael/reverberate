import { motion } from 'framer-motion'
import { MoodAnalysis } from '@/lib/soundstat'

interface MainMoodDisplayProps {
  mood: MoodAnalysis['mood']
}

export function MainMoodDisplay({ mood }: MainMoodDisplayProps) {
  return (
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
  )
}