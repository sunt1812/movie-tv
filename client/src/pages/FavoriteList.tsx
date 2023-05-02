import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { tmdbConfigs } from '../api/configs';
import favoriteApi from '../api/modules/favorite.api';
import { ButtonLoadMore, Heading, ProgressBar } from '../components/common';
import { removeFavorite } from '../redux/features/authSlice';
import { setGlobalLoading } from '../redux/features/globalLoadingSlice';
import { useAppDispatch } from '../redux/hooks';
import { routesGen } from '../routes/routes';
import { IFavorite } from '../utils/interfaces';

interface IPropsFavoriteItem {
  favorite: IFavorite;
  onRemoved: (arg: any) => void;
}
const FavoriteItem = ({ favorite, onRemoved }: IPropsFavoriteItem) => {
  const [isRequest, setIsRequest] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleRemove = async () => {
    if (isRequest) return;
    setIsRequest(true);
    const { response, error } = await favoriteApi.remove({
      mediaId: favorite.mediaId,
    });
    setIsRequest(false);
    if (response) toast.success('Remove favorite success');

    dispatch(removeFavorite({ mediaId: favorite.mediaId }));
    onRemoved(favorite.mediaId);
    if (error) toast.error(error);
  };
  return (
    <div className="flex flex-col">
      <Link
        to={routesGen.mediaDetail(
          favorite.mediaType,
          favorite.mediaId as number
        )}
      >
        <div
          className="relative bg-cover bg-center pt-[160%]"
          style={{
            backgroundImage: `url(${tmdbConfigs.posterPath(
              favorite.mediaPoster
            )})`,
          }}
        >
          <div className="group absolute w-full h-full top-0 left-0 bg-media-slide z-10 opacity-0 hover:opacity-100 overflow-hidden hover:overflow-visible duration-200">
            <button className="hidden group-hover:block btn-primary px-6 py-1 bg-primary hover:bg-primary-500 duration-200 absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <i className="bx bx-play bx-sm"></i>
            </button>
            <div className="absolute left-0 bottom-0 w-full p-4 translate-y-[20%] group-hover:translate-y-0 duration-500">
              <ProgressBar progress={favorite.mediaRate} />
              <p className="text-white  mt-8">{favorite.mediaTitle}</p>
            </div>
          </div>
        </div>
      </Link>
      <button
        onClick={handleRemove}
        className={`flex justify-center items-center gap-2 w-full py-2  text-white rounded mt-2 hover:bg-primary-500 duration-200 ${
          isRequest ? '!bg-gray-300 pointer-events-none' : 'bg-primary'
        }`}
      >
        {isRequest ? (
          <div className="loader "></div>
        ) : (
          <FontAwesomeIcon icon={faTrash} />
        )}
        remove
      </button>
    </div>
  );
};

const FavoriteList = () => {
  const [favorites, setFavorites] = useState<IFavorite[]>();
  const [filteredFavorites, setFilteredFavorites] = useState<IFavorite[]>();
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const skip = 8;
  const isFilteredFavorites = filteredFavorites?.length as number;
  const isFavorites = favorites?.length as number;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getFavorites = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await favoriteApi.getList();
      dispatch(setGlobalLoading(false));
      if (response) setFavorites(response);
      setFilteredFavorites([...response].splice(0, skip));
      setCount(response.length as number);
      if (error) toast.error(error);
    };
    getFavorites();
  }, []);

  const handleButtonLoadMore = () => {
    setFilteredFavorites([
      ...(filteredFavorites || []),
      ...[...(favorites || [])].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  const handleRemove = (medaiId: number) => {
    const newFavorite = [...(favorites || [])].filter(
      (el) => el.mediaId !== medaiId
    );
    setFavorites(newFavorite);
    setFilteredFavorites([...newFavorite].splice(0, page * skip));
    setCount((prev) => prev - 1);
  };
  return (
    <main className="p-4 min-h-screen pb-20">
      <Heading text={`YOUR FAVORITES (${count})`}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {filteredFavorites?.map((favorite) => (
            <FavoriteItem
              key={favorite.mediaId}
              favorite={favorite}
              onRemoved={handleRemove}
            />
          ))}
        </div>
        {isFilteredFavorites < isFavorites && (
          <ButtonLoadMore children="load more" onClick={handleButtonLoadMore} />
        )}
      </Heading>
    </main>
  );
};

export default FavoriteList;
