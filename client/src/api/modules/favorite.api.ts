import { IFavorite, IMediaId } from '../../utils/interfaces';
import { requestHttp } from '../configs';

const favoriteEndpoints = {
  list: `user/favorites`,
  add: `user/favorites`,
  remove: ({ mediaId }: IMediaId) => `user/favorites/${mediaId}`,
};

const favoriteApi = {
  getList: async () => {
    try {
      const response = await requestHttp.getPrivate(favoriteEndpoints.list);

      return { response };
    } catch (err: any) {
      const error: string = err?.message;
      return { error };
    }
  },
  add: async ({
    mediaId,
    mediaType,
    mediaTitle,
    mediaPoster,
    mediaRate,
  }: IFavorite) => {
    try {
      const response: IFavorite = await requestHttp.postPrivate(
        favoriteEndpoints.add,
        {
          mediaId,
          mediaType,
          mediaTitle,
          mediaPoster,
          mediaRate,
        }
      );

      return { response };
    } catch (err: any) {
      const error: string = err?.message;
      return { error };
    }
  },

  remove: async ({ mediaId }: IMediaId) => {
    try {
      const response = await requestHttp.removePrivate(
        favoriteEndpoints.remove({ mediaId })
      );
      console.log('favorite', response);
      return { response };
    } catch (err: any) {
      const error: string = err?.message;
      return { error };
    }
  },
};
export default favoriteApi;
