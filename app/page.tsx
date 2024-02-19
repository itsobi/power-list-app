'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';

export default function Home() {
  const { user } = useUser();

  return (
    <div className="flex flex-col justify-center items-center mt-20 space-y-24">
      <h1 className="font-bold text-2xl lg:font-bold lg:text-4xl">
        {user
          ? `Welcome ${
              user.firstName ?? user.primaryEmailAddress?.emailAddress
            }!`
          : 'Welcome!'}
      </h1>

      <Link
        href="/power-list"
        className="border rounded-full px-12 py-4 bg-blue-600 text-white flex items-center"
      >
        Go to Power List
        <IoIosArrowForward />
      </Link>
    </div>
  );
}
