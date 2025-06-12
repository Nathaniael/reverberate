import { type ReactNode } from 'react'
import { FloatingElements } from './floating-elements'
import { BackgroundOrbs } from './background-orbs'
import { type FloatingElement, type BackgroundOrb } from '../types'

interface SlideLayoutProps {
  gradientClasses: string
  floatingElements: FloatingElement[]
  backgroundOrbs: BackgroundOrb[]
  children: ReactNode
}

export function SlideLayout({
  gradientClasses,
  floatingElements,
  backgroundOrbs,
  children
}: SlideLayoutProps) {
  return (
    <div className={`relative h-screen ${gradientClasses} overflow-hidden`}>
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <FloatingElements elements={floatingElements} />
        <BackgroundOrbs orbs={backgroundOrbs} />
      </div>

      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  )
}