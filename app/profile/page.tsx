// pages/profile.tsx
'use client';

import Loader from '@/components/Loader';
import { useAuth } from '@/contexts/AuthContexts';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Profile = () => {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login'); // Redirect to login if the user is not logged in
    }
  }, [loading, user, router]);

  if (loading) {
    return <Loader/> // Replace with Loader component if needed
  }



  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      {user ? (
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-2xl font-semibold mb-2">Hello, {user.username}!</h2>
          
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>You are not logged in.</div>
      )}
    </div>
  );
};

export default Profile;
