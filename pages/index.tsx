import Layout from '@/components/base/layout';
import TableOfUrls from '@/components/ui/tableOfUrls';
import UrlInputGroup from '@/components/ui/urlInputGroup';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

export default function Page() {
  return (
    <Layout title='Home'>
      <div className='w-max absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 mx-auto'>
        <UrlInputGroup header='Welcome!!' />
        <TableOfUrls />
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
