import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export function MoodLoadingScreen() {
  return (
    <div className="h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 md:p-8">
      <div className="text-center text-white">
        <motion.div
          className="flex justify-center mb-6"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles size={48} className="md:w-16 md:h-16 text-yellow-400" />
        </motion.div>
        <h1 className="text-2xl md:text-4xl font-bold mb-2">Analyzing Your Musical Soul...</h1>
        <p className="text-lg md:text-xl text-gray-300">Discovering the emotions in your music</p>
      </div>
    </div>
  )
}