import Layout from '@/components/base/layout';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';

export default function Page() {
  const { data: session, status } = useSession();

  return <Layout>{!session && <p>Not signed</p>}</Layout>;
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
