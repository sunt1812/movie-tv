import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import userApi from '../../api/modules/user.api';
import { setUserSlice } from '../../redux/features/authSlice';

import { Footer, GlobalLoading, Header } from '../common';

function MainLayout() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    const getInfo = async () => {
      const { info, error } = await userApi.getInfo();
      if (info) dispatch(setUserSlice(info));
      if (error) dispatch(setUserSlice(null));
    };
    getInfo();
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div>
      <GlobalLoading />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
