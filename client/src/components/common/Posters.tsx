import { SwiperSlide } from 'swiper/react';
import { AutoSwiper } from '.';
import { tmdbConfigs } from '../../api/configs';
import { IPosters } from '../../utils/interfaces';

interface IProps {
  posters: IPosters[] | undefined;
}
const Posters = ({ posters }: IProps) => {
  return (
    <AutoSwiper>
      {posters?.slice(0, 10).map((poster, index) => (
        <SwiperSlide key={index}>
          <div
            className="bg-cover bg-center pt-[140%]"
            style={{
              backgroundImage: `url(${tmdbConfigs.posterPath(
                poster.file_path
              )})`,
            }}
          ></div>
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default Posters;
