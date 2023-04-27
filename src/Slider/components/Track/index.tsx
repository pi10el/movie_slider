import { useState } from 'react';
import { motion } from 'framer-motion';
import { IconArrow } from '../icons/IconArrow';

// styles
import styles from './styles.module.scss';

export const Track = ({ children, ...props }: ITrack) => {
  const {
    title,
    heightTrack,
    marginTop,
    titleMargin = 30,
    containerPadding = 0,
  } = props;

  const [position, setPosition] = useState(0);
  const [isDrag, setIsDrag] = useState(false);

  const initBox = (widthBox: number) => {
    const windowWidth = window.innerWidth;

    const scroll = windowWidth - widthBox - containerPadding * 2;
    const offset = windowWidth <= 1800 ? 130 : windowWidth - 1710;
    const width = scroll - offset;

    setPosition(width >= 0 ? 0 : width);
  };

  return (
    <section
      className={styles.track}
      style={{
        height: heightTrack + titleMargin + (title ? 40 : 0),
        marginTop,
      }}
    >
      {title && <h1>{title}</h1>}
      <div className={styles.overlay}>
        <div className={styles.arrows}>
          <IconArrow direction="left" />
          <IconArrow direction="right" />
        </div>
      </div>
      <motion.div
        drag="x"
        dragConstraints={{ left: position, right: 0 }}
        onDragStart={() => setIsDrag(true)}
        onDragEnd={() => setIsDrag(false)}
        onLayoutMeasure={(box) => {
          initBox(box.x.max - box.x.min);
        }}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 40 }}
        style={{
          position: 'absolute',
          left: '45px',
        }}
      >
        <div
          style={{
            display: 'flex',
            marginTop: `${titleMargin}px`,
            pointerEvents: isDrag ? 'none' : 'all',
          }}
        >
          {children}
        </div>
      </motion.div>
    </section>
  );
};
