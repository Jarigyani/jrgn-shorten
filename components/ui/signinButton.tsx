import { signIn, signOut, useSession } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

const SigninButton = () => {
  const { data: session } = useSession();

  return (
    <>
      {!session && (
        <button
          className='btn'
          onClick={() => {
            signIn('google', { callbackUrl: '/dashboard' });
          }}
        >
          <FcGoogle className='inline w-5 h-5 mr-2' />
          <span>Sign in</span>
        </button>
      )}
      {session && (
        <button
          className='btn'
          onClick={() => {
            signOut({ callbackUrl: '/' });
          }}
        >
          Sign out
        </button>
      )}
    </>
  );
};

export default SigninButton;
