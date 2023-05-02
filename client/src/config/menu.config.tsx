import {
  faFilm,
  faHeart,
  faHouse,
  faLocationPinLock,
  faMagnifyingGlass,
  faPenToSquare,
  faTv,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const menuData = [
  { path: '/', name: 'home', icon: <FontAwesomeIcon icon={faHouse} /> },
  { path: '/movie', name: 'movies', icon: <FontAwesomeIcon icon={faFilm} /> },
  { path: '/tv', name: 'tv series', icon: <FontAwesomeIcon icon={faTv} /> },
  {
    path: '/search',
    name: 'search',
    icon: <FontAwesomeIcon icon={faMagnifyingGlass} />,
  },
];

export const userData = [
  {
    path: '/favorites',
    name: 'favorites',
    icon: <FontAwesomeIcon icon={faHeart} />,
  },
  {
    path: '/reviews',
    name: 'reviews',
    icon: <FontAwesomeIcon icon={faPenToSquare} />,
  },
  {
    path: '/password-update',
    name: 'passwor update',
    icon: <FontAwesomeIcon icon={faLocationPinLock} />,
  },
];
