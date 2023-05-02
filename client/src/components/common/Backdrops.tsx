import { SwiperSlide } from 'swiper/react';
import { NavigationSwiper } from '.';
import { tmdbConfigs } from '../../api/configs';
import { IBackdrops } from '../../utils/interfaces';
interface IProps {
  backdrops: IBackdrops[] | undefined;
}
const Backdrops = ({ backdrops }: IProps) => {
  return (
    <NavigationSwiper>
      {backdrops?.slice(0, 10).map((backdrop, index) => (
        <SwiperSlide key={index}>
          <div
            className="bg-cover bg-center-top pt-[60%] "
            style={{
              backgroundImage: `url(${tmdbConfigs.backdropPath(
                backdrop.file_path
              )})`,
            }}
          ></div>
        </SwiperSlide>
      ))}
    </NavigationSwiper>
  );
};

export default Backdrops;
