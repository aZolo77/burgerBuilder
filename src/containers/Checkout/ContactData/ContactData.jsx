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
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: ''
      },
      zipcode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail'
        },
        value: ''
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
        value: ''
      }
    },
    loading: false
  };

  orderHandler = e => {
    e.preventDefault();
    const { ingredients, price, history } = this.props;

    // Send Order to the Database
    this.setState({
      loading: true
    });

    const order = {
      ingredients,
      price
    };

    axios
      .post('/orders.json', order) // firebase endpoint
      .then(response => {
        console.log(response);
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

  renderForm = () => {
    const { orderForm } = this.state;
    const formElementArr = [];

    for (const key in orderForm) {
      formElementArr.push({
        id: key,
        config: orderForm[key]
      });
    }

    return (
      <form>
        {/* <Input elementType="type" elementConfig="config" value="value" /> */}
        {formElementArr.map(({ id, config }) => (
          <Input
            key={id}
            elementType={config.elementType}
            elementConfig={config.elementConfig}
            value={config.value}
          />
        ))}
        <Button btnType="Success" clicked={this.orderHandler}>
          Order
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
