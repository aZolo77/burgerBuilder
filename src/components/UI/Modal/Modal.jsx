import React from 'react';
import Adj from '../../../hoc/Adj/Adj';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.css';

const Modal = ({ children, show, modalClosed }) => {
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
};

// * [[React.memo] renders Component only when its props change
export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    prevProps.show === nextProps.show &&
    prevProps.children === nextProps.children
);
// * same as [shouldComponentUpdate] in class based Components
//   shouldComponentUpdate(nextProps, _) {
//     return (
//       nextProps.show !== this.props.show ||
//       nextProps.children !== this.props.children
//     );
//   }
