import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl font-bold text-[#ff69b4] mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-8">The page you&apos;re looking for doesn&apos;t exist</p>
      <Link 
        href="/" 
        className="px-6 py-3 bg-[#ff69b4] text-white rounded-md hover:bg-[#ff1493] transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
} 