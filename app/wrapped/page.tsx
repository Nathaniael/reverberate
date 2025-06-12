import { Suspense } from "react"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { WrappedContent } from "@/components/wrapped/wrapped-content"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default async function WrappedPage() {
  const session = await auth()

  if (!session) {
    redirect('/?error=no-session')
  }

  if (!session.accessToken) {
    redirect('/?error=no-access-token')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Suspense fallback={<LoadingSpinner />}>
        <WrappedContent accessToken={session.accessToken} />
      </Suspense>
    </div>
  )
}