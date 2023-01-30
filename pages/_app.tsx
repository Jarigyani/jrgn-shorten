import Footer from '@/components/base/footer';
import Navbar from '@/components/base/navbar';
import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className='min-h-screen'>
        <Navbar />
        <Component {...pageProps} />
      </div>
      <Footer />
    </SessionProvider>
  );
}
