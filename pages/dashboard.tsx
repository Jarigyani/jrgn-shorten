import { urlParesAtom, userAtom } from '@/atoms';
import Layout from '@/components/base/layout';
import DeleteCheckModal from '@/components/ui/deleteCheckModal';
import PareLimitModal from '@/components/ui/pareLimitModal';
import TableOfUrls from '@/components/ui/tableOfUrls';
import UrlInputGroup from '@/components/ui/urlInputGroup';
import { useAtom } from 'jotai';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();

  const [user, setUser] = useAtom(userAtom);
  const [urlPares, setUrlPares] = useAtom(urlParesAtom);
  useEffect(() => {
    // GetAllUsers({ sUser });
    setUser(session.data?.user);
    if (!session.data?.user) router.replace('/');

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
  }, [session.data?.user, setUrlPares, setUser, user, user?.email]);

  return (
    <Layout title='Dashboard'>
      <div className='h-max my-auto absolute top-0 bottom-0 left-0 right-0 m-auto px-2'>
        <PareLimitModal />
        <DeleteCheckModal />
        <div className='justify-center flex flex-col'>
          <UrlInputGroup />
          <TableOfUrls />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
