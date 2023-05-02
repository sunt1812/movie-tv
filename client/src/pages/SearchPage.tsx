import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { mediaApi } from '../api/modules';

import { Button, ButtonLoadMore, MediaItem } from '../components/common';
import { IFilm } from '../utils/interfaces';
const tabsSearch = ['movie', 'tv', 'people'];
let timer: any;
const timeout = 50;
const SearchPage = () => {
  const [mediaType, setMediaType] = useState<string>('movie');
  const [searchMedias, setSearchMedias] = useState<IFilm[]>();
  const [value, setValue] = useState<string>('');
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const [page, setPage] = useState(1);

  const search = useCallback(async () => {
    setLoadingButton(true);
    const { search, error } = await mediaApi.search({
      mediaType,
      page,
      query: value,
    });
    setLoadingButton(false);
    if (search) {
      page > 1
        ? setSearchMedias((prev) => [...(prev || []), ...search.results])
        : setSearchMedias([...search.results]);
    }

    error && toast.error(error);
  }, [mediaType, value, page]);

  useEffect(() => {
    if (value.trim().length === 0) {
      setSearchMedias([]);
      setPage(1);
    } else search();
  }, [search, mediaType, value, page]);

  useEffect(() => {
    setSearchMedias([]);
    setPage(1);
  }, [mediaType]);

  const handleClickButton = (mediatype: string) => {
    setMediaType(mediatype);
  };

  const handleOnChangeInput = (e: any) => {
    const newQuery = e.target.value;
    clearTimeout(timer);
    timer = setTimeout(() => {
      setValue(newQuery);
    }, timeout);
  };
  const handleButton = () => {
    setPage((prev) => prev + 1);
  };
  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="flex items-center justify-center gap-3 mb-4">
        {tabsSearch.map((tab, index) => (
          <Button
            key={index}
            children={tab}
            clasName={
              tab !== mediaType
                ? 'bg-transparent hover:bg-transparent text-base'
                : 'text-base'
            }
            onClick={() => handleClickButton(tab)}
          />
        ))}
      </div>

      <div className=" w-full mb-8">
        <input
          type="text"
          value={value}
          onChange={(e) => handleOnChangeInput(e)}
          placeholder="Search MovieTV"
          className="w-full p-4 bg-transparent outline-none border-gray-300 border-2  hover:border-2 hover:border-white   focus:border-fern focus-within:border-fern  rounded-sm"
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {searchMedias?.map((search, index) => (
          <MediaItem key={index} media={search} mediaType={mediaType} />
        ))}
      </div>
      {(searchMedias?.length as number) > 0 ? (
        loadingButton ? (
          <div className="loader mx-auto my-8"></div>
        ) : (
          <ButtonLoadMore onClick={handleButton} children="Load more" />
        )
      ) : (
        ''
      )}
    </div>
  );
};

export default SearchPage;
