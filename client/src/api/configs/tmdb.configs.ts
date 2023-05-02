const mediaType = {
  movie: 'movie',
  tv: 'tv',
};

const mediaCategory = {
  popular: 'popular',
  top_rated: 'top_rated',
};

const backdropPath = (imgEndpoint: string | undefined): string =>
  imgEndpoint ? `https://image.tmdb.org/t/p/original${imgEndpoint}` : '';

const posterPath = (imgEndpoint: string | undefined): string =>
  imgEndpoint ? `https://image.tmdb.org/t/p/w500${imgEndpoint}` : '';

const youtubePath = (videoId: string): string =>
  videoId ? `https://www.youtube.com/embed/${videoId}?controls=0` : '';

const tmdbConfigs = {
  mediaType,
  mediaCategory,
  backdropPath,
  posterPath,
  youtubePath,
};

export default tmdbConfigs;
