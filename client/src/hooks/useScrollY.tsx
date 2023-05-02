import { useEffect, useState } from 'react';

const useScrollY = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      setScrollY(scroll);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { scrollY };
};

export default useScrollY;
