export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-pulse"></div>
        </div>
      </div>
      <p className="ml-4 text-white text-lg font-medium">Loading your musical journey...</p>
    </div>
  )
}