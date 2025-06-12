import { signOutAction } from "@/lib/auth-actions"
import { Button } from "@/components/ui/button"

export function SignOut() {
  return (
    <form action={signOutAction}>
      <Button variant="outline" type="submit">
        Sign out
      </Button>
    </form>
  )
}