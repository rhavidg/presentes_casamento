import { useEffect, useMemo, useState } from 'react';

import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'pk_test_51SjafnL6sfqeya20UZAntfNI4Sm8M3H7CfIs8awpWmMQajwuwrSwNqn6PqpdlUqzlTtEOQ7qNZarqeTBOsm2HCPr00GGGc8vql',
);

function getStripeLocale() {
  const language = navigator.language;

  if (language.startsWith('pt')) {
    return 'pt-BR';
  }

  if (language.startsWith('es')) {
    return 'es';
  }
  
  return 'en';
}

export default function WalletStripe() {
  const [clientSecret, setClientSecret] =
    useState('');

  const [loadingPayment, setLoadingPayment] =
    useState(true);

  const [locale, setLocale] = useState(
    getStripeLocale(),
  );

  useEffect(() => {
    criarPagamento();
  }, []);

  // Detecta mudança de idioma do navegador
  useEffect(() => {
    function handleLanguageChange() {
      setLocale(getStripeLocale());
    }

    window.addEventListener(
      'languagechange',
      handleLanguageChange,
    );

    return () => {
      window.removeEventListener(
        'languagechange',
        handleLanguageChange,
      );
    };
  }, []);

  async function criarPagamento() {
    try {
      setLoadingPayment(true);

      const response = await fetch(
        'http://localhost:3333/create-payment-intent',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            amount: 5000,
          }),
        },
      );

      const data = await response.json();

      console.log(data);

      setClientSecret(data.clientSecret);
    } catch (error) {
      console.log(error);

      alert('Erro ao iniciar pagamento');
    } finally {
      setLoadingPayment(false);
    }
  }

  const elementsOptions = useMemo(
    () => ({
      clientSecret,
      locale,
    }),
    [clientSecret, locale],
  );

  if (loadingPayment || !clientSecret) {
    return <h1>Carregando pagamento...</h1>;
  }

  return (
    <Elements
      key={`${clientSecret}-${locale}`}
      stripe={stripePromise}
      options={elementsOptions}
    >
      <CheckoutForm
        criarPagamento={criarPagamento}
      />
    </Elements>
  );
}

function CheckoutForm({ criarPagamento }) {
  const stripe = useStripe();

  const elements = useElements();

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] =
    useState('');

  const [successMessage, setSuccessMessage] =
    useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    setErrorMessage('');

    setSuccessMessage('');

    const result = await stripe.confirmPayment({
      elements,

      confirmParams: {
        return_url:
          'http://localhost:3000/sucesso',
      },

      redirect: 'if_required',
    });

    setLoading(false);

    // ERROS
    if (result.error) {
      console.log(result.error);

      switch (result.error.code) {
        case 'card_declined':
          setErrorMessage(
            'Cartão recusado.',
          );
          break;

        case 'expired_card':
          setErrorMessage(
            'Cartão expirado.',
          );
          break;

        case 'incorrect_cvc':
          setErrorMessage('CVV inválido.');
          break;

        case 'processing_error':
          setErrorMessage(
            'Erro ao processar pagamento.',
          );
          break;

        case 'insufficient_funds':
          setErrorMessage(
            'Saldo insuficiente.',
          );
          break;

        case 'invalid_expiry_year':
          setErrorMessage(
            'Ano de expiração inválido.',
          );
          break;

        case 'invalid_expiry_month':
          setErrorMessage(
            'Mês de expiração inválido.',
          );
          break;

        case 'authentication_required':
          setErrorMessage(
            'Autenticação necessária.',
          );
          break;

        default:
          setErrorMessage(
            result.error.message ||
              'Erro ao processar pagamento.',
          );
      }

      return;
    }

    // STATUS
    if (result.paymentIntent) {
      switch (result.paymentIntent.status) {
        case 'succeeded':
          setSuccessMessage(
            'Pagamento aprovado com sucesso!',
          );
          break;

        case 'processing':
          setSuccessMessage(
            'Pagamento em processamento.',
          );
          break;

        case 'requires_payment_method':
          setErrorMessage(
            'Pagamento recusado. Tente outro cartão.',
          );
          break;

        case 'requires_action':
          setErrorMessage(
            'Pagamento requer autenticação.',
          );
          break;

        case 'canceled':
          setErrorMessage(
            'Pagamento cancelado.',
          );
          break;

        default:
          setSuccessMessage(
            `Status: ${result.paymentIntent.status}`,
          );
      }
    }
  }

  async function handleNovoPagamento() {
    setErrorMessage('');

    setSuccessMessage('');

    await criarPagamento();
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />

      {errorMessage && (
        <div
          style={{
            color: 'red',
            marginTop: 12,
            fontSize: 14,
          }}
        >
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div
          style={{
            color: 'green',
            marginTop: 12,
            fontSize: 14,
          }}
        >
          {successMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{
          marginTop: 20,
        }}
      >
        {loading
          ? 'Processando...'
          : 'Pagar'}
      </button>

      {(successMessage ||
        errorMessage) && (
        <button
          type="button"
          onClick={handleNovoPagamento}
          style={{
            marginTop: 12,
            marginLeft: 12,
          }}
        >
          Novo pagamento
        </button>
      )}
    </form>
  );
}