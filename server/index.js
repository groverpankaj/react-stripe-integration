import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { matchPath, StaticRouter } from 'react-router-dom';
import serialize from 'serialize-javascript';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Stripe from 'stripe';

import App from '../client/src/Components/App';
import routes from '../client/src/Components/routes';

const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.port || 3000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('./client/dist'));

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

const stripe = new Stripe(process.env.SECRET_KEY);

app.post('/api/payment_intents', async (req, res) => {
  try {
    const { amount } = req.body;
    const { name } = req.body;
    const { email } = req.body;

    // Server to Stripe  -- Create a PaymentIntent on your server with an amount and currency
    // POST /v1/payment_intents
    // Return new PaymentIntent
    const customer = await stripe.customers.create({
      name,
      email,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      customer: customer.id,
    });

    res.status(200).json({ customerId: customer.id, clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
});

app.post('/api/payment_intent_existing', async (req, res) => {
  try {
    console.log('Existing server recd', req.body);

    const { amount } = req.body;
    const { customerId } = req.body;

    // console.log('amount, customer', amount, customerId);

    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: 'card',
    });

    // console.log('paymentMethods', paymentMethods);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      customer: customerId,
      payment_method: paymentMethods.data[0].id,
      off_session: true,
      confirm: true,
    });

    res.status(200).send(paymentIntent);
  } catch (err) {
    console.log('Error code is: ', err.code);
    res.status(500).send(err);
    // const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(err.raw.payment_intent.id);
    // console.log('PI retrieved: ', paymentIntentRetrieved);
    // res.status(500).json({ statusCode: 500, message: paymentIntentRetrieved });
  }
});

app.get('*', (req, res, next) => {
  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {};
  console.log('activeRoute', activeRoute)
  console.log('req.url', req.url)
  let namePass = '';
  if (activeRoute.fetchInitialData) {
    namePass = activeRoute.fetchInitialData(req.url);
  }

  console.log('namePass', namePass);

  const context = { namePass };

  const markup = renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>,
  );

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <script src="/bundle.js" defer></script>
      <script>window.__INITIAL_DATA__= ${serialize(namePass)}</script>
      </head>
    <body>
      <div id="app">${markup}</div>
    </body>
    </html>
  `);
});
