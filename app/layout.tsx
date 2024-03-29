import { ClerkProvider, SignedIn } from '@clerk/nextjs';
import { Theme } from '@radix-ui/themes';
import './globals.css';
import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './ui/Navbar';
import Footer from './ui/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Power List',
  description: 'Personal Power List App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <SignedIn>
            <Navbar />
          </SignedIn>
          <Theme>{children}</Theme>
          {/* <SignedIn>
            <Footer />
          </SignedIn> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
