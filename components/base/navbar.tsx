import Link from 'next/link';
import SigninButton from '../ui/signinButton';

const Navbar = () => {
  return (
    <>
      <div className='z-50 fixed top-0 w-screen backdrop-blur-md'>
        <div className='flex justify-between py-2 max-w-[1440px] mx-auto px-5'>
          <Link
            href={'/'}
            className='text-white text-3xl cursor-default normal-case font-bold py-2'
          >
            jrgn.jp 🦞
          </Link>
          <SigninButton />
        </div>
      </div>
    </>
  );
};

export default Navbar;
