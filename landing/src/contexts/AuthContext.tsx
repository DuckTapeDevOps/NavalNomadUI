import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { signInWithRedirect, signOut as amplifySignOut, getCurrentUser, fetchUserAttributes, updateUserAttributes } from 'aws-amplify/auth'

interface CustomAttributes {
  'custom:naval_nomad_status'?: string
  'custom:instagram_handle'?: string
  'custom:youtube_channel'?: string
}

interface User {
  id: string
  email: string
  name: string
  navalNomadStatus?: string
  instagramHandle?: string
  youtubeChannel?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: () => void
  signOut: () => Promise<void>
  linkInstagram: (handle: string) => Promise<void>
  linkYouTube: (channel: string) => Promise<void>
  updateNavalNomadStatus: (status: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    try {
      const currentUser = await getCurrentUser()
      const attributes = await fetchUserAttributes()
      
      setUser({
        id: attributes.sub || '',
        email: attributes.email || '',
        name: attributes.name || '',
        navalNomadStatus: attributes['custom:naval_nomad_status'],
        instagramHandle: attributes['custom:instagram_handle'],
        youtubeChannel: attributes['custom:youtube_channel']
      })
    } catch (error) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  function signIn() {
    signInWithRedirect({ provider: 'Google' })
  }

  async function signOut() {
    try {
      await amplifySignOut()
      setUser(null)
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  async function linkInstagram(handle: string) {
    try {
      await updateUserAttributes({
        userAttributes: {
          'custom:instagram_handle': handle
        }
      })
      await checkUser()
    } catch (error) {
      console.error('Error linking Instagram:', error)
      throw error
    }
  }

  async function linkYouTube(channel: string) {
    try {
      await updateUserAttributes({
        userAttributes: {
          'custom:youtube_channel': channel
        }
      })
      await checkUser()
    } catch (error) {
      console.error('Error linking YouTube:', error)
      throw error
    }
  }

  async function updateNavalNomadStatus(status: string) {
    try {
      await updateUserAttributes({
        userAttributes: {
          'custom:naval_nomad_status': status
        }
      })
      await checkUser()
    } catch (error) {
      console.error('Error updating Naval Nomad status:', error)
      throw error
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signOut,
    linkInstagram,
    linkYouTube,
    updateNavalNomadStatus
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 