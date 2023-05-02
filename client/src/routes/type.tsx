export interface IRoutes {
  index?: boolean;
  path: string;
  element: JSX.Element;
}

export interface IRoutesGen {
  home: string;
  mediaList: (type: string) => string;
  mediaDetail: (type: string | undefined, id: number) => string;
  mediaSearch: string;
  person: (id: number) => string;
  favoriteList: string;
  reviewList: string;
  passwordUpdate: string;
}
