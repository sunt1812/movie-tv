import { useEffect, useRef } from 'react';

const usePrevious = (value: string) => {
  const valueRef = useRef<string>();
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  return valueRef.current;
};

export default usePrevious;
