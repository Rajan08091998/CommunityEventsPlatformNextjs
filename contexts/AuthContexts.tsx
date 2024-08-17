'use client'

import api from '@/api'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/router'
import React, { createContext, useState, useContext, useEffect } from 'react'

type User = {
  id: number
  username: string
  email: string
}

type AuthContextType = {
  user: User | null
  loading: boolean
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('access')
    if (storedToken) {
      setToken(storedToken)
      fetchUser(storedToken)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUser = async (token:string) => {
    try {
      const decoded: {user_id: string} = jwtDecode(token);
      const response = await api.get(`/api/v1/users/${decoded.user_id}/?format=json`);
      if (response.status == 200) {
        const userData = response.data
        setUser(userData)
      } else {
        // If the token is invalid, clear it
        localStorage.removeItem('access')
        setToken(null)
      }
    } catch (error) {
      console.error('Failed to fetch user data', error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (username: string, password: string) => {
    try {
      const response = await api.post('/api/v1/web-auth/', { username, password })

      if (response.status == 200) {
        const data = response.data
        setToken(data.access)
        localStorage.setItem('access', data.access)
        await fetchUser(data.access)
      } else {
        throw new Error('Login failed')
      }
    } catch (error) {
      console.error('Login error', error)
      throw error
    }
  }

  const register = async (username: string, password: string) => {
    try {
      const response = await api.post('/api/v1/users/', { username, password })
      if (response.status == 201) {
        try {

          const resp = await api.post('/api/v1/web-auth/', { username, password })
          if (resp.status == 200) {
            setToken(resp.data.access)
            localStorage.setItem('access', resp.data.access)
            localStorage.setItem('refresh', resp.data.refresh)
            await fetchUser(resp.data.access)
          } else {
            throw new Error('Registration failed')
          }
        } catch (error) {
          console.error('Registration error', error)
          throw error
        }
      } else {
        throw new Error('Registration failed')
      }
    } catch (error) {
      console.error('Registration error', error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.clear()
  }

  return (
    <AuthContext.Provider value={{ user, loading, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}