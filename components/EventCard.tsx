import { formatDateTime } from '@/utils'
import Link from 'next/link'

type EventProps = {
  event: {
    id: number
    title: string
    location: string
    start_time: string
    end_time: string
  }
}

const EventCard = ({ event }: EventProps) => {
  const formattedDate = formatDateTime(event.start_time);
  const formattedEndDate = formatDateTime(event.end_time);
  console.log(event)
  return (
    <div className="bg-dark shadow-md rounded-lg p-6 dark:bg-gray-800 dark:text-white">
      <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
      <p className="text-gray-600 mb-2">Location: {event.location}</p>
      <p className="text-gray-600 mb-4">Start: {formattedDate}</p>
      <p className="text-gray-600 mb-4">End: {formattedEndDate}</p>
      <Link href={`/events/${event.id}`} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
        View Details
      </Link>
    </div>
  )
}

export default EventCard