import { urlParesAtom } from '@/atoms';
import Layout from '@/components/base/layout';
import TableOfUrls from '@/components/ui/tableOfUrls';
import UrlInputGroup from '@/components/ui/urlInputGroup';
import { User } from '@prisma/client';
import { useAtom } from 'jotai';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect } from 'react';

type Props = {
  user: User;
};

const Dashboard = ({ user }: Props) => {
  const [urlPares, setUrlPares] = useAtom(urlParesAtom);
  useEffect(() => {
    fetch('/api/getallurls', {
      method: 'POST',
      body: JSON.stringify({
        email: user?.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return console.log(data.error);
        return setUrlPares(data);
      });
  }, []);

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
