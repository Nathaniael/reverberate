import { motion } from 'framer-motion'
import { type FloatingElement } from '../types'

interface FloatingElementsProps {
  elements: FloatingElement[]
}

export function FloatingElements({ elements }: FloatingElementsProps) {
  return (
    <>
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.color || 'text-white/20'}`}
          style={{ left: `${element.x}%`, top: `${element.y}%` }}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
            y: [-10, 10, -10],
            x: [-5, 5, -5],
          }}
          transition={{
            delay: element.delay,
            duration: 0.8,
            y: {
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            },
            x: {
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <element.icon size={element.size || 24} />
        </motion.div>
      ))}
    </>
  )
}