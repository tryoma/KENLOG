import { GetServerSideProps, NextPage } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import Layout from '../../components/layout';
import Link from 'next/link';
import { getOthersRecords, getUserRecords } from '../../lib/records';
import { Record } from '@prisma/client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Heading } from '@chakra-ui/react';
import { FrontendRecord } from '../../types/frontendRecord';
import { RecordCard } from '../../components/recordCard/recordCard';

interface Props {
  userRecords: FrontendRecord[];
  otherRecords: FrontendRecord[];
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const records = await getUserRecords(userEmail);
  const otherRecords = await getOthersRecords(userEmail);

  return {
    props: {
      userRecords: records,
      otherRecords,
    },
  };
};

const StudentHome: NextPage<Props> = ({ userRecords, otherRecords }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const deleteRecord = async (id: number) => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/record/delete?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Record deleted');
        router.refresh();
      } else {
        console.error('Failed to delete record:', response.statusText);
      }
      setIsDeleting(false);
    } catch (error) {
      console.error('Failed to delete record:', error);
    }
  };
  return (
    <>
      <Layout>
        <Box>
          <Heading as="h2" size="md">
            自分の投稿
          </Heading>
          {userRecords.length === 0 ? (
            <p>No records found.</p>
          ) : (
            <ul>
              {userRecords.map((record) => (
                <RecordCard key={record.id} record={record} isMe={true} />
              ))}
            </ul>
          )}
        </Box>
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
        <Link href="/student/new">新規投稿</Link>
      </Layout>
    </>
  );
};

export default StudentHome;
