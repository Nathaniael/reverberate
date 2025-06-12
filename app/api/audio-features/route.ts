import { NextResponse } from 'next/server'
import { createSoundStatAPI, calculateAverageFeatures, getAdvancedMoodFromFeatures } from '@/lib/soundstat'

export async function POST(request: Request) {
  try {
    const { trackIds } = await request.json()

    if (!Array.isArray(trackIds) || trackIds.length === 0) {
      return NextResponse.json(
        { error: 'Invalid track IDs provided' },
        { status: 400 }
      )
    }

    const soundStatApiKey = process.env.SOUNDSTAT_API_KEY
    if (!soundStatApiKey) {
      console.error('SoundStat API key not configured')
      return NextResponse.json(
        { error: 'SoundStat API key not configured' },
        { status: 500 }
      )
    }

    const api = createSoundStatAPI(soundStatApiKey)
    console.log('Starting server-side audio features analysis for tracks:', trackIds)

    const features = await api.getBulkAudioFeatures(trackIds)

        if (features.length > 0) {
      const averageFeatures = calculateAverageFeatures(features)
      const moodAnalysis = getAdvancedMoodFromFeatures(averageFeatures)
      console.log('Successfully calculated average audio features and mood analysis:', averageFeatures)

      return NextResponse.json({
        success: true,
        audioFeatures: averageFeatures,
        moodAnalysis: moodAnalysis
      })
    } else {
      return NextResponse.json({
        success: false,
        error: 'No audio features found for your tracks. This might be because the tracks are not available in the SoundStat database.'
      })
    }
  } catch (error) {
    console.error('Error in audio-features API route:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to analyze your music'

    return NextResponse.json({
      success: false,
      error: `Audio analysis unavailable: ${errorMessage}`
    }, { status: 500 })
  }
}