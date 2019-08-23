import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Auth.css';

class Auth extends Component {
  state = {
    controls: {
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
    },
    formIsValid: false,
    isSignup: true
  };

  componentDidMount() {
    const { onSetRedirectPath, building, authRedirectPath } = this.props;

    if (!building && authRedirectPath !== '/') {
      onSetRedirectPath();
    }
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignup: !prevState.isSignup
      };
    });
  };

  checkValidity = (value, rules, isValid = true) => {
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }
    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  };

  inputChangedHandler = controlName => ({ target }) => {
    const { controls } = this.state;
    const updatedControls = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value: target.value,
        valid: this.checkValidity(
          target.value,
          controls[controlName].validation
        ),
        touched: true
      }
    };

    this.setState({ controls: updatedControls });
  };

  submitHandler = e => {
    e.preventDefault();
    const { email, password } = this.state.controls;
    const { onAuth } = this.props;
    onAuth(email.value, password.value, this.state.isSignup);
  };

  renderInputFields = () => {
    const { controls } = this.state;
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
        changed={this.inputChangedHandler(controlName)}
        invalid={!config.valid}
        touched={config.touched}
      />
    ));
  };

  render() {
    const { isSignup } = this.state;
    const { loading, error, isAuthenticated, authRedirectPath } = this.props;

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
        <form onSubmit={this.submitHandler}>
          {this.renderInputFields()}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button btnType="Attention" clicked={this.switchAuthModeHandler}>
          SWITCH TO {isSignup ? 'SIGNUP' : 'SIGNIN'}
        </Button>
      </div>
    );
  }
}

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
