'use client';

import { TextField } from '@radix-ui/themes';
import { CiLock, CiLogin, CiMail } from 'react-icons/ci';
import { Flex, Button } from '@radix-ui/themes';
import { useState } from 'react';
import Link from 'next/link';
import AuthLink from './AuthLink';
import { createUser } from '@/firebase/auth';

export default function LoginForm({ title }: { title: string }) {
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const handleFormSubmit = (e: any) => {
    e.preventDefault();

    if (title === 'Register') {
      createUser(formValues.email, formValues.password);
    }
  };

  return (
    <div className="bg-blue-50 p-24 rounded-sm">
      <h1 className="font-bold text-center text-2xl mb-6">{title}</h1>
      <form onSubmit={handleFormSubmit}>
        <Flex direction="column" gap="3">
          <TextField.Root>
            <TextField.Slot>
              <CiMail />
            </TextField.Slot>
            <TextField.Input
              placeholder="Email"
              size="3"
              value={formValues.email}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  email: e.target.value,
                })
              }
            />
          </TextField.Root>

          <TextField.Root>
            <TextField.Slot>
              <CiLock />
            </TextField.Slot>
            <TextField.Input
              placeholder="Password"
              size="3"
              type="password"
              value={formValues.password}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  password: e.target.value,
                })
              }
            />
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
