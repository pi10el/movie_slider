// components
import { Card } from './Card';
import { Track } from './Track';

export const Slider = ({ items, params }: ISlider) => (
  <Track {...params}>
    {items.map((item, i) => (
      <Card
        key={i + 1}
        position={i + 1}
        poster={item.poster}
        title={item.title}
      />
    ))}
  </Track>
);
