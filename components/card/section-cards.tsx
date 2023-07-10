import Card from './card';
import Link from 'next/link';
import clsx from 'classnames';
import styles from './section-cards.module.css';

interface Video {
  id: string;
  imgUrl: string;
}

interface SectionCardsProps {
  title: string;
  videos: Video[];
  size?: 'large' | 'medium' | 'small';
  shouldWrap?: boolean;
  shouldScale?: boolean;
}

export default function SectionCards(props: SectionCardsProps) {
  const { title, videos = [], size, shouldWrap = false, shouldScale } = props;

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={clsx(styles.cardWrapper, shouldWrap && styles.wrap)}>
        {videos.map((video, idx) => (
          <Link href={`/video/${video.id}`} key={video.id}>
            <a>
              <Card
                id={idx}
                imgUrl={video.imgUrl}
                size={size}
                shouldScale={shouldScale}
              />
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
};
