'use client';

import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

const links = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Power List',
    href: '/power-list',
  },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className="flex justify-center space-x-6 p-6 border-b shadow-sm relative">
      {links.map((link) => {
        const isCurrent =
          link.href === '/'
            ? pathname === '/'
            : pathname.includes(link.href.split('/')[1]);
        return (
          <Link
            href={link.href}
            className={clsx('text-sm font-medium hover:text-blue-600', {
              'text-blue-600': isCurrent,
            })}
          >
            {link.name}
          </Link>
        );
      })}

      <div className="absolute top-6 right-6">
        <UserButton afterSignOutUrl="/login" />
      </div>
    </div>
  );
}
