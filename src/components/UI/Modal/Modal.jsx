import React, { Component } from 'react';
import Adj from '../../../hoc/Adj/Adj';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.css';

class Modal extends Component {
  shouldComponentUpdate(nextProps, _) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  // componentWillUpdate() {
  //   console.log('modal was updated');
  // }

  render() {
    const { children, show, modalClosed } = this.props;
    return (
      <Adj>
        <Backdrop show={show} clicked={modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: show ? '1' : '0'
          }}
        >
          {children}
        </div>
      </Adj>
    );
  }
}

export default Modal;
