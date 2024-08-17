'use client'

import { useState } from 'react'

export default function ChatRoom({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<string[]>([])
  const [newMessage, setNewMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      setMessages([...messages, newMessage])
      setNewMessage('')
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Event Chat Room</h1>
      <div className="bg-gray-100 p-4 h-96 overflow-y-auto mb-4 rounded-lg dark:bg-gray-800">
        {messages.map((message, index) => (
          <div key={index} className="p-2 mb-2 rounded">
            {message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex ">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="dark:bg-gray-800 dark:text-white flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  )
}