'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import api from '@/api'
import { Event } from '@/type'
import Loader from '@/components/Loader'
import { formatDateTime } from '@/utils'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContexts'
import { toast } from 'react-toastify'
import ConfirmationModel from '@/components/ConfirmationModel'

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<Event | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const eventId = params.id
  const router = useRouter()
  const { user } = useAuth()

  const fetchEventDetails = async () => {
    try {
      const response = await api.get(`api/v1/events/${eventId}/`)
      if (response.status === 200) {
        setEvent(response.data)
      } else {
        console.error('Failed to fetch event details')
      }
    } catch (error) {
      console.error('Error fetching event details:', error)
    }
  }

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await api.get(`api/v1/events/${eventId}/`)
        if (response.status === 200) {
          setEvent(response.data)
        } else {
          console.error('Failed to fetch event details')
        }
      } catch (error) {
        console.error('Error fetching event details:', error)
      }
    }
    fetchEventDetails();
  }, [eventId])

  if (!event) {
    return <Loader />
  }

  const formattedStartDate = formatDateTime(event.start_time)
  const formattedEndDate = formatDateTime(event.end_time)

  const handleJoin = async () => {
    try {
      await api.post(`/api/v1/events/${eventId}/participants/`)
      toast.success("Successfully joined the event")
      await fetchEventDetails()
    } catch (error) {
      console.error('Error joining event:', error)
      toast.error('Failed to join event')
    }
  }

  const handleDelete = async () => {

    try {
      await api.delete(`api/v1/events/${eventId}/`)
      toast.success('Event deleted successfully')
      router.push('/events') // Redirect to the events page
    } catch (error) {
      console.error('Error deleting event:', error)
      toast.error('Failed to delete event')
    }

  }

  return (
    <div className="container mx-auto p-4 ">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 dark:bg-gray-800 dark:text-white">
        <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
        <p className="text-gray-600 mb-2"><strong>Location:</strong> {event.location}</p>
        <p className="text-gray-600 mb-2"><strong>Start:</strong> {formattedStartDate}</p>
        <p className="text-gray-600 mb-2"><strong>End:</strong> {formattedEndDate}</p>
        <p className="text-gray-600 mb-2"><strong>Organizer:</strong> {event.organizer}</p>
        <p className="mb-6">{event.description}</p>
        {/* Volunteers Section */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Volunteers</h2>
          {event.participants.length > 0 ? (
            <ul className="list-disc pl-5 space-y-2">
              {event.participants.map((participant, index) => (
                <li key={index} className="text-gray-700">
                  {participant}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No volunteers yet.</p>
          )}
        </div>


        <div className="flex space-x-4 mb-6 mt-6">
          {!event.participants.includes(user?.username!) && event.organizer !== user?.username && (
            <button
              onClick={handleJoin}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Join Event
            </button>
          )}

          <Link
            href={`/events/${eventId}/chat`}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Chat Room
          </Link>
        </div>

        {user?.username === event.organizer && (
          <div className="flex space-x-4">
            <Link
              href={`/events/${eventId}/update`}
              className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Update Event
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete Event
            </button>
          </div>
        )}

        < ConfirmationModel
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
          message="Are you sure you want to delete this event?"
        />
      </div>
    </div>
  )
}
