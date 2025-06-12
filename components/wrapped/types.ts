import { type SpotifyUser, type SpotifyTrack, type SpotifyArtist } from '@/lib/spotify'

export interface WrappedData {
  user: SpotifyUser
  topTracks: SpotifyTrack[]
  topArtists: SpotifyArtist[]
}

export interface SlideProps {
  data: WrappedData
}

export interface FloatingElement {
  icon: React.ElementType
  delay: number
  x: number
  y: number
  size?: number
  color?: string
}

export interface BackgroundOrb {
  className: string
  animate: {
    scale: number[]
    opacity: number[]
    x?: number[]
    y?: number[]
  }
  transition: {
    duration: number
    repeat: number
    ease: string
    delay?: number
  }
}