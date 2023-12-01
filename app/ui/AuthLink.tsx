import Link from 'next/link';
import React from 'react';

export default function AuthLink({
  text,
  href,
}: {
  text: string;
  href: string;
}) {
  return (
    <div className="mt-10">
      <Link className="text-center mt-10" href={href}>
        <p className="underline font-light">{text}</p>
      </Link>
    </div>
  );
}
