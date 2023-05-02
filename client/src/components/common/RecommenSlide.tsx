import React from 'react';
import { SwiperSlide } from 'swiper/react';
import { AutoSwiper, MediaItem } from '.';
import { IFilm } from '../../utils/interfaces';

interface IProps {
  recommens: IFilm[] | undefined;
  mediaType: string | undefined;
}
const RecommenSlide = ({ recommens, mediaType }: IProps) => {
  return (
    <AutoSwiper>
      {recommens?.map((recommen) => (
        <SwiperSlide key={recommen.id}>
          <MediaItem media={recommen} mediaType={mediaType} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default RecommenSlide;
