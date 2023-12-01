'use client';

import { TextField } from '@radix-ui/themes';
import { CiClock1, CiLock, CiLogin } from 'react-icons/ci';
import { Flex, Button } from '@radix-ui/themes';

export default function LoginForm() {
  return (
    <div className="bg-blue-50 p-24 rounded-sm">
      <h1 className="font-bold text-center text-2xl mb-6">Login</h1>
      <Flex direction="column" gap="3">
        <TextField.Root>
          <TextField.Slot>
            <CiLogin height="16" width="4" />
          </TextField.Slot>
          <TextField.Input placeholder="Username" size="3" />
        </TextField.Root>

        <TextField.Root>
          <TextField.Slot>
            <CiLock height="16" width="16" />
          </TextField.Slot>
          <TextField.Input placeholder="Password" size="3" type="password" />
          <TextField.Slot></TextField.Slot>
        </TextField.Root>
        <Button color="orange" size="3" variant="soft">
          Login
        </Button>
      </Flex>
    </div>
  );
}
