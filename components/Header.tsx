// components/Header.tsx
'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContexts'
import { MenuIcon, UserIcon, XIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const Header = () => {
  const { user, logout } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const router = useRouter()

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev)
  }

  const handleLogout = () => {
    logout()
    setIsDropdownOpen(false)
    router.push('/login')
    
  }

  return (
    <header className="bg-blue-600 text-white">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Eventure
        </Link>
        <ul className="flex space-x-4 items-center">
          <li><Link href="/events">Events</Link></li>
          {user ? (
            <li className="relative">
              <button onClick={toggleDropdown} className="flex items-center space-x-2">
                <UserIcon className="h-6 w-6 text-white" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <span className="font-bold">{user.username}</span>
                  </div>
                  <ul className="py-2">
                    <li>
                      <Link href="/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</Link>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-200">Logout</button>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          ) : (
            <>
              <li><Link href="/login">Login</Link></li>
              <li><Link href="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header
