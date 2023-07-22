import { Box, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import Layout from '../../components/layout';
import { prisma } from '../../lib/prisma';
import { FrontendUser } from '../../types/frontendUser';

export async function getServerSideProps() {
  const prismaUsers = await prisma.user.findMany();

  const users = prismaUsers.map((user) => ({
    id: user.id,
    defaultName: user.defaultName,
    email: user.email,
  }));

  console.log({ users });

  return { props: { users } };
}

interface AdminUsersProps {
  users: FrontendUser[];
}

export default function AdminUsers({ users }: AdminUsersProps) {
  console.log({ users });
  return (
    <Layout>
      <h1>ユーザー一覧</h1>
      <Box overflowX="auto">
        <Table my="8" borderWidth="1px" fontSize="sm">
          <Thead bg="gray.50">
            <Tr>
              <Th>ID</Th>
              <Th>Default Name</Th>
              <Th>Email</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>{user.defaultName}</Td>
                <Td>{user.email}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Layout>
  );
}
