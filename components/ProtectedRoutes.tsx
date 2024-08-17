'use client';

import { useAuth } from '@/contexts/AuthContexts';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loader from './Loader';

interface DecodedToken {
  exp: number; // Assuming the JWT has an 'exp' property representing expiration time
}

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      try {
        const decoded:DecodedToken = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now && !loading) {
          router.push('/login');
        }
      } catch (error) {
        console.error('Invalid token:', error);
        router.push('/login');
      }
    } else if (!loading) {
      router.push('/login');
    }
  }, [token, loading, router]);

  if (loading) {
    return <Loader/>
  }

  if (!token) {
    return null
  }

  return <>{children}</>;
}
