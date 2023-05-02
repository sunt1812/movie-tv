import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { tmdbConfigs } from '../api/configs';
import reviewApi from '../api/modules/review.api';
import { ButtonLoadMore, Heading } from '../components/common';
import { setGlobalLoading } from '../redux/features/globalLoadingSlice';
import { useAppDispatch } from '../redux/hooks';
import { IReview } from '../utils/interfaces';

interface IPropsReviewListItem {
  review: IReview;
  onRemove: (arg: string) => void;
}
const ReviewListItem = ({ review, onRemove }: IPropsReviewListItem) => {
  const [isRequest, setIsRequest] = useState<boolean>(false);
  const handleRemoveItem = async () => {
    if (isRequest) return;
    setIsRequest(true);
    const { response, error } = await reviewApi.remove({
      reviewId: review._id as number | undefined,
    });
    setIsRequest(false);
    if (error) toast.error(error);
    if (response) onRemove(review._id as string);
  };
  return (
    <div className="">
      <div className="mt-8">
        <div className="flex gap-5 items-start hover:bg-gray-100 p-4 relative">
          <div className="hidden md:flex w-[10%]">
            <img
              src={tmdbConfigs.posterPath(review.mediaPoster)}
              alt={review.mediaTitle}
              className="w"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl mb-2 text-white dark:text-black">
              {review.mediaTitle}
            </span>
            <span className="text-xs mb-4 text-white dark:text-black">
              {dayjs(review.createdAt).format('DD-MM-YYYY HH:mm:ss')}
            </span>
            <p className="text-white dark:text-black mb-2 md:mb-0">
              {review.content}
            </p>
            <div className="">
              <button
                onClick={handleRemoveItem}
                className={`flex gap-2 md:absolute md:top-2 md:right-2 px-6 py-2  text-white rounded mt-2 hover:bg-primary-500 duration-200 ${
                  isRequest ? 'bg-gray-300 pointer-events-none' : 'bg-primary'
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
          </div>
        </div>
      </div>
    </div>
  );
};
const ReviewList = () => {
  const [listReviews, setListReviews] = useState<IReview[]>();
  const [filteredReviews, setFilteredReviews] = useState<IReview[]>();
  const [countReviews, setCountReviews] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const dispatch = useAppDispatch();
  const listReviewsLength = listReviews?.length as number;
  const filteredReviewsLength = filteredReviews?.length as number;
  const skip = 2;

  useEffect(() => {
    const getReviews = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await reviewApi.getList();
      dispatch(setGlobalLoading(false));

      if (error) toast.error(error);
      if (response) setListReviews(response);
      setFilteredReviews([
        ...(filteredReviews || []),
        ...[...response].splice(0, skip),
      ]);
      setCountReviews(response.length as number);
    };
    getReviews();
  }, []);

  const handleButtonLoadMore = () => {
    setFilteredReviews([
      ...(filteredReviews || []),
      ...[...(listReviews || [])].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  const handleRemove = (id: string) => {
    if (listReviews?.findIndex((el) => el._id === id) !== -1) {
      const newReviews = listReviews?.filter((el) => el._id !== id);
      setListReviews(newReviews);
      setFilteredReviews([...(newReviews || [])].splice(0, page * skip));
    } else {
      setFilteredReviews(
        [...(filteredReviews || [])].filter((el) => el._id !== id)
      );
    }

    toast.success('Remove review success');
    setCountReviews((prev) => prev - 1);
  };
  return (
    <main className="p-4 min-h-screen">
      <Heading text={`your reviews (${countReviews})`}>
        {filteredReviews?.map((review, index) => (
          <ReviewListItem review={review} onRemove={handleRemove} key={index} />
        ))}
        {filteredReviewsLength < listReviewsLength && (
          <ButtonLoadMore children="load more" onClick={handleButtonLoadMore} />
        )}
      </Heading>
    </main>
  );
};

export default ReviewList;
