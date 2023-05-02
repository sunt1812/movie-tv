// interface params data
export interface IMediaParams {
  mediaType?: string;
  mediaCategory?: string;
  page?: number;
  mediaId?: number;
  query?: string;
}
// interface response data
export interface IMediaResponse {
  page: number;
  results: IFilm[];
  total_pages: number;
  total_results: number;
}

export interface IGenreResponse {
  genres: IGenre[];
}

export interface IPersonResponse {
  biography: string;
  birthday: string;
  name: string;
  profile_path: string;
}
export interface IPersonMediasResponse {
  cast: ICast[] | undefined;
  id: number;
}
export interface IUpdatePassword {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}
export interface ILogin {
  username: string;
  password: string;
}
export interface IUser extends ILogin {
  displayName?: string;
  confirmPassword?: string;
  token?: string;
  salt?: string;
  _id?: string;
}
// interface params person
export interface IPersonParams {
  personId: string | undefined;
}

// interface Props Medias
export interface IPropsMedias {
  mediaType: string | undefined;
  mediaCategory: string;
}
//  interface media
export interface IFilm {
  backdrop_path: string;
  first_air_date?: string;
  release_date?: string;
  genre_ids: number[];
  id: number;
  name?: string;
  title?: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  profile_path: string;
}

// interface genre detail
export interface IGenre {
  id: number;
  name: string;
}

// interface credits detail
export interface ICast extends IFilm {
  adult: boolean;
  gender: number;
  id: number;
  profile_path: string;
  name: string;
  media_type: string;
}
export interface ICredits {
  id?: number | undefined;
  cast?: ICast[] | undefined;
}

// interface video detail
export interface IVideoResults {
  key: string;
  id: string;
}
export interface IVideos {
  id?: number | undefined;
  results?: IVideoResults[] | undefined;
}

// interface images detail
export interface IBackdrops {
  file_path: string;
}
export interface IPosters {
  file_path: string;
}
export interface IImages {
  id?: number | undefined;
  backdrops?: IBackdrops[] | undefined;
  posters?: IPosters[] | undefined;
}

//  interface Recommens detail

export interface IRecommens {
  results?: IFilm[] | undefined;
}

export interface IMediaTypeDetail extends IFilm {
  imdb_id: string;
  original_language: string;
  genres: IGenre[];

  video: boolean;
  credits?: ICredits;
  videos?: IVideos;
  images?: IImages;
  recommens?: IRecommens;
  isFavorite?: boolean;
  reviews?: IReview[];
}
// favorite

export interface IMediaId {
  mediaId: number | undefined;
}
export interface IFavorite extends IMediaId {
  mediaType: string | undefined;
  mediaTitle: string | undefined;
  mediaPoster: string | undefined;
  mediaRate: number | undefined;
  user?: IUser;
}

export interface IReview {
  mediaId: number | undefined;
  _id?: string | undefined;
  content: string | undefined;
  mediaType: string | undefined;
  mediaTitle: string | undefined;
  mediaPoster: string | undefined;
  mediaRate: number | undefined;
  user?: IUser;
  createdAt?: string;
}
