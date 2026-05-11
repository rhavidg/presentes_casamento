// MERCADO PAGO
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import { initMercadoPago } from '@mercadopago/sdk-react';
// console.log('MP KEY:', import.meta.env.VITE_MP_PUBLIC_KEY);
// initMercadoPago('TEST-d75842f6-7230-41a0-8200-aed9e04db751', {
//   locale: 'pt-BR',
// });

// ReactDOM.createRoot(document.getElementById('root')).render(<App />);

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import { Elements } from '@stripe/react-stripe-js';

import { stripePromise } from './stripe';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Elements stripe={stripePromise}>
    <App />
  </Elements>,
);
