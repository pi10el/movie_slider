import styles from './styles.module.scss';

export const Card = ({ poster, title, position }: ICard) => (
  <div className={styles.content}>
    <h3>{position}</h3>
    <div className={styles.poster}>
      <img src={poster} alt="poster" />
    </div>
    <div className={styles.title}>
      <img src={title} alt="title" />
      <div />
    </div>
  </div>
);
