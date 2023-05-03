import { useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
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

  const refTrack = useRef<HTMLDivElement>(null);
  const position = useMotionValue(0);

  const [left, setLeft] = useState(0);
  const [isDrag, setIsDrag] = useState(false);

  const [isButton, setIsButton] = useState(false);
  const [isTransition, setIsTransition] = useState(false);

  const initBox = (widthBox: number) => {
    const windowWidth = window.innerWidth;

    const scroll = windowWidth - widthBox - containerPadding * 2;
    const offset = windowWidth <= 1800 ? 130 : windowWidth - 1710;
    const width = scroll - offset;

    setLeft(width >= 0 ? 0 : width);
  };

  const clickButton = (direction: 'left' | 'right') => () => {
    if (direction === 'left' && position.get() < 0) {
      const isFull = position.get() + 500 > 0;

      position.set(isFull ? 0 : position.get() + 700);
    }

    if (direction == 'right' && position.get() > left) {
      const isFull = position.get() - 500 < left;

      position.set(isFull ? left : position.get() - 700);
    }

    setIsButton(true);

    setTimeout(() => setIsButton(false), 500);
  };

  return (
    <section
      className={styles.slider}
      style={{
        height: heightTrack + titleMargin + (title ? 40 : 0),
        marginTop,
      }}
    >
      {title && <h1>{title}</h1>}

      <div className={styles.content}>
        <button
          disabled={isButton && isTransition}
          onClick={clickButton('left')}
        >
          <IconArrow direction="left" />
        </button>

        <div className={styles.track}>
          <motion.div
            ref={refTrack}
            drag="x"
            dragConstraints={{ left, right: 0 }}
            onDragStart={() => {
              setIsDrag(true);
              setIsTransition(true);
            }}
            onDragEnd={() => setIsDrag(false)}
            animate={isButton && { x: position.get() }}
            onDragTransitionEnd={() => {
              const offset = refTrack
                .current!.style['transform'].split(' ')[0]
                .replace(/[^\-\.\d]/g, '');

              position.set(+offset || 0);

              setIsTransition(false);
            }}
            onLayoutMeasure={(box) => {
              initBox(box.x.max - box.x.min);
            }}
            dragElastic={0.1}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 40 }}
            style={{
              position: 'absolute',
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
        </div>

        <button
          disabled={isButton && isTransition}
          onClick={clickButton('right')}
        >
          <IconArrow direction="right" />
        </button>
      </div>
    </section>
  );
};
