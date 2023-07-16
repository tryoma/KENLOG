import Card from './card';
import Link from 'next/link';
import clsx from 'classnames';
import styles from './section-cards.module.css';
import { FrontendRecord } from '../../types/frontendedRecord';

interface Record {
  id: number;
  title: string;
  postDate: Date;
  description: string;
  place: string;
  youtubeURL: string;
}

interface SectionCardsProps {
  title: string;
  videos: FrontendRecord[];
  size?: 'large' | 'medium' | 'small';
  shouldWrap?: boolean;
  shouldScale?: boolean;
  onSelectVideo: (id: number) => void;
}

export default function SectionCards(props: SectionCardsProps) {
  const {
    title,
    videos = [],
    size,
    shouldWrap = false,
    shouldScale,
    onSelectVideo,
  } = props;

  console.log({ videos });

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={clsx(styles.cardWrapper, shouldWrap && styles.wrap)}>
        {videos.map((video, idx) => (
          <Card
            key={video.id}
            id={idx}
            imgUrl={`https://img.youtube.com/vi/${video.youtubeURL}/sddefault.jpg`}
            size={size}
            shouldScale={shouldScale}
            record={video}
            onSelectVideo={onSelectVideo}
          />
        ))}
      </div>
    </section>
  );
}
