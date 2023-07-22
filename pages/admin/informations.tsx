import { GetServerSideProps } from 'next';
import Layout from '../../components/layout';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { prisma } from '../../lib/prisma';
import { FrontendInformation } from '../../types/frontendInformation';
import InformationModal from '../../components/modal/InformationModal';

export const getServerSideProps: GetServerSideProps = async () => {
  const prismaInformations = await prisma.information.findMany();

  const informations: FrontendInformation[] = prismaInformations.map(
    (information) => ({
      id: information.id,
      title: information.title,
      description: information.description,
    }),
  );

  return {
    props: {
      informations,
    },
  };
};

interface AdminInformationProps {
  informations: FrontendInformation[];
}

export default function AdminInformation({
  informations,
}: AdminInformationProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Layout>
      <InformationModal isOpen={isOpen} onClose={onClose} />
      <Box mb={5}>
        <Heading as="h1">Information一覧</Heading>
        <Button onClick={onOpen} colorScheme="blue" mt={5}>
          新規作成
        </Button>
      </Box>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Description</Th>
          </Tr>
        </Thead>
        <Tbody>
          {informations.map((information) => (
            <Tr key={information.id}>
              <Td>{information.title}</Td>
              <Td>
                <Text isTruncated>{information.description}</Text>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Layout>
  );
}
