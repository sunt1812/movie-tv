import { useEffect, useState } from 'react';
import { Header } from '.';
import { selectGlobalLoading } from '../../redux/features/globalLoadingSlice';

import { useAppSelector } from '../../redux/hooks';

const GlobalLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { globalLoading } = useAppSelector(selectGlobalLoading);

  useEffect(() => {
    if (globalLoading) {
      setIsLoading(false);
    } else {
      setTimeout(() => {
        setIsLoading(true);
      }, 1000);
    }
  }, [globalLoading]);

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 z-[9999] bg-black dark:bg-white w-full h-full ${
          isLoading ? 'hidden' : 'block'
        }`}
      >
        <Header />
        {/* progress */}
        <progress className="pure-material-progress-linear w-full h-1 mt-16" />
        {/* logo */}
        <div className="flex items-center justify-center h-full text-[1.7rem] text-white dark:text-black font-bold mr-[1.9rem]">
          Movie<span className="text-primary">TV</span>
        </div>
        holo he he
      </div>
    </>
  );
};

export default GlobalLoading;
