import React from 'react';
import Navbar from '../ui/Navbar';

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center mt-40">
        <h1 className="text-4xl font-extrabold">
          Welcome (user's name inserted here)!
        </h1>
      </div>
    </>
  );
}
