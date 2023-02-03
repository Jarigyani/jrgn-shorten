import { urlParesAtom, userAtom } from '@/atoms';
import Layout from '@/components/base/layout';
import TableOfUrls from '@/components/ui/tableOfUrls';
import UrlInputGroup from '@/components/ui/urlInputGroup';
import { useAtom } from 'jotai';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect } from 'react';

type Props = {
  sUser:
    | {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
      }
    | undefined;
};

const Dashboard = ({ sUser }: Props) => {
  const [user, setUser] = useAtom(userAtom);
  const [urlPares, setUrlPares] = useAtom(urlParesAtom);
  useEffect(() => {
    setUser(sUser);
    console.log(user);

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
      <div className='w-max absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 mx-auto'>
        <UrlInputGroup header={`Welcome ${user?.name ? user.name : '!!'}`} />
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

  return { props: { sUser: user } };
};

export default Dashboard;
