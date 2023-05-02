import React, { useEffect, useRef, useState } from 'react';

import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Link, useLocation } from 'react-router-dom';
import {
  AuthModal,
  Button,
  SideBar,
  SignInForm,
  SignUpForm,
  UserMenu,
} from '.';

import { menuData } from '../../config';
import useScrollY from '../../hooks/useScrollY';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectThemeMode,
  setThemeMode,
} from '../../redux/features/themeModeSlice';
import { selectAuthSlice } from '../../redux/features/authSlice';
import {
  selectAuthModal,
  setOpenModal,
} from '../../redux/features/authModalSlice';

const Header: React.FC = () => {
  const { pathname } = useLocation();

  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [openAuth, setOpenAuth] = useState<string>('signIn');

  const { scrollY } = useScrollY();

  const { user } = useAppSelector(selectAuthSlice);
  const { themeMode } = useAppSelector(selectThemeMode);
  const { openModal } = useAppSelector(selectAuthModal);

  const isThemeMode = themeMode === 'dark' ? 'light' : 'dark';

  const dispatch = useAppDispatch();

  const handleClickSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const handleDarkMode = () => {
    localStorage.setItem('theme', isThemeMode);
    dispatch(setThemeMode(isThemeMode));
  };

  useEffect(() => {
    themeMode === 'light'
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark');
  }, [themeMode]);

  useEffect(() => {
    setOpenSidebar(false);
  }, [pathname]);

  useEffect(() => {
    openSidebar || openModal
      ? document.body.classList.add('overflow-body')
      : document.body.classList.remove('overflow-body');
  }, [openSidebar, openModal]);

  const handleAuthModal = () => {
    dispatch(setOpenModal(true));
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 h-16 dark:bg-white z-[999] ${
          scrollY > 100 ? 'bg-black' : ''
        }`}
      >
        <div className="mx-6 flex justify-between items-center h-full">
          {/* click bar */}
          <button
            className="block md:hidden mr-4 p-2"
            onClick={handleClickSidebar}
          >
            <FontAwesomeIcon icon={faBars} size="xl" />
          </button>
          {/* logo */}
          <div className="flex items-center text-[1.7rem] text-white dark:text-black font-bold mr-[1.9rem]">
            Movie<span className="text-primary">TV</span>
          </div>
          {/* menu */}
          <nav className="hidden md:flex items-center">
            <ul className="flex items-center">
              {menuData.map((menu, index) => (
                <li key={index}>
                  <Link
                    to={menu.path}
                    className={`btn-primary mr-4  dark:text-black hover:bg-primary-100 ${
                      menu.path === pathname
                        ? 'bg-primary hover:bg-primary-500 dark:hover:bg-primary-500 dark:text-white dark:hover:text-white'
                        : ''
                    }`}
                  >
                    {menu.name}
                  </Link>
                </li>
              ))}
            </ul>
            {/* button light dark */}
            <button
              onClick={handleDarkMode}
              className="text-[1.3rem] w-10 h-10 rounded-full hover:bg-black-200"
            >
              {themeMode === 'dark' ? (
                <i className="bx bx-moon"></i>
              ) : (
                <i className="bx bx-sun bx-sm"></i>
              )}
            </button>
          </nav>
          {/* button login */}
          {user ? (
            <UserMenu />
          ) : (
            <div className="ml-auto">
              <Button children="sign in" onClick={handleAuthModal} />
            </div>
          )}
        </div>
      </header>
      <SideBar
        openSidebar={openSidebar}
        onClickSidebar={handleClickSidebar}
        onDarkMode={handleDarkMode}
        themeMode={themeMode}
      />
      {openModal && (
        <AuthModal>
          {openAuth === 'signIn' && <SignInForm setOpenAuth={setOpenAuth} />}
          {openAuth === 'signUp' && <SignUpForm setOpenAuth={setOpenAuth} />}
        </AuthModal>
      )}
    </>
  );
};

export default Header;
