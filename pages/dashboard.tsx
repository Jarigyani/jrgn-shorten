import Layout from '@/components/base/layout';
import TableOfUrls from '@/components/ui/tableOfUrls';
import UrlInputGroup from '@/components/ui/urlInputGroup';
import { User } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

type Props = {
  user: User;
};

const Dashboard = ({ user }: Props) => {
  return (
    <Layout>
      <div className='w-max absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 mx-auto'>
        <UrlInputGroup
          user={user}
          header={`Welcome ${user?.name ? user.name : '!!'}`}
        />
        <TableOfUrls />
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  let user;
  if (session) {
    user = session.user;
  }

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return { props: { user: user } };
};

export default Dashboard;
