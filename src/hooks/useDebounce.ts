import { useRef, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';
import { AnyCallback } from '../types';

const useDebounce = (callback: AnyCallback, milliseconds = 500) => {
  const ref = useRef<AnyCallback>();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      console.log('debouncy bouncy');
      ref?.current?.();
    };

    return debounce(func, milliseconds);
  }, []);

  return debouncedCallback;
};

export { useDebounce };
