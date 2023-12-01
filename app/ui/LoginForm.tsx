'use client';

import { TextField } from '@radix-ui/themes';
import { CiLock, CiLogin } from 'react-icons/ci';
import { Flex, Button } from '@radix-ui/themes';
import { useState } from 'react';
import Link from 'next/link';
import AuthLink from './AuthLink';

export default function LoginForm({ title }: { title: string }) {
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
  };

  if (loggedInUser) {
    return (
      <div>
        <p>Logged in as {loggedInUser.name}</p>
        {/* <button type="button" onClick={logout}>
          Logout
        </button> */}
      </div>
    );
  }

  return (
    <div className="bg-blue-50 p-24 rounded-sm">
      <h1 className="font-bold text-center text-2xl mb-6">{title}</h1>
      <form onSubmit={handleFormSubmit}>
        <Flex direction="column" gap="3">
          <TextField.Root>
            <TextField.Slot>
              <CiLogin />
            </TextField.Slot>
            <TextField.Input placeholder="Username" size="3" />
          </TextField.Root>

          <TextField.Root>
            <TextField.Slot>
              <CiLock />
            </TextField.Slot>
            <TextField.Input placeholder="Password" size="3" type="password" />
            <TextField.Slot></TextField.Slot>
          </TextField.Root>
          <Button color="orange" size="3" variant="soft">
            {title}
          </Button>
        </Flex>
      </form>
      {title === 'Register' ? (
        <AuthLink text="Already registered?" href="/login" />
      ) : (
        <AuthLink text="Sign up" href="/" />
      )}
    </div>
  );
}
