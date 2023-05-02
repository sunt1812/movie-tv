import { Link, useLocation } from 'react-router-dom';
import { menuData, userData } from '../../config';
import { selectAuthSlice } from '../../redux/features/authSlice';
import { useAppSelector } from '../../redux/hooks';

interface ISidebarProps {
  openSidebar: boolean;
  themeMode: string;
  onClickSidebar: (params: any) => void;
  onDarkMode: (params: any) => void;
}
const SideBar: React.FC<ISidebarProps> = ({
  openSidebar,
  onClickSidebar,
  onDarkMode,
  themeMode,
}) => {
  const { pathname } = useLocation();
  const { user } = useAppSelector(selectAuthSlice);

  return (
    <>
      {openSidebar && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 z-[99] bg-black-100"
          onClick={onClickSidebar}
        ></div>
      )}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-[999] bg-black dark:bg-white bg-gradient-to-b from-gray-100 to-gray-100 overflow-y-auto duration-500 ${
          !openSidebar ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        <div className=" py-6 px-[30px] flex flex-col">
          {/* logo */}
          <div className="flex justify-center items-center text-[1.7rem] text-white dark:text-black font-bold mb-4 ">
            Movie<span className="text-primary">TV</span>
          </div>
          {/* menu */}
          <nav className="flex flex-col items-left">
            <h5 className="text-white dark:text-black text-xl my-3 uppercase font-bold">
              menu
            </h5>
            <ul className="flex flex-col ">
              {menuData.map((menu, index) => (
                <Link to={menu.path} key={index}>
                  <li
                    key={index}
                    className={`py-3 px-5 rounded-lg flex items-center my-1 hover:bg-gray-200 dark:hover:bg-black-200 duration-150 cursor-pointer ${
                      menu.path === pathname ? 'bg-primary' : ''
                    }`}
                  >
                    <span className="min-w-[56px] text-left">{menu.icon}</span>
                    <span className="text-white dark:text-black text-base uppercase font-normal block">
                      {menu.name}
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          </nav>
          {/* user */}
          {user && (
            <>
              <h5 className="text-white text-xl my-3 uppercase font-bold">
                PERSONAL
              </h5>
              <ul className="flex flex-col ">
                {userData.map((user, index) => (
                  <Link to={user.path} key={index}>
                    <li
                      key={index}
                      className={`py-3 px-5 rounded-lg flex items-center my-1 hover:bg-gray-200 duration-150 cursor-pointer ${
                        user.path === pathname ? 'bg-primary' : ''
                      }`}
                    >
                      <span className="min-w-[56px] text-left">
                        {user.icon}
                      </span>
                      <span className="text-white dark:text-black text-base uppercase font-normal block">
                        {user.name}
                      </span>
                    </li>
                  </Link>
                ))}
              </ul>
            </>
          )}
          {/* theme */}
          <div className="">
            <h5 className="text-white dark:text-black text-xl my-3 uppercase font-bold">
              theme
            </h5>
            <ul className="flex flex-col ">
              <li
                className="text-white dark:text-black text-base uppercase font-normal py-3 px-5  rounded-lg flex items-center my-1 hover:bg-black-200 dark:hover:bg-black-200 duration-150 cursor-pointer"
                onClick={onDarkMode}
              >
                {/* button light dark */}
                <button className="min-w-[56px] text-left">
                  {themeMode === 'dark' ? (
                    <i className="bx bx-moon bx-sm"></i>
                  ) : (
                    <i className="bx bx-sun bx-sm"></i>
                  )}
                </button>
                dark mode
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
