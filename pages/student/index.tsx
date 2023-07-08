import { GetServerSideProps, NextPage } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import Layout from '../../components/layout';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  const userItem = {
    name: 'test',
    email: 'test',
    image: 'test',
    birthday: '2021-01-01',
  };

  return {
    props: userItem,
  };
};

const StudentHome: NextPage<any> = (props) => {
  const { name, email, image, birthday } = props;

  return (
    <>
      <Layout>
        <h1>生徒のホーム</h1>
      </Layout>
    </>
  );
};

export default StudentHome;
