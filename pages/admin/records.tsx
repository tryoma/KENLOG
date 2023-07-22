import { Box, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import Layout from '../../components/layout';
import { prisma } from '../../lib/prisma';
import { FrontendRecord } from '../../types/frontendRecord';

export async function getServerSideProps() {
  const prismaRecords = await prisma.record.findMany();
  console.log({ prismaRecords });

  const records: FrontendRecord[] = prismaRecords.map((record) => ({
    id: record.id,
    userId: record.userId,
    title: record.title,
    postDate: record.postDate.toISOString(),
    description: record.description,
    place: record.place,
    youtubeURL: record.youtubeURL,
  }));

  console.log({ records });

  return { props: { records } };
}

interface AdminRecordsProps {
  records: FrontendRecord[];
}

export default function AdminRecords({ records }: AdminRecordsProps) {
  console.log({ records });
  return (
    <Layout>
      <h1>ユーザー一覧</h1>
      <Box overflowX="auto">
        <Table my="8" borderWidth="1px" fontSize="sm">
          <Thead bg="gray.50">
            <Tr>
              <Th>ID</Th>
              <Th>Title</Th>
              <Th>PostDate</Th>
            </Tr>
          </Thead>
          <Tbody>
            {records.map((record) => (
              <Tr key={record.id}>
                <Td>{record.id}</Td>
                <Td>{record.title}</Td>
                <Td>{record.postDate}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Layout>
  );
}
