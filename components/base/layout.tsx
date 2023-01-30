type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className='mt-16 max-w-[1440px] mx-auto px-5'>{children}</div>
    </>
  );
};

export default Layout;
