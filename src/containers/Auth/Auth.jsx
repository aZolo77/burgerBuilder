import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { checkValidity } from '../../shared/utility';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Auth.css';

const initialControls = {
  email: {
    elementType: 'input',
    elementConfig: {
      type: 'email',
      placeholder: 'Mail Address'
    },
    value: '',
    validation: {
      required: true,
      isEmail: true
    },
    valid: false,
    touched: false
  },
  password: {
    elementType: 'input',
    elementConfig: {
      type: 'password',
      placeholder: 'Password'
    },
    value: '',
    validation: {
      required: true,
      minLength: 6
    },
    valid: false,
    touched: false
  }
};

const Auth = ({
  onSetRedirectPath,
  building,
  authRedirectPath,
  onAuth,
  loading,
  error,
  isAuthenticated
}) => {
  const [controls, setControls] = useState(initialControls);
  const [isSignup, setIsSignup] = useState(true);

  useEffect(() => {
    if (!building && authRedirectPath !== '/') {
      onSetRedirectPath();
    }
  }, [building, authRedirectPath, onSetRedirectPath]);

  const inputChangedHandler = controlName => ({ target }) => {
    const updatedControls = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value: target.value,
        valid: checkValidity(target.value, controls[controlName].validation),
        touched: true
      }
    };

    setControls(updatedControls);
  };

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };

  const submitHandler = e => {
    e.preventDefault();
    const { email, password } = controls;
    onAuth(email.value, password.value, isSignup);
  };

  const renderInputFields = () => {
    const formElementArr = [];

    for (const key in controls) {
      formElementArr.push({
        controlName: key,
        config: controls[key]
      });
    }

    return formElementArr.map(({ controlName, config }) => (
      <Input
        key={controlName}
        elementType={config.elementType}
        elementConfig={config.elementConfig}
        shouldValidate={config.validation}
        value={config.value}
        changed={inputChangedHandler(controlName)}
        invalid={!config.valid}
        touched={config.touched}
      />
    ));
  };

  if (isAuthenticated) {
    return <Redirect to={authRedirectPath} />;
  }

  if (loading) {
    return <Spinner />;
  }

  const errorMessage = error ? (
    <p style={{ color: 'red' }}>{error.message}</p>
  ) : null;

  return (
    <div className={classes.AuthForm}>
      {errorMessage}
      <form onSubmit={submitHandler}>
        {renderInputFields()}
        <Button btnType="Success">SUBMIT</Button>
      </form>
      <Button btnType="Attention" clicked={switchAuthModeHandler}>
        SWITCH TO {isSignup ? 'SIGNUP' : 'SIGNIN'}
      </Button>
    </div>
  );
};

const mapStateToProps = ({
  auth: { loading, idToken, userId, error, authRedirectPath },
  burgerBuilder: { building }
}) => {
  return {
    loading,
    idToken,
    userId,
    error,
    isAuthenticated: idToken !== null,
    authRedirectPath,
    building
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
