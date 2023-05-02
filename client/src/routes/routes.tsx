import {
  HomePage,
  PersonDetail,
  SearchPage,
  PasswordUpdate,
  FavoriteList,
  ReviewList,
  MediaList,
  MediaDetail,
} from '../pages';
import { IRoutes, IRoutesGen } from './type';

const routes: IRoutes[] = [
  {
    index: true,
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/person/:personId',
    element: <PersonDetail />,
  },
  {
    path: '/search',
    element: <SearchPage />,
  },
  {
    path: '/password-update',
    element: <PasswordUpdate />,
  },
  {
    path: '/favorites',
    element: <FavoriteList />,
  },
  {
    path: '/reviews',
    element: <ReviewList />,
  },
  {
    path: '/:mediaType',
    element: <MediaList />,
  },
  {
    path: '/:mediaType/:mediaId',
    element: <MediaDetail />,
  },
];

export default routes;
export const routesGen: IRoutesGen = {
  home: '/',
  mediaList: (type) => `/${type}`,
  mediaDetail: (type, id) => `/${type}/${id}`,
  mediaSearch: '/search',
  person: (id) => `/person/${id}`,
  favoriteList: '/favorites',
  reviewList: '/reviews',
  passwordUpdate: 'password-update',
};
