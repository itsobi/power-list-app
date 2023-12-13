import { SignUp } from '@clerk/nextjs';
import React from 'react';

export default function Register() {
  return (
    <div className="flex justify-center items-center h-full mt-10">
      <SignUp />
    </div>
  );
}
