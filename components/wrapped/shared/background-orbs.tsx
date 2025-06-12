import { motion } from 'framer-motion'
import { type BackgroundOrb } from '../types'

interface BackgroundOrbsProps {
  orbs: BackgroundOrb[]
}

export function BackgroundOrbs({ orbs }: BackgroundOrbsProps) {
  return (
    <>
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className={orb.className}
          animate={orb.animate}
          transition={orb.transition}
        />
      ))}
    </>
  )
}