'use client';

import { IconButton, TextField, Tooltip } from '@radix-ui/themes';
import { FaQuestion } from 'react-icons/fa';
import Container from '../ui/Container';
import Link from 'next/link';

export default function PowerList() {
  return (
    <Container>
      <form className="">
        <TextField.Input placeholder="Enter task…" />
        <br />
        <Link href="/power-list/info">
          <p className="text-center font-extralight text-sm">
            What is a Power List?
          </p>
        </Link>
      </form>
    </Container>
  );
}
