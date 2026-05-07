import { useState } from 'react';
import axios from 'axios';
import { Wallet } from '@mercadopago/sdk-react';

export default function WalletMercadoPago() {
  const [preferenceId, setPreferenceId] = useState(null);

  const createPreference = async () => {
    const response = await axios.post('http://localhost:3333/create-preference', {
      items: [
        {
          title: 'Serviço de Desenvolvimento',
          quantity: 1,
          price: 1,
        },
      ],
    });

    setPreferenceId(response.data.id);
  };

  return (
    <div style={styles.container}>
      <h1>Pagamento Mercado Pago</h1>

      {!preferenceId && (
        <button style={styles.button} onClick={createPreference}>
          Pagar com Mercado Pago
        </button>
      )}

      {preferenceId && (
        <div style={{ minHeight: 350, marginTop: 20 }}>
          <Wallet
            initialization={{ preferenceId }}
            customization={{
              texts: { valueProp: 'smart_option' },
            }}
          />
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 420,
    margin: '80px auto',
    padding: 20,
    border: '1px solid #ddd',
    borderRadius: 8,
    textAlign: 'center',
  },
  button: {
    padding: '12px 20px',
    fontSize: 16,
    cursor: 'pointer',
  },
};
