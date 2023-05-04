import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { IconArrow } from '../icons/IconArrow';

// styles
import styles from './styles.module.scss';

interface Props {
  children: React.ReactNode;
  title?: string;
  isWheel?: boolean;
  titleMargin?: number;
  arrowMargin?: number;
  marginTop?: number;
}

export const Slider = ({ children, ...props }: Props) => {
  const {
    title,
    marginTop = 0,
    titleMargin = 30,
    arrowMargin = 0,
    isWheel = false,
  } = props;

  const refTrack = useRef<HTMLDivElement>(null);
  const refContainer = useRef<HTMLDivElement>(null);
  const refTitle = useRef<HTMLHeadingElement>(null);

  const position = useMotionValue(0);

  const [left, setLeft] = useState(0);
  const [heightTrack, setHeightTrack] = useState(0);
  const [container, setContainer] = useState(0);

  const [isInit, setIsInit] = useState(false);
  const [isDrag, setIsDrag] = useState(false);
  const [isAnimating, setIsAnumating] = useState(false);
  const [isTransition, setIsTransition] = useState(false);

  const initBox = useCallback((widthBox: number) => {
    const windowWidth = window.innerWidth;
    const containerWidth = refContainer.current?.clientWidth || 0;

    const scroll = windowWidth - widthBox;
    const offset = windowWidth - containerWidth;
    const width = scroll - offset;

    setContainer(containerWidth);
    setLeft(width >= 0 ? 0 : width);

    const containerHeight = refTrack.current!.clientHeight;
    const titleHeight = refTitle.current!.clientHeight;

    title
      ? setHeightTrack(containerHeight + titleHeight)
      : setHeightTrack(containerHeight);

    setIsInit(true);
  }, []);

  const handleTrack = useCallback(
    (direction: 'left' | 'right' | null, event?: React.WheelEvent) => {
      let offset = (container / 100) * 80;

      if (event) {
        direction = event.deltaY > 0 ? 'right' : 'left';
        offset = Math.abs(event.deltaY);
      }

      switch (direction) {
        case 'left': {
          const isDeep = position.get() + offset > 0;
          position.set(isDeep ? 0 : position.get() + offset);

          break;
        }

        case 'right': {
          const isDeep = position.get() - offset < left;
          position.set(isDeep ? left : position.get() - offset);

          break;
        }
      }

      setIsAnumating(true);
    },
    [container, left],
  );

  const handleTransition = useCallback(() => {
    const offset = refTrack
      .current!.style['transform'].split(' ')[0]
      .replace(/[^\-\.\d]/g, '');

    position.set(+offset);

    setIsTransition(false);
  }, []);

  useEffect(() => {
    const initHandler = () => setIsInit(false);
    const scrollHandler = (e: any) => e.preventDefault();

    window.addEventListener('resize', initHandler);
    refContainer.current!.addEventListener('mousewheel', scrollHandler);
    refContainer.current!.addEventListener('touchmove', scrollHandler);

    return () => {
      window.removeEventListener('resize', initHandler);
      refContainer.current!.removeEventListener('mousewheel', scrollHandler);
      refContainer.current!.removeEventListener('touchmove', scrollHandler);
    };
  }, []);

  return (
    <section
      className={styles.slider}
      style={{
        height: heightTrack + titleMargin,
        marginTop: `${marginTop}px`,
      }}
    >
      {title && <h1 ref={refTitle}>{title}</h1>}

      <div className={styles.content}>
        <button
          disabled={isAnimating}
          className={position.get() < 0 && !isTransition ? '' : styles.hidden}
          style={{ left: `${arrowMargin}px` }}
          onClick={() => handleTrack('left')}
        >
          <IconArrow direction="left" />
        </button>

        <button
          disabled={isAnimating}
          className={
            position.get() > left && !isTransition ? '' : styles.hidden
          }
          style={{ right: `${arrowMargin}px` }}
          onClick={() => handleTrack('right')}
        >
          <IconArrow direction="right" />
        </button>

        <div ref={refContainer} className={styles.track}>
          <motion.div
            ref={refTrack}
            drag="x"
            onWheel={(e) => {
              if (isWheel) handleTrack(null, e);
            }}
            dragConstraints={{ left, right: 0 }}
            onDragStart={() => {
              setIsDrag(true);
              setIsTransition(true);
            }}
            onDragEnd={() => setIsDrag(false)}
            animate={{ x: position.get() }}
            transition={{ duration: 0.2, type: 'tween' }}
            onDragTransitionEnd={() => handleTransition()}
            onAnimationComplete={() => setIsAnumating(false)}
            onLayoutMeasure={(box) => {
              if (!isInit) initBox(box.x.max - box.x.min);
            }}
            dragElastic={0.1}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 50 }}
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
      </div>
    </section>
  );
};
