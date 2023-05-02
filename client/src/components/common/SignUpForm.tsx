import { useFormik } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Button } from '.';
import userApi from '../../api/modules/user.api';
import { setOpenModal } from '../../redux/features/authModalSlice';
import { setUserSlice } from '../../redux/features/authSlice';
import { useAppDispatch } from '../../redux/hooks';
import { IUser } from '../../utils/interfaces';

interface IProps {
  setOpenAuth: (value: string) => void;
}
const SignUpForm = ({ setOpenAuth }: IProps) => {
  const [isLoginRequest, setIsLoginRequest] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      username: '',
      displayName: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, 'username minimum 8 characters')
        .required('username is required'),
      password: Yup.string()
        .min(8, 'password minimum 8 characters')
        .required('password is required'),
      displayName: Yup.string()
        .min(8, 'displayName minimum 8 characters')
        .required('displayName is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'confirmPassword not match')
        .min(8, 'confirmPassword minimum 8 characters')
        .required('confirmPassword is required'),
    }),
    onSubmit: async (values: IUser) => {
      setIsLoginRequest(true);
      const { register, error } = await userApi.register(values);
      setIsLoginRequest(false);
      if (register) {
        formik.resetForm();
        dispatch(setOpenModal(false));
        dispatch(setUserSlice(register));
        toast.success('Sign in success');
      }

      if (error) toast.error(error);
    },
  });

  return (
    <div className="absolute w-full left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 p-8 max-w-[600px] z-[99993]">
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
              type="text"
              value={formik.values.displayName}
              onChange={formik.handleChange}
              name="displayName"
              placeholder="display name"
              className={`style-input ${
                formik.errors.displayName && formik.touched.displayName
                  ? 'mb-3'
                  : 'mb-6'
              }`}
            />
            {formik.errors.displayName && formik.touched.displayName ? (
              <p className="text-xs font-medium text-primary mb-2">
                {formik.errors.displayName}
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
          <>
            <input
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              name="confirmPassword"
              placeholder="comfim password"
              className={`style-input ${
                formik.errors.confirmPassword && formik.touched.confirmPassword
                  ? 'mb-3'
                  : 'mb-6'
              }`}
            />
            {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
              <p className="text-xs font-medium text-primary mb-2">
                {formik.errors.confirmPassword}
              </p>
            ) : null}
          </>
          {isLoginRequest ? (
            <div className="loader mx-auto"></div>
          ) : (
            <Button type="submit" children="SIGN UP" clasName="w-full mb-2" />
          )}

          <Button
            children="SIGN IN"
            clasName="text-primary w-full bg-transparent btn-hover"
            onClick={() => setOpenAuth('signIn')}
          />
        </form>
        {/* form */}
      </div>
    </div>
  );
};

export default SignUpForm;
