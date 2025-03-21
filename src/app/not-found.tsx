import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl font-bold text-[var(--primary-color)] mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-xl mb-8 text-[var(--text-primary)]">
        The page you&apos;re looking for doesn&apos;t exist
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-[var(--primary-color)] text-white rounded-md hover:bg-[var(--primary-dark)] transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}
