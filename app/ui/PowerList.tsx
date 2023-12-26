import Link from 'next/link';
import React from 'react';

export default function PowerList() {
  return (
    <form className="flex flex-col items-center">
      <input
        type="text"
        className="border w-[300px] sm:w-[400px] lg:w-[500px] p-2 rounded-md focus:outline-none focus:border-blue-600k focus:ring-1"
        placeholder="Enter task..."
      />
      <br />
      <Link href="/power-list/info">
        <p className="text-center font-extralight text-sm hover:text-slate-600">
          What is a Power List?
        </p>
      </Link>
    </form>
  );
}
