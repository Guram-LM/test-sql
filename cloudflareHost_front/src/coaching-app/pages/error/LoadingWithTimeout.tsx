import { useEffect, useState } from 'react';
import ErrorPage from './ErrorPage';
import Loader from '../loader/Loader';

const LoadingWithTimeout = () => {
  if (typeof window === 'undefined') return null;

  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowError(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return showError ? <ErrorPage /> : <Loader />;
};

export default LoadingWithTimeout;
