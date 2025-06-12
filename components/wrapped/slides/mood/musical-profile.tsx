import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { MoodAnalysis } from '@/lib/soundstat'

interface MusicalProfileProps {
  musicalProfile: MoodAnalysis['musicalProfile']
  moodCharacteristics: string[]
}

export function MusicalProfile({ musicalProfile, moodCharacteristics }: MusicalProfileProps) {
  return (
    <motion.div
      key="musical-profile-section"
      className="mb-6 md:mb-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Your Musical Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Sound Characteristics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Tempo</span>
              <span className="font-bold">{Math.round(musicalProfile.tempo)} BPM</span>
            </div>
            <div className="flex justify-between">
              <span>Complexity</span>
              <span className="font-bold">{Math.round(musicalProfile.complexity)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Organicness</span>
              <span className="font-bold">{Math.round(musicalProfile.organicness)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Dynamism</span>
              <span className="font-bold">{Math.round(musicalProfile.dynamism)}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Mood Characteristics</h3>
          <div className="space-y-2">
            {moodCharacteristics.map((characteristic, index) => (
              <motion.div
                key={characteristic}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
              >
                <Sparkles size={16} className="text-yellow-400" />
                <span>{characteristic}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}