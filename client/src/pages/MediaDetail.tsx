import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { tmdbConfigs } from '../api/configs';
import { mediaApi } from '../api/modules';
import favoriteApi from '../api/modules/favorite.api';
import {
  Backdrops,
  Cast,
  Heading,
  MediaReview,
  MediaSlide,
  Posters,
  ProgressBar,
  RecommenSlide,
  VideoSlide,
} from '../components/common';
import { setOpenModal } from '../redux/features/authModalSlice';
import {
  addFavorite,
  removeFavorite,
  selectAuthSlice,
} from '../redux/features/authSlice';
import { setGlobalLoading } from '../redux/features/globalLoadingSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

import { IMediaParams, IMediaTypeDetail } from '../utils/interfaces';

function MediaDetail() {
  const { mediaType, mediaId }: IMediaParams = useParams();
  const [detail, setDetail] = useState<IMediaTypeDetail | undefined>();
  const [isRequest, setIsRequest] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>();
  const { user } = useAppSelector(selectAuthSlice);

  const dispatch = useAppDispatch();

  const bgMediaDetail: string = tmdbConfigs.backdropPath(
    detail?.backdrop_path || detail?.poster_path
  );

  useEffect(() => {
    let here = false;
    window.scrollTo(0, 0);
    const getDetail = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await mediaApi.getDetail({
        mediaType,
        mediaId,
      });
      dispatch(setGlobalLoading(false));
      if (!here) {
        if (response) setDetail(response);
        setIsFavorite(response?.isFavorite);
        if (error) toast.error(error);
      }
    };
    getDetail();
    return () => {
      here = true;
    };
  }, [mediaType, mediaId, dispatch]);

  const handleClickFavorite = async () => {
    if (!user) return dispatch(setOpenModal(true));
    setIsRequest(true);
    const body = {
      mediaType,
      mediaId: detail?.id,
      mediaTitle: detail?.name || detail?.title,
      mediaPoster: detail?.poster_path || detail?.backdrop_path,
      mediaRate: detail?.vote_average,
    };
    const { response, error } = await favoriteApi.add(body);
    setIsRequest(false);
    if (error) toast.error(error);
    if (response) {
      dispatch(addFavorite(response));
      setIsFavorite(true);
      toast.success('Add favorite success');
    }
  };
  const handleClickremove = async () => {
    setIsRequest(true);
    const { response, error } = await favoriteApi.remove({
      mediaId: detail?.id,
    });
    setIsRequest(false);
    if (error) toast.error(error);
    if (response) dispatch(removeFavorite({ mediaId: detail?.id }));
    setIsFavorite(false);
    toast.success('Remove favorite success');
  };
  return (
    <>
      {/* bg detail */}
      <div
        className="relative pt-[60%] sm:pt-[40%] md:pt-[35%] -z-10 bg-center-top bg-cover bg-fixed"
        style={{
          backgroundImage: `url(${bgMediaDetail})`,
        }}
      >
        <div className="absolute left-0 top-0 w-full h-full bg-hero-bottom dark:bg-hero-bottom-dark"></div>
      </div>
      {/* bg detail */}

      {/* section main */}
      <div className="p-5">
        {/*section hero detail */}
        <div className="h-full flex flex-col md:flex-row items-start gap-8 relative z-20 -mt-40 md:-mt-60 lg:-mt-80">
          <div className="w-[70%] sm:w-1/2 md:w-[40%] mx-auto mb-8">
            <div
              className=" pt-[140%] bg-cover bg-center"
              style={{
                backgroundImage: `url(${tmdbConfigs.posterPath(
                  detail?.poster_path
                )})`,
              }}
            ></div>
          </div>
          <div className="w-full md:w-[60%] ">
            <h2 className="text-[2rem] lg:text-[4rem] font-bold text-white dark:text-black mb-8">
              {detail?.name || detail?.title}{' '}
              {detail?.release_date?.split('-')[0] ||
                detail?.first_air_date?.split('-')[0]}
            </h2>
            <div className="flex items-center gap-3 mb-8">
              <ProgressBar
                progress={detail?.vote_average}
                labelColor="text-black"
              />
              <div className="flex items-center gap-2">
                {detail?.genres.slice(0, 2).map((genre, index) => (
                  <button
                    key={index}
                    className="text-white  text-xs py-[10px] px-4 bg-primary rounded-3xl capitalize"
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-line-5 mb-8">{detail?.overview}</p>
            <div className="flex items-center gap-3">
              {isFavorite ? (
                // favoriteed
                <button onClick={handleClickremove}>
                  {isRequest ? (
                    <div className="loader mx-auto"></div>
                  ) : (
                    <i className="bx bxs-heart bx-sm text-primary"></i>
                  )}
                </button>
              ) : (
                // favorite
                <button onClick={handleClickFavorite}>
                  {isRequest ? (
                    <div className="loader mx-auto"></div>
                  ) : (
                    <i className="bx bx-heart bx-sm text-primary"></i>
                  )}
                </button>
              )}
              <button className="btn-primary flex items-center gap-2  bg-primary hover:bg-primary-500">
                <i className="bx bx-play bx-sm"></i>
                watch now
              </button>
            </div>
            <Heading text="cast" clasName="mt-[2.5rem]">
              <Cast casts={detail?.credits?.cast} />
            </Heading>
          </div>
        </div>
        {/*section hero detail */}

        {/* section video */}
        <Heading text="videos">
          <VideoSlide videos={detail?.videos?.results} />
        </Heading>
        {/* section video */}

        {/* section backdrops */}
        <Heading text="backdrops">
          <Backdrops backdrops={detail?.images?.backdrops} />
        </Heading>
        {/* section backdrops */}

        {/* section posters */}
        <Heading text="posters">
          <Posters posters={detail?.images?.posters} />
        </Heading>
        {/* section posters */}

        {/* section reviews */}
        <MediaReview
          reviews={detail?.reviews}
          detail={detail}
          mediaType={mediaType}
        />

        {/* section reviews */}

        {/* section RecommenSlide */}
        <Heading text="YOU MAY ALSO LIKE">
          {detail?.recommens?.results?.length === 0 ? (
            <MediaSlide
              mediaType={mediaType}
              mediaCategory={tmdbConfigs.mediaCategory.top_rated}
            />
          ) : (
            <RecommenSlide
              recommens={detail?.recommens?.results}
              mediaType={mediaType}
            />
          )}
        </Heading>
        {/* section RecommenSlide */}
      </div>
      {/* section main */}
    </>
  );
}

export default MediaDetail;
