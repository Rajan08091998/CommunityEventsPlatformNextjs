// pages/events/create.tsx
'use client';

import { useRouter } from 'next/navigation';
import EventForm from '@/components/EventForm';
import api from '@/api';
import { toast } from 'react-toastify';

const CreateEvent = () => {
  const router = useRouter();

  const handleCreateEvent = async (data: {
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    location: string;
  }) => {
    try {
      const response = await api.post('/api/v1/events/', data)

      if (response.status == 201) {
        toast.success('Event created successfully.')
        router.push('/events');
      } else {
        toast.error('Failed to create event');
      }
    } catch (error) {
      console.error('An error occurred:', error);

      toast.error('Failed to create event');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Create Event</h1>
      <EventForm onSubmit={handleCreateEvent} />
    </div>
  );
};

export default CreateEvent;
