import {
  IGenreResponse,
  IMediaParams,
  IMediaResponse,
  IMediaTypeDetail,
} from '../../utils/interfaces';
import { requestHttp } from '../configs';

const mediaApi = {
  getList: async ({ mediaType, mediaCategory, page }: IMediaParams) => {
    try {
      const response: IMediaResponse = await requestHttp.get(
        `${mediaType}/${mediaCategory}?page=${page}`
      );
      return { response };
    } catch (err: any) {
      const error: string = err?.message;
      return { error };
    }
  },
  getGenres: async ({ mediaType }: IMediaParams) => {
    try {
      const response: IGenreResponse = await requestHttp.get(
        `${mediaType}/genres`
      );
      return { response };
    } catch (err: any) {
      const error: string = err?.message;
      return { error };
    }
  },
  getDetail: async ({ mediaType, mediaId }: IMediaParams) => {
    try {
      const response: IMediaTypeDetail = await requestHttp.getPrivate(
        `${mediaType}/detail/${mediaId}`
      );
      return { response };
    } catch (err: any) {
      const error: string = err?.message;
      return { error };
    }
  },
  search: async ({ mediaType, page, query }: IMediaParams) => {
    try {
      const search: IMediaResponse = await requestHttp.get(
        `${mediaType}/search?page=${page}&query=${query}`
      );
      return { search };
    } catch (err: any) {
      const error: string = err?.message;
      return { error };
    }
  },
};
export default mediaApi;
