import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"
import Spotify from "next-auth/providers/spotify"

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

async function refreshAccessToken(token: JWT) {
  try {
    const url = "https://accounts.spotify.com/api/token"

        const refreshToken = token.refreshToken as string
    if (!refreshToken) {
      throw new Error("No refresh token available")
    }

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${process.env.AUTH_SPOTIFY_ID}:${process.env.AUTH_SPOTIFY_SECRET}`
        ).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      method: "POST",
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      expiresAt: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    }
  } catch (error) {
    console.error("Error refreshing access token:", error)
    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Spotify(
      {
        authorization: 'https://accounts.spotify.com/authorize?scope=user-read-email,user-read-private,user-top-read,user-read-recently-played,user-read-playback-state,user-library-read,playlist-read-private'
      }
    )
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Initial sign in
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.expiresAt = account.expires_at! * 1000 // Convert to milliseconds
        return token
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.expiresAt as number)) {
        return token
      }

      // Access token has expired, try to refresh it
      return refreshAccessToken(token)
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string

      // Send error to the client if token refresh failed
      if (token.error) {
        console.error("Session error:", token.error)
        // You might want to redirect to sign in or handle this differently
      }

      return session
    }
  },
  trustHost: true,
  debug: process.env.NODE_ENV === "development"
})