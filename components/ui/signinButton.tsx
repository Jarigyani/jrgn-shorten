import { signIn, signOut, useSession } from 'next-auth/react';

const SigninButton = () => {
  const { data: session } = useSession();

  return (
    <>
      {!session && (
        <button
          className='btn'
          onClick={() => {
            signIn('google');
          }}
        >
          Sign in
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
