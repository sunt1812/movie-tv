import { useEffect, useRef } from 'react';

import { SwiperSlide } from 'swiper/react';
import { NavigationSwiper } from '.';
import { tmdbConfigs } from '../../api/configs';
import { IVideoResults } from '../../utils/interfaces';
interface IProps {
  videos: IVideoResults[] | undefined;
}
const VideoSlide = ({ videos }: IProps) => {
  return (
    <NavigationSwiper>
      {videos?.slice(0, 5).map((video) => (
        <SwiperSlide key={video.id}>
          <Video video={video} />
        </SwiperSlide>
      ))}
    </NavigationSwiper>
  );
};

export default VideoSlide;

interface IPropsVideo {
  video: IVideoResults;
}

export const Video = ({ video }: IPropsVideo) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const height = (iframeRef.current!.offsetWidth * 9) / 16 + 'px';
    iframeRef.current!.setAttribute('height', height);
  }, [video]);

  return (
    <iframe
      ref={iframeRef}
      src={tmdbConfigs.youtubePath(video.key)}
      width="100%"
      title={video.id}
      style={{ border: 0 }}
    ></iframe>
  );
};
