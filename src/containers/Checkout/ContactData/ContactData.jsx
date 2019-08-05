import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import classes from './ContactData.css';

export class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
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
      price,
      customer: {
        name: 'Zollo',
        address: {
          street: 'Test street 1',
          zipcode: '123456',
          country: 'Russia'
        },
        email: 'test@gmail.com'
      },
      deliveryMethod: 'fastest'
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
    return (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          className={classes.Input}
          type="text"
          name="email"
          placeholder="Your Mail"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Your Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postal"
          placeholder="Postal Code"
        />
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
