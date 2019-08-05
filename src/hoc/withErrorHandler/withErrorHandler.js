import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Adj from '../Adj/Adj';

const withErrorHandler = (WrappedComponent, axios) => {
  //anonymous class
  return class extends Component {
    state = {
      error: null
    };

    componentWillMount() {
      // clearing state from errors
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });

      // if there is an error in response - set it to the state
      this.resInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error });
        }
      );
    }

    // removing interceptors to prevent memory leaks
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      const { error } = this.state;
      return (
        <Adj>
          <Modal show={error} modalClosed={this.errorConfirmedHandler}>
            {error ? <p style={{ color: 'red' }}>{error.message}</p> : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Adj>
      );
    }
  };
};

export default withErrorHandler;
