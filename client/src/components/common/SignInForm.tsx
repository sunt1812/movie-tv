import { useFormik } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Button } from '.';
import userApi from '../../api/modules/user.api';
import { setOpenModal } from '../../redux/features/authModalSlice';
import { setUserSlice } from '../../redux/features/authSlice';
import { useAppDispatch } from '../../redux/hooks';
import { ILogin } from '../../utils/interfaces';

interface IProps {
  setOpenAuth: (value: string) => void;
}

const SignInForm = ({ setOpenAuth }: IProps) => {
  const [isLoginRequest, setIsLoginRequest] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, 'username minimum 8 characters')
        .required('username is required'),
      password: Yup.string()
        .min(8, 'password minimum 8 characters')
        .required('password is required'),
    }),
    onSubmit: async (values: ILogin) => {
      setIsLoginRequest(true);
      const { login, error } = await userApi.login(values);
      setIsLoginRequest(false);
      if (login) {
        formik.resetForm();
        dispatch(setOpenModal(false));
        dispatch(setUserSlice(login));
        toast.success('Sign in success');
      }

      if (error) toast.error(error);
    },
  });
  return (
    <div className="absolute w-full left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 px-8 max-w-[600px] z-[99993]">
      <div className="p-8 bg-black dark:bg-white shadow-3xl relative z-[99999]">
        {/* logo */}
        <div className="flex items-center justify-center text-[1.7rem] text-white dark:text-black font-bold mb-8">
          Movie<span className="text-primary">TV</span>
        </div>
        {/* logo */}

        {/* form */}
        <form onSubmit={formik.handleSubmit}>
          <>
            <input
              type="text"
              value={formik.values.username}
              onChange={formik.handleChange}
              name="username"
              placeholder="username"
              className={`style-input ${
                formik.errors.username && formik.touched.username
                  ? 'mb-3'
                  : 'mb-6'
              }`}
            />

            {formik.errors.username && formik.touched.username ? (
              <p className="text-xs font-medium text-primary mb-2">
                {formik.errors.username}
              </p>
            ) : null}
          </>

          <>
            <input
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              name="password"
              placeholder="password"
              className={`style-input ${
                formik.errors.password && formik.touched.password
                  ? 'mb-3'
                  : 'mb-6'
              }`}
            />
            {formik.errors.password && formik.touched.password ? (
              <p className="text-xs font-medium text-primary mb-2">
                {formik.errors.password}
              </p>
            ) : null}
          </>
          {isLoginRequest ? (
            <div className="loader mx-auto"></div>
          ) : (
            <Button children="SIGN IN" clasName="w-full mb-2" type="submit" />
          )}

          <Button
            children="SIGN UP"
            clasName="text-primary w-full bg-transparent btn-hover"
            onClick={() => setOpenAuth('signUp')}
          />
        </form>
        {/* form */}
      </div>
    </div>
  );
};

export default SignInForm;
