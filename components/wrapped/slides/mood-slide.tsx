export function MoodSlide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-cyan-900 to-blue-900 flex items-center justify-center p-8">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Your Musical Mood</h1>
        <p className="text-xl text-gray-300 mb-6">
          Audio features are no longer available due to Spotify API changes
        </p>
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Alternative Insights</h2>
          <p className="text-gray-300">
            We can still analyze your top tracks and artists to create your music profile!
          </p>
        </div>
      </div>
    </div>
  )
}