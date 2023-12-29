import { SignIn } from '@clerk/nextjs';
import React from 'react';

export default function Login() {
  return (
    <div className="flex justify-center items-center h-full mt-10">
      <SignIn afterSignInUrl="/" />
    </div>
  );
}
