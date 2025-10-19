'use client'

import { DarkModeToggle } from '@/components/common/darkmode-toggle';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth-store';
import Link from 'next/link';

export default function Home() {
   const profile = useAuthStore((state) => state.profile);

  return (
    <div>
      <div className="fixed top-4 right-4 z-50">
        <DarkModeToggle />
      </div>
      <div className="bg-muted flex justify-center items-center h-screen flex-col space-y-4">
        <h1 className="text-4xl font-semibold capitalize">Welcome {profile.name}</h1>
        <Link href="/admin">
          <Button className="bg-teal-500 text-white">Access Dashboard</Button>
        </Link>
      </div>
    </div>
    
  );
}

