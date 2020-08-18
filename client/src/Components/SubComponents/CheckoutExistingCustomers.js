import React, { Component } from 'react';
import axios from 'axios';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import moment from 'moment';


class CheckoutForm extends Component {

  state = {
    submit: false,
    cardError: '',
    paymentIntent: '',
    success: false,
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

    // From client to server
    // Send order information
    // return PaymentIntent's client_secret
    const amount = this.props.customerDetails.amount;
    const customerId = this.props.customerDetails.id;
    console.log('customerId', customerId)

    
    const { data: paymentIntent } = await axios({
      method: 'POST',
      url: '/api/payment_intent_existing',
      data: {
        amount,
        customerId,
      },
    });

    console.log(paymentIntent);

    if (paymentIntent.status === 'succeeded') {
      this.setState({
        submit: false,
        paymentIntent,
        success: true,
      })
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

  render() {
    const {stripe} = this.props;
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-6">
            {
              (!this.state.success) ?
                (
                  <div>
                    <p><b>Charge Customer:</b> {this.props.customerDetails.name} for {this.props.customerDetails.amount/100}</p>
                    <form onSubmit={this.submitHandler}>
                      <button className="btn btn-primary mt-4" type="submit" disabled={(this.state.submit)}>
                        {
                          (!this.state.submit) ? 'Submit' : 'Processing'
                        }
                      </button>
                    </form>
                  </div>
                ) :
                <div>
                  <p className="text-success mb-4">The Payment has been processed successfully</p>
                  <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col" colSpan="2" className="text-center">Existing Customer</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Customer Id</th>
                      <td>{this.state.paymentIntent.customer}</td>
                    </tr>
                    <tr>
                      <th scope="row">Amount</th>
                      <td>{this.state.paymentIntent.amount_received/100}</td>
                    </tr>
                    <tr>
                      <th scope="row">Currency</th>
                      <td>{this.state.paymentIntent.currency}</td>
                    </tr>
                    <tr>
                      <th scope="row">Status</th>
                      <td>{this.state.paymentIntent.status}</td>
                    </tr>
                    <tr>
                      <th scope="row">Transaction Time</th>
                      <td>{moment.utc(this.state.paymentIntent.created, 'X').format('YYYY-MM-DD HH:mm:ss')}</td>
                    </tr>
                    <tr>
                      <th scope="row">Payment Method</th>
                      <td>{this.state.paymentIntent.payment_method_types[0]}</td>
                    </tr>
                  </tbody>
                </table>
                </div>    
            }
            
          </div>
        </div>
      </div>
    );
  };
};

export default CheckoutForm;