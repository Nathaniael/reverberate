'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface SlideNavigationProps {
  currentSlide: number
  totalSlides: number
  setCurrentSlide: (slide: number) => void
}

export function SlideNavigation({
  currentSlide,
  totalSlides,
  setCurrentSlide
}: SlideNavigationProps) {
  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + totalSlides) % totalSlides)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 z-50">
      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        className="text-white hover:bg-white/20"
        disabled={currentSlide === 0}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <div className="flex space-x-2">
        {Array.from({ length: totalSlides }, (_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white' : 'bg-white/40'
            }`}
          />
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="text-white hover:bg-white/20"
        disabled={currentSlide === totalSlides - 1}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  )
}