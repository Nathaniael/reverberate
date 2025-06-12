import { motion } from 'framer-motion'
import { type LucideIcon } from 'lucide-react'

interface SlideHeaderProps {
  badge: {
    icon: LucideIcon
    text: string
    iconColor: string
  }
  title: string
  subtitle: string
  titleGradient: string
}

export function SlideHeader({ badge, title, subtitle, titleGradient }: SlideHeaderProps) {
  return (
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
        <badge.icon size={16} className={badge.iconColor} />
        <span className="text-sm font-medium text-white">{badge.text}</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className={`text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text ${titleGradient} mb-4`}
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="text-lg md:text-xl text-gray-300"
      >
        {subtitle}
      </motion.p>
    </motion.div>
  )
}