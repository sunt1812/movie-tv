import {
  IPersonMediasResponse,
  IPersonParams,
  IPersonResponse,
} from '../../utils/interfaces';
import { requestHttp } from '../configs';

const personApi = {
  getPersonDetail: async ({ personId }: IPersonParams) => {
    try {
      const response: IPersonResponse = await requestHttp.get(
        `person/${personId}`
      );

      return { response };
    } catch (err: any) {
      const error: string = err?.message;
      return { error };
    }
  },
  getPersonMedias: async ({ personId }: IPersonParams) => {
    try {
      const medias: IPersonMediasResponse = await requestHttp.get(
        `person/${personId}/medias`
      );

      return { medias };
    } catch (err: any) {
      const errorMedias: string = err?.message;
      return { errorMedias };
    }
  },
};
export default personApi;
