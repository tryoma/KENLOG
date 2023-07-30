import { GetServerSideProps, NextPage } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import Layout from '../../components/layout';
import Link from 'next/link';
import { checkUserIsTeacher } from '../../lib/users';
import { getOthersRecords } from '../../lib/records';
import { Box, Heading } from '@chakra-ui/react';
import { RecordCard } from '../../components/recordCard/recordCard';
import { FrontendRecord } from '../../types/frontendRecord';

interface Props {
  // userRecords: FrontendRecord[];
  otherRecords: FrontendRecord[];
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const userEmail = session?.user?.email || '';
  const isTeacher = await checkUserIsTeacher(userEmail);

  if (!userEmail) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  if (!isTeacher) {
    return {
      redirect: {
        destination: '/student?alert=notATeacher',
        permanent: false,
      },
    };
  }

  // const records = await getUserRecords(userEmail);
  const otherRecords = await getOthersRecords(userEmail);

  return {
    props: { otherRecords },
  };
};

const TeacherHome: NextPage<Props> = ({ otherRecords }) => {
  return (
    <>
      <Layout>
        <h1>先生のホーム</h1>
        <Link href="/teacher/orders">依頼一覧</Link>
        <Box marginTop={'1rem'}>
          <Heading as="h2" size="md">
            最近の投稿
          </Heading>
          {otherRecords.length === 0 ? (
            <p>No records found.</p>
          ) : (
            <ul>
              {otherRecords.map((record) => (
                <RecordCard key={record.id} record={record} />
              ))}
            </ul>
          )}
        </Box>
      </Layout>
    </>
  );
};

export default TeacherHome;
