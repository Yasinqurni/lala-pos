import { DarkModeToggle } from '@/components/common/darkmode-toggle';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <div className="fixed top-4 right-4 z-50">
        <DarkModeToggle />
      </div>
      <div className="bg-muted flex justify-center items-center h-screen flex-col space-y-4">
        <h1 className="text-4xl font-semibold">Welcome Nurul Nur Afifah</h1>
        <Link href="/admin">
          <Button className="bg-teal-500 text-white">Access Dashboard</Button>
        </Link>
      </div>
    </div>
    
  );
}

