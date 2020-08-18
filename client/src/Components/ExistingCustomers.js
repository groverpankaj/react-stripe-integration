import React from 'react';

import { loadStripe } from '@stripe/stripe-js';
import { Elements, ElementsConsumer } from '@stripe/react-stripe-js';

import CheckoutForm from './SubComponents/CheckoutExistingCustomers';

const stripePromise = loadStripe(process.env.PUBLISHABLE_KEY);

const customerDetails = {
  id: 'cus_HrH46PekDF6SU2',
  name: 'Simon',
  amount: 250,
};

const CustomerInfo = () => (
  <div>
    <Elements stripe={stripePromise}>
      <ElementsConsumer>
        {({ elements, stripe }) => (
          <CheckoutForm elements={elements} stripe={stripe} customerDetails={customerDetails} />
        )}
      </ElementsConsumer>
    </Elements>
  </div>
);

export default CustomerInfo;

// For hooks
//  <div>
//   <Elements stripe={stripePromise}>
//     <CheckoutForm />
//   </Elements>
// </div>
