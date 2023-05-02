import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { mediaApi } from '../api/modules';
import {
  Button,
  ButtonLoadMore,
  HeroSlide,
  MediaItem,
} from '../components/common';
import usePrevious from '../hooks/usePrevious';

import { IFilm } from '../utils/interfaces';

function MediaList() {
  const { mediaType } = useParams();

  const prevMediaType = usePrevious(mediaType as string);

  const [listMedias, setListMedias] = useState<IFilm[] | undefined>();
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const [category, setCategory] = useState<string>('popular');
  const [page, setPage] = useState(1);

  const Categorys = useMemo(() => {
    return ['popular', 'top_rated'];
  }, []);

  useEffect(() => {
    let here = false;
    const getLists = async () => {
      setLoadingButton(true);
      const { response, error } = await mediaApi.getList({
        mediaType,
        mediaCategory: category,
        page,
      });
      setLoadingButton(false);
      if (!here) {
        if (response) {
          page !== 1
            ? setListMedias([...(listMedias || []), ...response.results])
            : setListMedias(response.results);
        }
        if (error) toast.error(error);
      }
    };

    getLists();
    if (mediaType !== prevMediaType) {
      setPage(1);
    }
    return () => {
      here = true;
    };
  }, [mediaType, category, page, prevMediaType]);

  const handleCategory = (cate: string): void => {
    setPage(1);
    setCategory(cate);
  };
  const handleButton = () => {
    setPage((prev) => prev + 1);
  };
  return (
    <>
      <HeroSlide mediaType={mediaType} mediaCategory={category} />

      <div className="p-4">
        <div className="mb-8 flex flex-col md:flex-row items-center justify-center md:justify-between gap-5">
          <p className="capitalize text-white dark:text-black text-2xl font-bold">
            {mediaType === 'movie' ? 'movies' : 'tv series'}
          </p>
          <div className="flex gap-5">
            {Categorys.map((cate, index) => (
              <Button
                key={index}
                children={cate}
                clasName={
                  cate !== category ? 'bg-transparent hover:bg-transparent' : ''
                }
                onClick={() => handleCategory(cate)}
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[10px] ">
          {listMedias?.map((listMedia, index) => (
            <MediaItem key={index} media={listMedia} mediaType={mediaType} />
          ))}
        </div>
        {loadingButton ? (
          <div className="loader mx-auto mt-8"></div>
        ) : (
          <ButtonLoadMore onClick={handleButton} children="Load more" />
        )}
      </div>
    </>
  );
}

export default MediaList;
