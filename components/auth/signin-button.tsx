import { signInAction } from "@/lib/auth-actions"
import { Button } from "@/components/ui/button"

export function SignIn() {
  return (
    <form action={signInAction}>
      <Button variant="spotify" size="lg" type="submit" className="text-lg px-8">
        Connect with Spotify
      </Button>
    </form>
  )
}