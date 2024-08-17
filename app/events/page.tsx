'use client'
import api from '@/api'
import EventCard from '@/components/EventCard'
import ProtectedRoute from '@/components/ProtectedRoutes'
import { Event } from '@/type';
import Link from 'next/link';
import { useEffect, useState } from 'react';

async function fetchEvents(): Promise<Event[]> {
    try {
        const response = await api.get('api/v1/events/');
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
        }
    } catch (err) {
        console.log(err);
        return [];
    }
}

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const eventList = await fetchEvents();
            setEvents(eventList);
        };
        fetchData();
    }, []);

    return (
        <ProtectedRoute>
            <div>
                <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
                <Link href="/events/create">
                    <button className="bg-green-600 text-white px-4 py-2 m-2 rounded-lg hover:bg-green-700 transition-colors">
                        Create Event
                    </button>
                </Link>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            </div>
        </ProtectedRoute>
    );
}
