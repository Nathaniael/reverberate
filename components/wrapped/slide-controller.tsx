'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TopNavigation } from './navigation/top-navigation'
import { SlideNavigation } from './navigation/slide-navigation'
import { type SlideProps } from './types'

interface SlideConfig {
  id: string
  component: React.ComponentType<SlideProps>
}

interface SlideControllerProps {
  slides: SlideConfig[]
  data: SlideProps['data']
}

export function SlideController({ slides, data }: SlideControllerProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const CurrentSlideComponent = slides[currentSlide].component

  return (
    <div className="relative min-h-screen overflow-hidden">
      <TopNavigation
        currentSlide={currentSlide}
        totalSlides={slides.length}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="h-screen"
        >
          <CurrentSlideComponent data={data} />
        </motion.div>
      </AnimatePresence>

      <SlideNavigation
        currentSlide={currentSlide}
        totalSlides={slides.length}
        setCurrentSlide={setCurrentSlide}
      />
    </div>
  )
}