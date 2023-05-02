import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import userApi from '../api/modules/user.api';

import { Button, Heading } from '../components/common';
import { setOpenModal } from '../redux/features/authModalSlice';
import { setUserSlice } from '../redux/features/authSlice';
import { useAppDispatch } from '../redux/hooks';
import { IUpdatePassword } from '../utils/interfaces';

const PasswordUpdate = () => {
  const [isLoginRequest, setIsLoginRequest] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, 'password minimum 8 characters')
        .required('password is required'),
      newPassword: Yup.string()
        .min(8, 'password minimum 8 characters')
        .required('password is required'),
      confirmNewPassword: Yup.string()
        .min(8, 'password minimum 8 characters')
        .required('password is required'),
    }),
    onSubmit: async (values: IUpdatePassword) => {
      setIsLoginRequest(true);
      const { update, error } = await userApi.updatePassword(values);
      setIsLoginRequest(false);

      if (update) {
        formik.resetForm();

        dispatch(setUserSlice(null));
        console.log('first');
        toast.success('Update password success! Please re-login');
        console.log('first1');
        navigate('/');
        dispatch(setOpenModal(true));
      }

      if (error) toast.error(error);
    },
  });
  return (
    <main className="min-h-screen overflow-hidden p-4">
      <Heading text="UPDATE PASSWORD">
        {/* form */}
        <form onSubmit={formik.handleSubmit} className="max-w-[400px]">
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
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              name="newPassword"
              placeholder="newPassword"
              className={`style-input ${
                formik.errors.newPassword && formik.touched.newPassword
                  ? 'mb-3'
                  : 'mb-6'
              }`}
            />
            {formik.errors.newPassword && formik.touched.newPassword ? (
              <p className="text-xs font-medium text-primary mb-2">
                {formik.errors.newPassword}
              </p>
            ) : null}
          </>
          <>
            <input
              type="password"
              value={formik.values.confirmNewPassword}
              onChange={formik.handleChange}
              name="confirmNewPassword"
              placeholder="confirmNewPassword"
              className={`style-input ${
                formik.errors.confirmNewPassword &&
                formik.touched.confirmNewPassword
                  ? 'mb-3'
                  : 'mb-6'
              }`}
            />
            {formik.errors.confirmNewPassword &&
            formik.touched.confirmNewPassword ? (
              <p className="text-xs font-medium text-primary mb-2">
                {formik.errors.confirmNewPassword}
              </p>
            ) : null}
          </>
          {isLoginRequest ? (
            <div className="loader mx-auto"></div>
          ) : (
            <Button
              children="update Password"
              clasName="w-full mb-2"
              type="submit"
            />
          )}
        </form>
        {/* form */}
      </Heading>
    </main>
  );
};

export default PasswordUpdate;
