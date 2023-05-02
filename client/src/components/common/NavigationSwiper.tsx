import { ReactNode } from 'react';
import { Navigation, Pagination } from 'swiper';
import { Swiper } from 'swiper/react';

interface IProps {
  children: ReactNode;
}

const NavigationSwiper = ({ children }: IProps) => {
  return (
    <Swiper
      slidesPerView="auto"
      grabCursor={true}
      pagination={{ clickable: true }}
      navigation={true}
      modules={[Navigation, Pagination]}
      style={{ width: '100%', height: 'max-content' }}
      className="style-swiper"
    >
      {children}
    </Swiper>
  );
};

export default NavigationSwiper;
