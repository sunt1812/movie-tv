import { FC } from 'react';
import { Link } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import { AutoSwiper } from '.';
import { tmdbConfigs } from '../../api/configs';
import { routesGen } from '../../routes/routes';
import { ICast } from '../../utils/interfaces';
interface IProps {
  casts: ICast[] | undefined;
}
const Cast: FC<IProps> = ({ casts }) => {
  return (
    <AutoSwiper spaceBetween={10}>
      {casts?.map((cast) => (
        <SwiperSlide key={cast.id}>
          <CastItem cast={cast} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default Cast;

interface IPropsCastItem {
  cast: ICast;
}
export const CastItem = ({ cast }: IPropsCastItem) => (
  <Link to={routesGen.person(cast.id)}>
    <div
      className=" bg-cover bg-center pt-[120%]"
      style={{
        backgroundImage: `url(${tmdbConfigs.posterPath(cast.profile_path)})`,
      }}
    >
      <div className="absolute z-10 left-0 bottom-0 w-full p-[10px] bg-black-300">
        <span className="text-base text-white">{cast.name}</span>
      </div>
    </div>
  </Link>
);
