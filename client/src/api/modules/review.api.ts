import { IMediaId, IReview } from '../../utils/interfaces';
import { requestHttp } from '../configs';

interface IParams {
  reviewId: number | undefined;
}

const reviewsEndpoints = {
  list: `reviews`,
  add: `reviews`,
  remove: ({ reviewId }: IParams) => `reviews/${reviewId}`,
};

const reviewApi = {
  getList: async () => {
    try {
      const response = await requestHttp.getPrivate(reviewsEndpoints.list);

      return { response };
    } catch (err: any) {
      const error: string = err?.message;
      return { error };
    }
  },
  add: async ({
    content,
    mediaId,
    mediaType,
    mediaTitle,
    mediaPoster,
    mediaRate,
  }: IReview) => {
    try {
      const response = await requestHttp.postPrivate(reviewsEndpoints.add, {
        content,
        mediaId,
        mediaType,
        mediaTitle,
        mediaPoster,
        mediaRate,
      });

      return { response };
    } catch (err: any) {
      const error: string = err?.message;

      return { error };
    }
  },

  remove: async ({ reviewId }: IParams) => {
    try {
      const response = await requestHttp.removePrivate(
        reviewsEndpoints.remove({ reviewId })
      );

      return { response };
    } catch (err: any) {
      const error: string = err?.message;
      return { error };
    }
  },
};
export default reviewApi;
