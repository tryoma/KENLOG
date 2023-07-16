import { Record as PrismaRecord } from '@prisma/client';
import { GetServerSideProps } from 'next';
import Layout from '../components/layout';
import styles from './styles/Home.module.css';
import SectionCards from '../components/card/section-cards';
import VideoModal from '../components/modal/videoModal';
import { useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { prisma } from '../lib/prisma';
import { FrontendRecord } from '../types/frontendedRecord';

interface Props {
  records: FrontendRecord[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const prismaRecords: PrismaRecord[] = await prisma.record.findMany({
    take: 20,
  });

  const frontendRecords: FrontendRecord[] = prismaRecords.map(
    (prismaRecord) => ({
      id: prismaRecord.id,
      userId: prismaRecord.userId,
      title: prismaRecord.title,
      postDate: prismaRecord.postDate.toISOString(),
      description: prismaRecord.description,
      place: prismaRecord.place,
      youtubeURL: prismaRecord.youtubeURL,
    }),
  );

  return {
    props: {
      records: frontendRecords,
    },
  };
};

export default function IndexPage({ records }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectVideo, setSelectVideo] = useState<FrontendRecord | null>(null);

  const onSelectVideo = (id: number) => {
    const selectedVideoRecord = records.find((record) => record.id === id);
    setSelectVideo(selectedVideoRecord ?? null);
    onOpen();
  };

  return (
    <Layout>
      <VideoModal isOpen={isOpen} onClose={onClose} video={selectVideo} />
      <h1>NextAuth.js Example</h1>
      <p>
        This is an example site to demonstrate how to use{' '}
        <a href="https://next-auth.js.org">NextAuth.js</a> for authentication.
      </p>
      <h2>Latest Records</h2>
      <div className={styles.sectionWrapper}>
        <SectionCards
          title="最近"
          videos={records}
          size="small"
          onSelectVideo={onSelectVideo}
        />
      </div>
    </Layout>
  );
}
