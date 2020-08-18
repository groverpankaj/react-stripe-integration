import React, { Component } from 'react';

import { loadStripe } from '@stripe/stripe-js';
import { Elements, ElementsConsumer } from '@stripe/react-stripe-js';

import CheckoutForm from './SubComponents/CheckoutFormClass';
import Success from './SubComponents/Success';

const stripePromise = loadStripe(process.env.PUBLISHABLE_KEY);

class CustomerInfo extends Component {
  constructor(props) {
    super(props);

    let planSelected = '';

    if (__isBrowser__) {
      // Client side rendering
      planSelected = window.__INITIAL_DATA__;
      delete window.__INITIAL_DATA__;
    } else {
      // Server Side Rendering
      planSelected = props.staticContext.data;
    }

    let planPrice;
    if (planSelected === 'monthly') {
      planPrice = 9.99;
    }
    if (planSelected === 'halfYearly') {
      planPrice = 59.99;
    }
    if (planSelected === 'yearly') {
      planPrice = 99.99;
    }

    this.state = {
      plan: {
        planSelected,
        planPrice,
      },
      success: false,
      faliure: false,
      customerDetails: {},
    };

    this.successHandler = this.successHandler.bind(this);
  }

  successHandler(customerDetails) {
    this.props.history.push({
      pathname: '/success',
      data: customerDetails,
    });
  }

  render() {
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-md-3">
            &nbsp;
          </div>
          <div className="col-md-6">
            { (!this.state.success && !this.state.faliure) 
              ? (
                <Elements stripe={stripePromise}>
                  <ElementsConsumer>
                    {({ elements, stripe }) => (
                      <CheckoutForm elements={elements} stripe={stripe} plan={this.state.plan} successHandle={this.successHandler} />
                    )}
                  </ElementsConsumer>
                </Elements>
              )
              : (this.state.success)
                ? (
                  <Success
                    customerDetails={this.state.customerDetails}
                  />
                ) : null
            }
          </div>
          <div className="col-md-3">
            &nbsp;
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerInfo;

// For hooks
//  <div>
//   <Elements stripe={stripePromise}>
//     <CheckoutForm />
//   </Elements>
// </div>
