import Layout from '@/components/base/layout';
import SigninButton from '@/components/ui/signinButton';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

export default function Page() {
  return (
    <Layout title='Home'>
      <div className='w-max absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 mx-auto text-center'>
        <h1 className='text-3xl mb-5'>Welcome !!</h1>
        <h2 className='inline'>Please sign in to use 👉 </h2>
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
