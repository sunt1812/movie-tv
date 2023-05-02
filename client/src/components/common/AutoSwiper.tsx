import { ReactNode } from 'react';
import { Swiper } from 'swiper/react';
interface IProps {
  children: ReactNode;
  spaceBetween?: number;
}
const AutoSwiper = ({ children, spaceBetween = 0 }: IProps) => {
  return (
    <Swiper
      spaceBetween={spaceBetween}
      slidesPerView="auto"
      grabCursor={true}
      style={{ width: '100%', height: 'max-content' }}
      className="auto-swiper"
    >
      {children}
    </Swiper>
  );
};

export default AutoSwiper;
