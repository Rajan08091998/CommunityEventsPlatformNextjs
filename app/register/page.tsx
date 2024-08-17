// app/register/page.tsx
'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContexts'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export default function RegisterPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { register } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await register(username, password)
      .then(()=> router.push('/'))
      
    } catch (error) {
      console.error('Registration failed', error)
      toast.error('Registration failed please try again.')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md  dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md  dark:bg-gray-800 dark:text-white"
          />
        </div>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors">
          Register
        </button>
      </form>
    </div>
  )
}