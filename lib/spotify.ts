export interface SpotifyTrack {
  id: string
  name: string
  artists: { name: string; id: string }[]
  album: {
    name: string
    images: { url: string; height: number; width: number }[]
  }
  duration_ms: number
  popularity: number
  preview_url: string | null
}

export interface SpotifyArtist {
  id: string
  name: string
  images: { url: string; height: number; width: number }[]
  genres: string[]
  popularity: number
  followers: { total: number }
}

export interface SpotifyUser {
  id: string
  display_name: string
  email: string
  images: { url: string; height: number; width: number }[]
  followers: { total: number }
  country: string
}

export interface PlayHistory {
  track: SpotifyTrack
  played_at: string
}

class SpotifyAPI {
  private accessToken: string

  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  private async fetch(endpoint: string) {
    console.log(`Making Spotify API request to: ${endpoint}`)
    console.log(`Access token length: ${this.accessToken?.length || 0}`)
    console.log(`Access token preview: ${this.accessToken?.substring(0, 20)}...`)

    const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Spotify API error:`, {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        error: errorText
      })
      throw new Error(`Spotify API error: ${response.status} - ${errorText}`)
    }

    return response.json()
  }

  async getCurrentUser(): Promise<SpotifyUser> {
    return this.fetch('/me')
  }

  async getTopTracks(timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term', limit = 50): Promise<{ items: SpotifyTrack[] }> {
    return this.fetch(`/me/top/tracks?time_range=${timeRange}&limit=${limit}`)
  }

  async getTopArtists(timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term', limit = 50): Promise<{ items: SpotifyArtist[] }> {
    return this.fetch(`/me/top/artists?time_range=${timeRange}&limit=${limit}`)
  }

  async getRecentlyPlayed(limit = 50): Promise<{ items: PlayHistory[] }> {
    return this.fetch(`/me/player/recently-played?limit=${limit}`)
  }

  async getTrack(trackId: string): Promise<SpotifyTrack> {
    return this.fetch(`/tracks/${trackId}`)
  }

  async getArtist(artistId: string): Promise<SpotifyArtist> {
    return this.fetch(`/artists/${artistId}`)
  }
}

export function createSpotifyAPI(accessToken: string) {
  return new SpotifyAPI(accessToken)
}

export function getImageUrl(images: { url: string; height: number; width: number }[], size: 'small' | 'medium' | 'large' = 'medium'): string {
  if (!images || images.length === 0) return '/placeholder-album.jpg'

  const sortedImages = images.sort((a, b) => (b.height || 0) - (a.height || 0))

  switch (size) {
    case 'small':
      return sortedImages[sortedImages.length - 1]?.url || sortedImages[0]?.url || '/placeholder-album.jpg'
    case 'large':
      return sortedImages[0]?.url || '/placeholder-album.jpg'
    default:
      return sortedImages[Math.floor(sortedImages.length / 2)]?.url || sortedImages[0]?.url || '/placeholder-album.jpg'
  }
}