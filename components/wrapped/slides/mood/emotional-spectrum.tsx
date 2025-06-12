import { memo } from 'react'
import { motion } from 'framer-motion'
import { Heart, Zap, Music, Brain } from 'lucide-react'
import { MoodAnalysis } from '@/lib/soundstat'
import { SpectrumBar } from './spectrum-bar'

interface EmotionalSpectrumProps {
  emotionalSpectrum: MoodAnalysis['emotionalSpectrum']
}

export const EmotionalSpectrum = memo(function EmotionalSpectrum({ emotionalSpectrum }: EmotionalSpectrumProps) {
  return (
    <motion.div
      key="emotional-spectrum-section"
      className="mb-6 md:mb-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Your Emotional Spectrum</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <SpectrumBar
          label="Positivity"
          value={emotionalSpectrum.positivity}
          icon={Heart}
          color="text-pink-400 from-pink-500 to-rose-500"
        />
        <SpectrumBar
          label="Energy"
          value={emotionalSpectrum.energy}
          icon={Zap}
          color="text-yellow-400 from-yellow-500 to-orange-500"
        />
        <SpectrumBar
          label="Danceability"
          value={emotionalSpectrum.danceability}
          icon={Music}
          color="text-purple-400 from-purple-500 to-indigo-500"
        />
        <SpectrumBar
          label="Introspection"
          value={emotionalSpectrum.introspection}
          icon={Brain}
          color="text-blue-400 from-blue-500 to-cyan-500"
        />
      </div>
    </motion.div>
  )
})