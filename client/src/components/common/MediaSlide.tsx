import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { SwiperSlide } from 'swiper/react';
import { AutoSwiper, MediaItem } from '.';

import { mediaApi } from '../../api/modules';

import { IFilm, IPropsMedias } from '../../utils/interfaces';

const MediaSlide: FC<IPropsMedias> = ({ mediaType, mediaCategory }) => {
  const [medias, setMedias] = useState<IFilm[] | null>();

  useEffect(() => {
    let here = false;

    const getMedias = async () => {
      const { response, error } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      });
      if (!here) {
        if (response) setMedias(response.results);
        if (error) toast.error(error);
      }
    };

    getMedias();
    return () => {
      here = true;
    };
  }, [mediaType, mediaCategory]);
  return (
    <AutoSwiper>
      {medias?.map((media) => (
        <SwiperSlide key={media.id}>
          <MediaItem media={media} mediaType={mediaType} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};
export default MediaSlide;
