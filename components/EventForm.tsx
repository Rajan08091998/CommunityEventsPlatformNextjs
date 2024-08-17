'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface EventFormProps {
  initialData?: {
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    location: string;
  };
  onSubmit: (data: {
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    location: string;
  }) => void;
}

// Format date-time for input fields
const formatDateTime = (dateTime: string) => {
  return dateTime.slice(0,(dateTime.length-1))
};

const EventForm: React.FC<EventFormProps> = ({ initialData, onSubmit }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [startDate, setStartDate] = useState(initialData?.start_time ? formatDateTime(initialData.start_time) : '');
  const [endDate, setEndDate] = useState(initialData?.end_time ? formatDateTime(initialData.end_time) : '');
  const [location, setLocation] = useState(initialData?.location || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, start_time:startDate, end_time:endDate, location });
  };



  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="dark:bg-gray-800 dark:text-white mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm dark:text-white font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="dark:bg-gray-800 dark:text-white mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm dark:text-white font-medium text-gray-700">Start Date</label>
        <input
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="dark:bg-gray-800 dark:text-white mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm dark:text-white font-medium text-gray-700">End Date</label>
        <input
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="dark:bg-gray-800 dark:text-white mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm dark:text-white font-medium text-gray-700">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="dark:bg-gray-800 dark:text-white mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Save Event
      </button>
    </form>
  );
};

export default EventForm;
