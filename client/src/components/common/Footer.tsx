import { Link } from 'react-router-dom';
import { menuData } from '../../config';

const Footer = () => {
  return (
    <footer
      className={`bg-black dark:bg-white p-8 flex justify-between items-center mt-10`}
    >
      {/* logo */}
      <div className="flex items-center text-[1.7rem] text-white dark:text-black font-bold mr-[1.9rem]">
        Movie<span className="text-primary">TV</span>
      </div>
      {/* menu */}
      <ul className="flex items-center">
        {menuData.map((menu, index) => (
          <li key={index}>
            <Link
              to={menu.path}
              className={`text-white dark:text-black dark:hover:bg-primary-100 text-sm font-medium uppercase py-[6px] px-2 hover:bg-primary-200 duration-150`}
            >
              {menu.name}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
