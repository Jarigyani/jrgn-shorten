import Layout from '@/components/base/layout';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

const Id = () => {
  return (
    <Layout>
      <h1 className='text-6xl'>Not Found</h1>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const res = await fetch('localhost:3000/api/getallurl', {
    method: 'POST',
    body: JSON.stringify({
      email: session?.user?.email,
    }),
  }).then((res) => res.json());
  // let res = await fetch(`localhost:3000/api/geturl`, {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     id: context.query.id,
  //   }),
  // }).then((res) => res.json());

  // if (res) {
  //   return {
  //     redirect: {
  //       destination: `http://${res.url}`,
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {},
  };
};

export default Id;
