import React, { useState } from 'react';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';
import { updateObject, checkValidity } from '../../../shared/utility';

import * as orderActions from '../../../store/actions/index';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import classes from './ContactData.css';

const initialState = {
  orderForm: {
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Name'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Street'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    zipcode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'ZIP Code'
      },
      value: '',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 7
      },
      valid: false,
      touched: false
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Country'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your E-Mail'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          {
            value: 'fastest',
            displayValue: 'Fastest'
          },
          {
            value: 'cheapest',
            displayValue: 'Cheapest'
          }
        ]
      },
      value: 'fastest',
      validation: {},
      valid: true
    }
  },
  formIsValid: false
};

const ContactData = ({
  ingredients,
  price,
  onOrderBurger,
  idToken,
  userId,
  loading
}) => {
  const [contactState, setContactState] = useState(initialState);

  // Send Order to the Database
  const orderHandler = e => {
    e.preventDefault();
    const { orderForm } = contactState;

    const orderData = {};
    for (const key in orderForm) {
      const { value } = orderForm[key];
      orderData[key] = value;
    }

    const order = {
      ingredients,
      price,
      orderData,
      userId
    };

    onOrderBurger(order, idToken);
  };

  const inputChangedHandler = id => ({ target }) => {
    const { orderForm } = contactState;

    const updatedFormElement = updateObject(orderForm[id], {
      value: target.value,
      valid: checkValidity(target.value, orderForm[id].validation),
      touched: true
    });
    orderForm[id] = updatedFormElement;

    let formIsValid = true;

    for (const key in orderForm) {
      formIsValid = orderForm[key].valid && formIsValid;
    }

    setContactState({
      orderForm,
      formIsValid
    });
  };

  const renderForm = () => {
    const { orderForm, formIsValid } = contactState;
    const formElementArr = [];

    for (const key in orderForm) {
      formElementArr.push({
        id: key,
        config: orderForm[key]
      });
    }

    return (
      <form onSubmit={orderHandler}>
        {formElementArr.map(({ id, config }) => (
          <Input
            key={id}
            elementType={config.elementType}
            elementConfig={config.elementConfig}
            shouldValidate={config.validation}
            value={config.value}
            changed={inputChangedHandler(id)}
            invalid={!config.valid}
            touched={config.touched}
          />
        ))}
        <Button btnType="Success" disabled={!formIsValid}>
          ORDER
        </Button>
      </form>
    );
  };

  return (
    <div className={classes.ContactForm}>
      <h4>Enter your Contact Data</h4>
      {loading ? <Spinner /> : renderForm()}
    </div>
  );
};

const mapStateToProps = ({
  burgerBuilder: { ingredients, totalPrice },
  order: { loading },
  auth: { idToken, userId }
}) => {
  return {
    ingredients,
    price: totalPrice,
    loading,
    idToken,
    userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(orderActions.purchaseBurger(orderData, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
