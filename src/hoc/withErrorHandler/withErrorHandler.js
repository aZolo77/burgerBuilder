import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Adj from '../Adj/Adj';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const WithErrorHandler = (WrappedComponent, axios) => {
  const AnonymousFn = props => {
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <Adj>
        <Modal show={error} modalClosed={clearError}>
          {error ? <p style={{ color: 'red' }}>{error.message}</p> : null}
        </Modal>
        <WrappedComponent {...props} />
      </Adj>
    );
  };

  return AnonymousFn;
};

export default WithErrorHandler;
