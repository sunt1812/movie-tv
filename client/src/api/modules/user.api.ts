import { ILogin, IUpdatePassword, IUser } from '../../utils/interfaces';
import { requestHttp } from '../configs';
const userEndpoints = {
  register: `user/register`,
  login: `user/login`,
  updatePassword: `user/update-password`,
  info: `user/info`,
};

const userApi = {
  register: async ({
    username,
    displayName,
    password,
    confirmPassword,
  }: IUser) => {
    try {
      const register: IUser = await requestHttp.post(userEndpoints.register, {
        username,
        displayName,
        password,
        confirmPassword,
      });

      return { register };
    } catch (err: any) {
      const error: string = err?.message;
      return { error };
    }
  },
  login: async ({ username, password }: ILogin) => {
    try {
      const login: ILogin = await requestHttp.post(userEndpoints.login, {
        username,
        password,
      });

      return { login };
    } catch (err: any) {
      const error: string = err?.message;
      return { error };
    }
  },
  updatePassword: async ({
    password,
    newPassword,
    confirmNewPassword,
  }: IUpdatePassword) => {
    try {
      const update: ILogin = await requestHttp.putPrivate(
        userEndpoints.updatePassword,
        {
          password,
          newPassword,
          confirmNewPassword,
        }
      );

      return { update };
    } catch (err: any) {
      const error: string = err?.message;
      return { error };
    }
  },
  getInfo: async () => {
    try {
      const info = await requestHttp.getPrivate(userEndpoints.info);

      return { info };
    } catch (err: any) {
      const error: string = err?.message;
      return { error };
    }
  },
};
export default userApi;
