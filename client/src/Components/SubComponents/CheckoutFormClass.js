import React, { Component } from 'react';
import axios from 'axios';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { CardElement } from '@stripe/react-stripe-js';

import BillingDetail from './BillingDetail';

class CheckoutForm extends Component {

  state = {
    plan: this.props.plan,
    submit: false,
    cardError: '',
  }

  submitHandler = async event => {
    event.preventDefault();

    this.setState({
      submit: true,
      cardError: '',
    })

    const {stripe, elements} = this.props;

    if (!stripe || !elements) { 
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const billingDetails = {
      name: event.target.name.value,
      email: event.target.email.value,
      address: {
        city: event.target.city.value,
        line1: event.target.address.value,
        state: event.target.state.value,
        postal_code: event.target.zip.value,
      },
    };

    console.log(billingDetails);
    
    // From client to server
    // Send order information
    // return PaymentIntent's client_secret
    const { data: {customerId, clientSecret} } = await axios({
      method: 'POST',
      url: '/api/payment_intents',
      data: {
        amount: this.state.plan.planPrice * 100,
        name: event.target.name.value,
        email: event.target.email.value,
      },
    });

    const cardElement = elements.getElement(CardElement);
    
    // Provide card details and finalize payment
    // Customer to client
    const paymentMethodReq = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: billingDetails,
    });

    console.log('paymentMethodReq', paymentMethodReq);

    if (paymentMethodReq.error) {
      this.setState({
        cardError: paymentMethodReq.error.message,
        submit: false
      })
    } else {

      // Client to Stripe
      // call Strioe.confirmCardPayment() with client_secret and card details
      // Stripe will attempt payment
      // Return the PaymentIntent with status 'succeeded'
      const confirmedCardPayment = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id,
        setup_future_usage: 'off_session',
      });


      if (confirmedCardPayment.error) {
        // Show error to your customer (e.g., insufficient funds)
        console.log(confirmedCardPayment.error.message);

        this.setState({
          cardError: confirmedCardPayment.error.message,
          submit: false
        })

      } else if (confirmedCardPayment.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
        console.log('confirmedCardPayment', confirmedCardPayment);


        const paymentDetails = {
          amount: confirmedCardPayment.paymentIntent.amount/100,
          currency: confirmedCardPayment.paymentIntent.currency,
          paymentTime: confirmedCardPayment.paymentIntent.created,
          payment_method: confirmedCardPayment.paymentIntent.payment_method_types[0],
          last4: paymentMethodReq.paymentMethod.card.last4,
          card_saved: (confirmedCardPayment.paymentIntent.setup_future_usage === "off_session") ? true: false,
          status: confirmedCardPayment.paymentIntent.status,	
        }
        
        const customerDetails = {
          customerId,
          billingDetails,
          paymentDetails,
        }
        this.props.successHandle(customerDetails);
      }

    }
    
  };

  // stripe.com/docs/js
  cardElementOptions = {
    // a way to inject styles into the CardElement iframe
    style: {
      base: {
        fontSize: '16px',
        color: '#000',
        '::placeholder': {
          color: '#87bbfd',
        },
      },
      invalid: {
        color: '#FFC7EE',
        iconColor: '#FFC7EE',
      },
    },
    hidePostalCode: true,
  };

  render() { console.log(this.props)
    const {stripe} = this.props;
    return (
      <form onSubmit={this.submitHandler}>
        <BillingDetail 
          amount = {this.state.plan.planPrice}
        />

        <div className="form-group">
          <label>Card Details</label>  
          <div className="CardElementContainer">
            <CardElement options={this.cardElementOptions} />
          </div>
        </div>

        <div className="cardError text-danger">
          <small>{this.state.cardError}</small>
        </div>

        <button className="btn btn-primary mt-4" type="submit" disabled={(this.state.submit)}>
          {
            (!this.state.submit) ? 'Pay Now' : 'Processing'
          }
        </button>
      </form>
    );
  };
};

export default CheckoutForm;