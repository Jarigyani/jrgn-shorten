import Head from 'next/head';

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
      <main className='min-h-screen mt-16 max-w-[1440px] mx-auto px-5'>
        {children}
      </main>
    </>
  );
};

export default Layout;
