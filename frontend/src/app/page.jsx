'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    
    if (!token) {
      // Redirect to login page if no token
      router.push('/login');
    }
  }, [router]);

  return (
    <div>
      <h1>Home Page</h1>
      {/* Content for authenticated users */}
    </div>
  );
}
