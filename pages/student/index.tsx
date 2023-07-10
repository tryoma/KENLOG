import { GetServerSideProps, NextPage } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import Layout from '../../components/layout';
import Link from 'next/link';
import { getUserRecords } from '../../lib/records';
import { Record } from '@prisma/client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  records: Record[];
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

  const records: Record[] = await getUserRecords(userEmail);

  return {
    props: {
      records: JSON.parse(JSON.stringify(records)),
    },
  };
};

const StudentHome: NextPage<Props> = ({ records }) => {
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
        <h1>生徒のホーム</h1>
        <Link href="/student/new">新規投稿</Link>
        {records.length === 0 ? (
          <p>No records found.</p>
        ) : (
          <ul>
            {records.map((record) => (
              <li key={record.id}>
                <h2>{record.title}</h2>
                <p>{record.description}</p>
                <p>{record.postDate.toLocaleString()}</p>
                <p>{record?.place}</p>
                <p>{record.youtubeURL}</p>
                <button
                  onClick={() => deleteRecord(record.id)}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </Layout>
    </>
  );
};

export default StudentHome;
