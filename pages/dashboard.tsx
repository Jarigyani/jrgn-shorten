import { urlParesAtom, userAtom } from '@/atoms';
import Layout from '@/components/base/layout';
import TableOfUrls from '@/components/ui/tableOfUrls';
import UrlInputGroup from '@/components/ui/urlInputGroup';
import { SessionUser } from '@/types/types';
import { useAtom } from 'jotai';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect } from 'react';

type Props = {
  sUser: SessionUser;
};

const Dashboard = ({ sUser }: Props) => {
  const [user, setUser] = useAtom(userAtom);
  const [urlPares, setUrlPares] = useAtom(urlParesAtom);
  useEffect(() => {
    // GetAllUsers({ sUser });
    setUser(sUser);
    if (user?.email) {
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
    }
  }, [sUser, setUrlPares, setUser, user, user?.email]);

  return (
    <Layout title='Dashboard'>
      <div className='h-max my-auto absolute top-0 bottom-0 left-0 right-0 m-auto px-2'>
        <div className='justify-center flex flex-col'>
          <UrlInputGroup header={`Welcome ${user?.name ? user.name : '!!'}`} />
          <TableOfUrls />
        </div>
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

  return { props: { sUser: user } };
};

export default Dashboard;
