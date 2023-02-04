import Layout from '@/components/base/layout';
import { GetServerSideProps } from 'next';

const Id = () => {
  return (
    <Layout title='Not Found'>
      <div className='h-max my-auto absolute top-0 bottom-0 left-0 right-0 m-auto px-2 text-center text-white'>
        <h1 className='text-6xl font-bold'>URL Not Found</h1>
      </div>
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
