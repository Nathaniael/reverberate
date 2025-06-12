'use client'

import { ArrowLeft, Home } from 'lucide-react'

interface TopNavigationProps {
  currentSlide: number
  totalSlides: number
}

export function TopNavigation({ currentSlide, totalSlides }: TopNavigationProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => window.location.href = '/'}
          className="flex items-center gap-2 text-white/90 hover:text-white transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:transform group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Home</span>
        </button>

        <div className="flex items-center gap-4">
          {/* Slide indicator */}
          <div className="hidden md:flex items-center gap-2 text-white/80 text-sm">
            <span>{currentSlide + 1}</span>
            <span>/</span>
            <span>{totalSlides}</span>
          </div>

          <button
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors group"
          >
            <Home size={20} className="group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium hidden md:block">Home</span>
          </button>
        </div>
      </div>
    </div>
  )
}