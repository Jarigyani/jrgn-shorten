import Layout from '@/components/base/layout';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

const Dashboard = () => {
  return (
    <Layout>
      <div className='mx-auto w-max absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <div className='form-control'>
          <label className='input-group'>
            <input
              type='text'
              placeholder='http://example.com'
              className='md:w-96 input input-bordered'
            />
            <span>Add URL</span>
          </label>
        </div>
        <div>
          <ul className='my-5'>{}</ul>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return { props: { session: session } };
};

export default Dashboard;
