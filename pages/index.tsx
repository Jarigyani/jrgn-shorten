import Layout from '@/components/base/layout';
import LoadingAnimation from '@/components/ui/loadingAnimation';
import SigninButton from '@/components/ui/signinButton';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Page() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.data?.user) {
      router.replace('/dashboard');
    }
  }, [session, router]);

  return (
    <Layout title='jrgn.jp'>
      <div className='w-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 mx-auto text-center'>
        {session.status === 'loading' ? (
          <LoadingAnimation />
        ) : (
          <>
            <h1 className='text-white text-5xl mb-5 font-bold'>Welcome !!</h1>
            <p className='text-white mb-5 md:text-2xl'>
              This is a very simple, single-function URL shortening service
            </p>
            <h2 className='text-white inline md:text-2xl mr-2'>
              Please sign in to use 👉
            </h2>
            <SigninButton />
          </>
        )}
      </div>
    </Layout>
  );
}
