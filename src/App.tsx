import { Slider } from './Slider/components/Slider/Slider';
import { Card } from './Slider/components/Card';

import kh_poster from './assets/image/kh_poster.png';
import kh_title from './assets/image/kh_title.png';

import of_poster from './assets/image/of_poster.png';
import of_title from './assets/image/of_title.png';

import ac_poster from './assets/image/ac_poster.png';
import ac_title from './assets/image/ac_title.png';

const mock = [
  { poster: kh_poster, title: kh_title },
  { poster: of_poster, title: of_title },
  { poster: ac_poster, title: ac_title },
  { poster: kh_poster, title: kh_title },
  { poster: of_poster, title: of_title },
  { poster: ac_poster, title: ac_title },
];

export const App = () => (
  <div className="app">
    <Slider
      marginTop={10}
      titleMargin={60}
      arrowMargin={20}
      title="Топ за месяц"
    >
      {mock.map((item, i) => (
        <Card
          key={i + 1}
          position={i + 1}
          poster={item.poster}
          title={item.title}
        />
      ))}
    </Slider>
  </div>
);
