import Layout from '@/components/base/layout';
import { GetServerSideProps } from 'next';

const Id = () => {
  return (
    <Layout title='Not Found'>
      <h1 className='text-6xl'>Not Found</h1>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let res = await fetch(`${process.env.BASE_FETCH_URL}/api/geturl`, {
    method: 'POST',
    body: JSON.stringify({
      id: context.query.id,
    }),
  }).then((res) => res.json());

  if (res) {
    return {
      redirect: {
        destination: `http://${res.url}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Id;
