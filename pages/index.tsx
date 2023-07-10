import Layout from '../components/layout';
import { PrismaClient, Record } from '@prisma/client';
import { GetServerSideProps } from 'next';

const prisma = new PrismaClient();

interface Props {
  records: Record[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const records: Record[] = await prisma.record.findMany({
    take: 20,
  });

  return {
    props: {
      records,
    },
  };
};

export default function IndexPage({ records }: Props) {
  return (
    <Layout>
      <h1>NextAuth.js Example</h1>
      <p>
        This is an example site to demonstrate how to use{' '}
        <a href="https://next-auth.js.org">NextAuth.js</a> for authentication.
      </p>
      <h2>Latest Records</h2>
      <ul>
        {records.map((record) => (
          <li key={record.id}>{record.title}</li>
        ))}
      </ul>
    </Layout>
  );
}
