import Head from 'next/head';
import Navbar from './navbar';

type Props = {
  title: string;
  children: React.ReactNode;
};

const Layout = ({ title, children }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <div className='bg-mainbg bg-fixed bg-cover'>
          <Navbar />
          <div className='min-h-screen max-w-[1440px] mx-auto'>{children}</div>
        </div>
      </main>
    </>
  );
};

export default Layout;
