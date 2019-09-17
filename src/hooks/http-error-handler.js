import { useState, useEffect } from 'react';

export default httpClient => {
  const [error, setError] = useState(null);

  // clearing state from errors
  const reqInterceptor = httpClient.interceptors.request.use(req => {
    setError(null);
    return req;
  });

  // if there is an error in response - set it to the state
  const resInterceptor = httpClient.interceptors.response.use(
    res => res,
    err => {
      setError(err);
    }
  );

  useEffect(() => () => {
    // [cleanup] removing interceptors to prevent memory leaks
    const { request, response } = httpClient.interceptors;
    request.eject(reqInterceptor);
    response.eject(resInterceptor);
  });

  const errorConfirmedHandler = () => {
    setError(null);
  };

  return [error, errorConfirmedHandler];
};
