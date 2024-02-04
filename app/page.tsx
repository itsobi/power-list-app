'use client';

import { useUser } from '@clerk/nextjs';

export default function Home() {
  const { user } = useUser();
  return (
    <div className="flex justify-center items-center mt-20">
      <h1 className="font-bold text-2xl lg:font-bold lg:text-4xl">
        {user ? `Welcome ${user.firstName}!` : `Welcome!`}
      </h1>
    </div>
  );
}
