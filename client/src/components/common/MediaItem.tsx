import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProgressBar } from '.';
import { tmdbConfigs } from '../../api/configs';
import { routesGen } from '../../routes/routes';
import { IFilm } from '../../utils/interfaces';

interface IProps {
  media: IFilm;
  mediaType: string | undefined;
}
const MediaItem = ({ media, mediaType }: IProps) => {
  const [title, setTitle] = useState<string | undefined>('');
  const [posterPath, setPosterPath] = useState('');
  const [releaseDate, setReleaseDate] = useState<string | undefined>('');
  const [rate, setRate] = useState<number>(0);

  useEffect(() => {
    setTitle(media.title || media.name);

    setPosterPath(
      tmdbConfigs.posterPath(
        media.poster_path || media.backdrop_path || media.profile_path
      )
    );

    if (mediaType === tmdbConfigs.mediaType.movie) {
      setReleaseDate(media.release_date && media.release_date.split('-')[0]);
    } else {
      setReleaseDate(
        media.first_air_date && media.first_air_date.split('-')[0]
      );
    }

    setRate(media.vote_average);
  }, [media, mediaType]);
  return (
    <Link
      to={
        mediaType !== 'people'
          ? routesGen.mediaDetail(mediaType, media?.id)
          : routesGen.person(media?.id)
      }
    >
      <div
        className="relative bg-cover bg-center pt-[160%]"
        style={{
          backgroundImage: `url(${posterPath})`,
        }}
      >
        {mediaType !== 'people' ? (
          <div className="group absolute w-full h-full top-0 left-0 bg-media-slide z-10 opacity-0 hover:opacity-100 overflow-hidden hover:overflow-visible duration-200">
            <button className="hidden group-hover:block btn-primary px-6 py-1 bg-primary hover:bg-primary-500 duration-200 absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <i className="bx bx-play bx-sm"></i>
            </button>
            <div className="absolute left-0 bottom-0 w-full p-4 translate-y-[20%] group-hover:translate-y-0 duration-500">
              <ProgressBar progress={rate} />
              <div className="text-white my-4">{releaseDate}</div>
              <p className="text-white  mb-4">{title}</p>
            </div>
          </div>
        ) : (
          <div className="absolute z-10 left-0 bottom-0 w-full p-[10px] bg-black-300">
            <span className="text-base text-white">{title}</span>
          </div>
        )}
      </div>
    </Link>
  );
};
export default MediaItem;
