type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <main className='min-h-screen mt-16 max-w-[1440px] mx-auto px-5'>
        {children}
      </main>
    </>
  );
};

export default Layout;
