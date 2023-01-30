import Layout from '@/components/base/layout';
import UrlInputGroup from '@/components/ui/urlInputGroup';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

export default function Page() {
  return (
    <Layout>
      <UrlInputGroup header='Welcome!!' />
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
