interface ITrack {
  children: React.ReactNode;
  heightTrack: number;
  title?: string;
  titleMargin?: number;
  marginTop?: string;
  containerPadding?: number;
}

interface ICard {
  poster: string;
  title: string;
  position: number;
}

interface ISlider {
  params: Omit<ITrack, 'children'>;
  items: Omit<ICard, 'position'>[];
}
