import { memo } from 'react'
import { motion } from 'framer-motion'

interface SpectrumBarProps {
  label: string
  value: number
  icon: React.ElementType
  color: string
}

export const SpectrumBar = memo(function SpectrumBar({ label, value, icon: Icon, color }: SpectrumBarProps) {
  return (
    <motion.div
      key={`spectrum-${label}`}
      className="bg-white/5 backdrop-blur-lg rounded-xl p-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon size={20} className={color} />
          <span className="font-medium text-sm">{label}</span>
        </div>
        <span className="text-xl font-bold">{Math.round(value)}%</span>
      </div>
      <div className="relative">
        <div className="w-full bg-white/10 rounded-full h-2">
          <motion.div
            key={`spectrum-bar-${label}`}
            className={`h-2 rounded-full bg-gradient-to-r ${color}`}
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  )
})