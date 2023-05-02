import { faPaperPlane, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { string } from 'yup';
import { ButtonLoadMore, Heading, TextAvatar } from '.';
import reviewApi from '../../api/modules/review.api';
import { selectAuthSlice } from '../../redux/features/authSlice';
import { useAppSelector } from '../../redux/hooks';
import { IMediaTypeDetail, IReview, IUser } from '../../utils/interfaces';

interface IProps {
  reviews: IReview[] | undefined;
  mediaType: string | undefined;
  detail: IMediaTypeDetail | undefined;
}
const MediaReview = ({ reviews, mediaType, detail }: IProps) => {
  const { user } = useAppSelector(selectAuthSlice);
  const [content, setContent] = useState<string>('');
  const [listReviews, setlistReviews] = useState<IReview[]>();
  const [fitteredReviews, setFitteredReviews] = useState<IReview[]>();
  const [reviewCount, setReviewCount] = useState<number>(0);
  const [isRequest, setIsRequest] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const skip = 4;
  const reviewsLg = listReviews?.length as number;
  const fitteredReviewsLg = fitteredReviews?.length as number;

  useEffect(() => {
    setlistReviews([...(reviews || [])]);
    setFitteredReviews([...(reviews || [])].splice(0, skip));
    setReviewCount(reviews?.length as number);
  }, [reviews]);

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isRequest) return;
    setIsRequest(true);
    const body = {
      mediaId: detail?.id,
      content,
      mediaType,
      mediaTitle: detail?.title || detail?.name,
      mediaPoster: detail?.poster_path,
      mediaRate: detail?.vote_average,
    };
    const { response, error } = await reviewApi.add(body);
    setIsRequest(false);
    if (error) toast.error(error);
    if (response) toast.success('Post review success');
    setFitteredReviews([...(fitteredReviews || []), response]);
    setReviewCount((prev) => prev + 1);
    setContent('');
  };

  const handleButtonLoadMore = () => {
    setFitteredReviews([
      ...(fitteredReviews || []),
      ...[...(reviews || [])].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  const handleRemove = (id: string | undefined) => {
    if (listReviews?.findIndex((el) => el._id === id) !== -1) {
      const newReview = [...(listReviews || [])].filter((el) => el._id !== id);
      setlistReviews(newReview);
      setFitteredReviews([...newReview].splice(0, page * skip));
    } else {
      setFitteredReviews(
        [...(fitteredReviews || [])].filter((el) => el._id !== id)
      );
    }
    setReviewCount((prev) => prev - 1);
    toast.success('Remove review success');
  };

  return (
    <Heading text={`reviews (${reviewCount})`}>
      {/* review */}
      <>
        {fitteredReviews?.map((review, index) =>
          review?.user ? (
            <MediaReviewItem
              key={index}
              review={review}
              onRemove={handleRemove}
            />
          ) : null
        )}
        {fitteredReviewsLg < reviewsLg && (
          <ButtonLoadMore children="load more" onClick={handleButtonLoadMore} />
        )}
      </>
      {/* review */}
      {/* form review */}
      {user && (
        <>
          {' '}
          <hr className="w-full border border-gray-100 my-8" />
          <div className="flex items-center gap-3">
            <TextAvatar text={user?.displayName as string}></TextAvatar>
            <p className="text-xl">{user?.displayName}</p>
          </div>
          <form className="w-full pl-10 mt-4 " onSubmit={handleSubmitForm}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-32 p-3 bg-transparent  outline-none mb-3 hover:border-gray border border-gray-100 rounded focus:border-primary focus-within:border-primary"
              placeholder="write your review"
            ></textarea>
            <button
              type="submit"
              className={`flex justify-center capitalize items-center gap-2 px-6 py-3 text-white rounded mt-2 hover:bg-primary-500 duration-200 ${
                isRequest ? '!bg-gray-300 pointer-events-none' : 'bg-primary'
              }`}
            >
              {isRequest ? (
                <div className="loader "></div>
              ) : (
                <FontAwesomeIcon icon={faPaperPlane} />
              )}
              post
            </button>
          </form>
        </>
      )}
      {/* form review */}
    </Heading>
  );
};

export default MediaReview;

interface IPropsMediaReviewItem {
  review: IReview;
  onRemove: (arg: string | undefined) => void;
}

const MediaReviewItem = ({ review, onRemove }: IPropsMediaReviewItem) => {
  const [isRequest, setIsRequest] = useState<boolean>(false);
  const { user } = useAppSelector(selectAuthSlice);

  const handleRemoveItem = async () => {
    if (isRequest) return;
    setIsRequest(true);
    const { response, error } = await reviewApi.remove({
      reviewId: review._id as number | undefined,
    });
    setIsRequest(false);
    if (error) toast.error(error);
    if (response) onRemove(review._id as string | undefined);
  };
  return (
    <div className="mt-8">
      <div className="flex gap-3 items-start hover:bg-gray-100 p-4 relative">
        <TextAvatar text={review.user?.displayName as string}></TextAvatar>
        <div className="flex flex-col">
          <span className="text-xl mb-2 text-white dark:text-black">
            {review.user?.displayName}
          </span>
          <span className="text-xs mb-4 text-white dark:text-black">
            {dayjs(review.createdAt).format('DD-MM-YYYY HH:mm:ss')}
          </span>
          <p className="text-white dark:text-black mb-2 md:mb-0">
            {review.content}
          </p>
          {user && user?._id === review?.user?._id && (
            <button
              onClick={handleRemoveItem}
              className={`flex gap-2 md:absolute md:top-2 md:right-2 px-6 py-2  text-white rounded mt-2 hover:bg-primary-500 duration-200 ${
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
          )}
        </div>
      </div>
      <hr className="w-full border border-gray-100" />
    </div>
  );
};
