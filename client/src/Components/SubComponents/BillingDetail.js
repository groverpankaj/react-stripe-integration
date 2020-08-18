import React from 'react';
import FormField from './FormField';

const BillingDetail = ( {amount} ) => (
  <div>
    <FormField
      name="amount"
      label="Amount"
      type="text"
      value={amount}
      readOnly
    />
    <FormField
      name="name"
      label="Name"
      type="text"
      placeholder="Jane Doe"
      required
    />
    <FormField
      name="email"
      label="Email"
      type="email"
      placeholder="jane.doe@example.com"
      required
    />
    <FormField
      name="address"
      label="Address"
      type="text"
      placeholder="185 Berry St. Suite 550"
      required
    />
    <FormField
      name="city"
      label="City"
      type="text"
      placeholder="San Francisco"
      required
    />
    <FormField
      name="state"
      label="State"
      type="text"
      placeholder="California"
      required
    />
    <FormField
      name="zip"
      label="ZIP"
      type="text"
      placeholder="94103"
      required
    />
  </div>
);

export default BillingDetail;
