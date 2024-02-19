'use client';

import { useRouter } from 'next/navigation';

export default function BackButton({
  children,
}: React.PropsWithChildren<{
  className?: string;
}>) {
  const router = useRouter();
  return (
    <button
      className="border rounded-full px-12 py-4 bg-blue-600 text-white flex items-center"
      onClick={() => router.back()}
    >
      {children}
    </button>
  );
}
