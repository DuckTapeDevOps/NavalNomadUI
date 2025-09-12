import React, { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { signInWithRedirect, signOut as amplifySignOut, getCurrentUser, fetchUserAttributes, updateUserAttributes } from 'aws-amplify/auth'

interface CustomAttributes {
  'custom:vessel_name'?: string
  'custom:vessel_type'?: string
  'custom:home_marina'?: string
  'custom:location_sharing_level'?: string
  'custom:current_location'?: string
  'custom:bio'?: string
  'custom:instagram_handle'?: string
  'custom:youtube_channel'?: string
}

interface User {
  id: string
  email: string
  name: string
  vesselName?: string
  vesselType?: string
  homeMarina?: string
  locationSharingLevel?: 'public' | 'connections' | 'crew' | 'private'
  currentLocation?: string
  bio?: string
  instagramHandle?: string
  youtubeChannel?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: () => void
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<User>) => Promise<void>
  updateLocationSharing: (level: 'public' | 'connections' | 'crew' | 'private') => Promise<void>
  updateCurrentLocation: (location: string) => Promise<void>
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
        vesselName: attributes['custom:vessel_name'],
        vesselType: attributes['custom:vessel_type'],
        homeMarina: attributes['custom:home_marina'],
        locationSharingLevel: (attributes['custom:location_sharing_level'] as 'public' | 'connections' | 'crew' | 'private') || 'private',
        currentLocation: attributes['custom:current_location'],
        bio: attributes['custom:bio'],
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

  async function updateProfile(updates: Partial<User>) {
    try {
      const userAttributes: Record<string, string> = {}
      
      if (updates.vesselName !== undefined) userAttributes['custom:vessel_name'] = updates.vesselName
      if (updates.vesselType !== undefined) userAttributes['custom:vessel_type'] = updates.vesselType
      if (updates.homeMarina !== undefined) userAttributes['custom:home_marina'] = updates.homeMarina
      if (updates.locationSharingLevel !== undefined) userAttributes['custom:location_sharing_level'] = updates.locationSharingLevel
      if (updates.currentLocation !== undefined) userAttributes['custom:current_location'] = updates.currentLocation
      if (updates.bio !== undefined) userAttributes['custom:bio'] = updates.bio
      if (updates.instagramHandle !== undefined) userAttributes['custom:instagram_handle'] = updates.instagramHandle
      if (updates.youtubeChannel !== undefined) userAttributes['custom:youtube_channel'] = updates.youtubeChannel

      await updateUserAttributes({ userAttributes })
      await checkUser()
    } catch (error) {
      console.error('Error updating profile:', error)
      throw error
    }
  }

  async function updateLocationSharing(level: 'public' | 'connections' | 'crew' | 'private') {
    try {
      await updateUserAttributes({
        userAttributes: {
          'custom:location_sharing_level': level
        }
      })
      await checkUser()
    } catch (error) {
      console.error('Error updating location sharing:', error)
      throw error
    }
  }

  async function updateCurrentLocation(location: string) {
    try {
      await updateUserAttributes({
        userAttributes: {
          'custom:current_location': location
        }
      })
      await checkUser()
    } catch (error) {
      console.error('Error updating current location:', error)
      throw error
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signOut,
    updateProfile,
    updateLocationSharing,
    updateCurrentLocation
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