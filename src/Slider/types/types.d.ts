interface ITrack {
  children: React.ReactNode;
  title?: string;
  titleMargin?: number;
  arrowMargin?: number;
  marginTop?: number;
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
