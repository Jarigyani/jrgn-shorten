import { signIn, signOut, useSession } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

const SigninButton = () => {
  const { data: session } = useSession();

  return (
    <>
      {!session && (
        <button
          className='btn normal-case'
          onClick={() => {
            signIn('google');
          }}
        >
          <FcGoogle className='inline w-5 h-5' />
          <pre> Sign in</pre>
        </button>
      )}
      {session && (
        <button
          className='btn'
          onClick={() => {
            signOut();
          }}
        >
          Sign out
        </button>
      )}
    </>
  );
};

export default SigninButton;
