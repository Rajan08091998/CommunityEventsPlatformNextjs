// pages/events/[id]/edit.tsx
'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import EventForm from '@/components/EventForm';
import api from '@/api';
import { toast } from 'react-toastify';

const UpdateEvent = () => {
  const router = useRouter();
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await api.get(`/api/v1/events/${id}/`);
        setEventData(response.data);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchEventData();
  }, [id]);

  const handleUpdateEvent = async (data: {
    title: string;
    description: string;
    start_time : string;
    end_time: string;
    location: string;
  }) => {
    try {
      const response = await api.patch(`/api/v1/events/${id}/`, data)

      if (response.status != 400) {
        toast.success("Event update successfully.")
        router.push('/events');
      } else {
        console.error('Failed to update event');
        toast.error('Failed to update event. Try again later.');

      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('Failed to update event. Try again later.');

    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Update Event</h1>
      {eventData ? (
        <EventForm initialData={eventData} onSubmit={handleUpdateEvent} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default UpdateEvent;
