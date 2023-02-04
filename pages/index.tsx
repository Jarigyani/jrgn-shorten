import Layout from '@/components/base/layout';
import SigninButton from '@/components/ui/signinButton';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

export default function Page() {
  return (
    <Layout title='jrgn.jp'>
      <div className='w-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 mx-auto text-center'>
        <h1 className='text-white text-5xl mb-5 font-bold'>Welcome !!</h1>
        <p className='text-white mb-5 md:text-2xl'>
          This is a very simple, single-function URL shortening service
        </p>
        <h2 className='text-white inline md:text-2xl'>
          Please sign in to use 👉
        </h2>
        <SigninButton />
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
