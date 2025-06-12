import { motion } from 'framer-motion'

interface MusicalContextProps {
  musicalContext: string
}

export function MusicalContext({ musicalContext }: MusicalContextProps) {
  return (
    <motion.div
      className="bg-white/5 backdrop-blur-lg rounded-xl p-4 md:p-6 max-w-2xl mx-auto mb-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.8 }}
    >
      <h3 className="text-lg md:text-xl font-semibold mb-3">Your Musical Context</h3>
      <p className="text-white/90 text-sm md:text-base">{musicalContext}</p>
    </motion.div>
  )
}