import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userData } from '../../config';
import useOutSilde from '../../hooks/useOutSlide';
import { selectAuthSlice, setUserSlice } from '../../redux/features/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const UserMenu = () => {
  const { user } = useAppSelector(selectAuthSlice);
  const { toggleRef, contentRef, isInside } = useOutSilde();
  const dispatch = useAppDispatch();

  useEffect(() => {
    isInside
      ? document.body.classList.add('overflow-body')
      : document.body.classList.remove('overflow-body');
  }, [isInside]);

  return (
    user && (
      <div className="ml-auto relative">
        <p
          className="text-xl font-medium capitalize cursor-pointer"
          ref={toggleRef}
        >
          {(user?.displayName?.length as number) < 10
            ? user?.displayName
            : `${user?.displayName?.substring(0, 10)}...`}
        </p>
        {isInside && (
          <div
            ref={contentRef}
            className="absolute -right-3 rounded-sm top-[110%] p-2 bg-black-400 dark:bg-white shadow-menu"
          >
            <ul className="flex flex-col ">
              {userData.map((menu, index) => (
                <Link to={menu.path} key={index}>
                  <li
                    key={index}
                    className={`py-3 px-5 rounded-lg flex items-center my-1 hover:bg-gray-200 dark:hover:bg-black-200 duration-150 cursor-pointer `}
                  >
                    <span className="min-w-[56px] text-left">{menu.icon}</span>
                    <p className="text-white dark:text-black text-base uppercase font-normal block whitespace-nowrap">
                      {menu.name}
                    </p>
                  </li>
                </Link>
              ))}
              <li
                onClick={() => dispatch(setUserSlice(null))}
                className={`py-3 px-5 rounded-lg flex items-center my-1 hover:bg-gray-200 dark:hover:bg-black-200 duration-150 cursor-pointer `}
              >
                <span className="min-w-[56px] text-left">
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                </span>
                <p className="text-white dark:text-black text-base uppercase font-normal block whitespace-nowrap">
                  log out
                </p>
              </li>
            </ul>
          </div>
        )}
      </div>
    )
  );
};

export default memo(UserMenu);
