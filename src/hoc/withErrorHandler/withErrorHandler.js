import React, { useState, useEffect } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Adj from '../Adj/Adj';

const WithErrorHandler = (WrappedComponent, axios) => {
  const AnonymousFn = props => {
    const [error, setError] = useState(null);

    // clearing state from errors
    const reqInterceptor = axios.interceptors.request.use(req => {
      setError(null);
      return req;
    });

    // if there is an error in response - set it to the state
    const resInterceptor = axios.interceptors.response.use(
      res => res,
      err => {
        setError(err);
      }
    );

    useEffect(
      () => () => {
        // cleanup
        // removing interceptors to prevent memory leaks
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      },
      [reqInterceptor, resInterceptor]
    );

    const errorConfirmedHandler = () => {
      setError(null);
    };

    return (
      <Adj>
        <Modal show={error} modalClosed={errorConfirmedHandler}>
          {error ? <p style={{ color: 'red' }}>{error.message}</p> : null}
        </Modal>
        <WrappedComponent {...props} />
      </Adj>
    );
  };

  return AnonymousFn;
};

export default WithErrorHandler;
