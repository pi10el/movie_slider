import { Slider } from './Slider';

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
      movies={mock}
      params={{ heightTrack: 320, title: 'Топ за месяц', titleMargin: 60 }}
    />
  </div>
);
