// components
import { Card } from './Card';
import { Track } from './Track';

export const Slider = ({ movies, params }: ISlider) => (
  // <Track heightTrack={320} titleMargin={60} title="Топ за месяц">
  <Track {...params}>
    {movies.map((item, i) => (
      <Card
        key={i + 1}
        position={i + 1}
        poster={item.poster}
        title={item.title}
      />
    ))}
  </Track>
);
