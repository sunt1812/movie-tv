import { FC, memo, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProgressBar } from '.';

import { tmdbConfigs } from '../../api/configs';
import { mediaApi } from '../../api/modules';
import { setGlobalLoading } from '../../redux/features/globalLoadingSlice';

import { useAppDispatch } from '../../redux/hooks';
import { routesGen } from '../../routes/routes';
import { IFilm, IGenre, IPropsMedias } from '../../utils/interfaces';
import { sortArray } from '../../utils/sort';

const HeroSlide: FC<IPropsMedias> = ({ mediaType, mediaCategory }) => {
  const [movies, setMovies] = useState<IFilm[] | null>();
  const [genres, setGenres] = useState<IGenre[] | null>();

  const dispatch = useAppDispatch();

  const getMedias = useCallback(async () => {
    const { response, error } = await mediaApi.getList({
      mediaType,
      mediaCategory,
      page: 1,
    });
    if (response) setMovies(sortArray(response.results));
    if (error) toast.error(error);
    dispatch(setGlobalLoading(false));
  }, [mediaType, mediaCategory]);

  useEffect(() => {
    let here = false;

    const getGenres = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await mediaApi.getGenres({
        mediaType,
      });
      if (!here) {
        if (response) {
          setGenres(response.genres);
          getMedias();
        }
        if (error) {
          toast.error(error);
          setGlobalLoading(false);
        }
      }
    };
    getGenres();
    return () => {
      here = true;
    };
  }, [mediaType, mediaCategory, dispatch]);

  return (
    <div className="h-screen">
      <Swiper grabCursor={true} loop={true}>
        {movies?.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="relative w-full h-screen">
              <div className="absolute w-full left-0 bottom-0 h-1/3 bg-hero-bottom dark:bg-hero-bottom-dark z-10 pointer-events-none"></div>
              <div className="absolute w-full h-full">
                <img
                  src={tmdbConfigs.backdropPath(
                    movie?.backdrop_path || movie?.poster_path
                  )}
                  className="h-full w-full object-cover"
                  alt=""
                />
              </div>
              <div className="absolute text w-full h-full z-10 bg-hero-light dark:bg-hero-dark"></div>
              <div className="sm:pl-3 md:pl-20 lg:pl-40 h-full flex items-center relative z-20">
                <div className="px-4 lg:px-16- w-full md:w-[48%] ">
                  <h2 className="text-[2rem] lg:text-[4rem] font-bold text-white dark:text-black mb-8 text-line-2">
                    {movie?.name || movie?.title}
                  </h2>
                  <div className="flex items-center gap-3 mb-8">
                    <ProgressBar
                      progress={movie?.vote_average}
                      labelColor="text-black"
                    />
                    <div className="flex items-center gap-2">
                      {movie?.genre_ids?.splice(0, 2).map((genreId, index) => (
                        <button
                          key={index}
                          className="text-white  text-xs py-[10px] px-4 bg-primary rounded-3xl capitalize"
                        >
                          {
                            genres?.find(
                              (el) => el.id === genreId && el.id === genreId
                            )?.name
                          }
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="text-line mb-8 tracking-wider">
                    {movie?.overview}
                  </p>
                  <Link to={routesGen.mediaDetail(mediaType, movie?.id)}>
                    {' '}
                    <button className="btn-primary flex items-center gap-2  bg-primary hover:bg-primary-500">
                      <i className="bx bx-play bx-sm"></i>
                      watch now
                    </button>
                  </Link>
                </div>
                <div className=""></div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default memo(HeroSlide);
