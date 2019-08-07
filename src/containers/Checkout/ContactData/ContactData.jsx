import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import classes from './ContactData.css';

export class ContactData extends Component {
  state = {
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
          required: true
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
    formIsValid: false,
    loading: false
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
    return isValid;
  };

  // Send Order to the Database
  orderHandler = e => {
    e.preventDefault();
    const { ingredients, price, history } = this.props;
    const { orderForm } = this.state;

    this.setState({
      loading: true
    });

    const orderData = {};
    for (const key in orderForm) {
      const { value } = orderForm[key];
      orderData[key] = value;
    }

    const order = {
      ingredients,
      price,
      orderData
    };

    axios
      .post('/orders.json', order) // firebase endpoint
      .then(response => {
        // console.log(response);
        this.setState({
          loading: false
        });

        history.push('/');
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: true
        });
      });
  };

  inputChangedHandler = id => ({ target }) => {
    const { orderForm } = this.state;
    const updatedFormElement = { ...orderForm[id], value: target.value };
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    orderForm[id] = updatedFormElement;

    let formIsValid = true;

    for (const key in orderForm) {
      formIsValid = orderForm[key].valid && formIsValid;
    }

    this.setState({
      orderForm,
      formIsValid
    });
  };

  renderForm = () => {
    const { orderForm, formIsValid } = this.state;
    const formElementArr = [];

    for (const key in orderForm) {
      formElementArr.push({
        id: key,
        config: orderForm[key]
      });
    }

    return (
      <form onSubmit={this.orderHandler}>
        {formElementArr.map(({ id, config }) => (
          <Input
            key={id}
            elementType={config.elementType}
            elementConfig={config.elementConfig}
            shouldValidate={config.validation}
            value={config.value}
            changed={this.inputChangedHandler(id)}
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

  render() {
    const { loading } = this.state;
    return (
      <div className={classes.ContactForm}>
        <h4>Enter your Contact Data</h4>
        {loading ? <Spinner /> : this.renderForm()}
      </div>
    );
  }
}

export default ContactData;
