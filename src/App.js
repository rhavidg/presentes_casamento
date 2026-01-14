// import { useState } from 'react';
// import axios from 'axios';
// import { Wallet } from '@mercadopago/sdk-react';

// export default function App() {
//   const [preferenceId, setPreferenceId] = useState(null);

//   const createPreference = async () => {
//     const response = await axios.post(
//       'http://localhost:3333/create-preference',
//       {
//         items: [
//           {
//             title: 'Serviço de Desenvolvimento',
//             quantity: 1,
//             price: 150,
//           },
//         ],
//       }
//     );

//     setPreferenceId(response.data.id);
//   };

//   return (
//     <div style={styles.container}>
//       <h1>Pagamento Mercado Pago</h1>

//       {!preferenceId && (
//         <button style={styles.button} onClick={createPreference}>
//           Pagar com Mercado Pago
//         </button>
//       )}

//       {preferenceId && (
//         <div style={{ minHeight: 350, marginTop: 20 }}>
//           <Wallet
//             initialization={{ preferenceId }}
//             customization={{
//               texts: { valueProp: 'smart_option' },
//             }}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// const styles = {
//   container: {
//     maxWidth: 420,
//     margin: '80px auto',
//     padding: 20,
//     border: '1px solid #ddd',
//     borderRadius: 8,
//     textAlign: 'center',
//   },
//   button: {
//     padding: '12px 20px',
//     fontSize: 16,
//     cursor: 'pointer',
//   },
// };

// function App() {
//   const pagar = async () => {
//     const response = await fetch('http://localhost:3333/criar-pagamento', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     const data = await response.json();

//     console.log('Resposta backend:', data);

//     if (!data.url) {
//       alert('Erro ao gerar pagamento');
//       return;
//     }

//     window.location.href = data.url;
//   };

//   return (
//     <div style={{ padding: 40 }}>
//       <h2>Pagamento com PagBank</h2>
//       <button onClick={pagar}>Pagar</button>
//     </div>
//   );
// }

// export default App;

// import React, { useState } from 'react';
// import './App.css'; // Você pode adicionar estilos personalizados aqui

// // Importe fontes do Google Fonts (adicione ao seu index.html ou use uma biblioteca como @fontsource)
// // Exemplo: <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display&display=swap" rel="stylesheet">

// function App() {
//   // Estado para a lista de presentes (exemplo simples)
//   const [gifts, setGifts] = useState([
//     {
//       id: 1,
//       name: 'Jogo de Talheres',
//       description: 'Para nossa nova cozinha',
//       checked: false,
//     },
//     {
//       id: 2,
//       name: 'Toalhas de Banho',
//       description: 'Conjunto de 4 peças',
//       checked: false,
//     },
//     {
//       id: 3,
//       name: 'Aparelho de Jantar',
//       description: 'Para 6 pessoas',
//       checked: false,
//     },
//     {
//       id: 4,
//       name: 'Máquina de Café',
//       description: 'Para começar o dia bem',
//       checked: false,
//     },
//   ]);

//   // Função para marcar/desmarcar um presente
//   const toggleGift = (id) => {
//     setGifts(
//       gifts.map((gift) =>
//         gift.id === id ? { ...gift, checked: !gift.checked } : gift
//       )
//     );
//   };

//   return (
//     <div className="app">
//       {/* Header com brasão e texto */}
//       <header className="header">
//         {/* Espaço para o brasão - substitua pela URL da sua imagem */}
//         <img
//           src="https://via.placeholder.com/200x200?text=Brasão+do+Casamento"
//           alt="Brasão do Casamento"
//           className="brasao"
//         />
//         {/* Texto breve abaixo do brasão */}
//         <p className="welcome-text">
//           Bem-vindo à nossa lista de presentes! Ajude-nos a celebrar o início da
//           nossa jornada juntos.
//         </p>
//       </header>

//       {/* Lista de presentes */}
//       <main className="gift-list">
//         <h2 className="list-title">Lista de Presentes</h2>
//         <ul>
//           {gifts.map((gift) => (
//             <li
//               key={gift.id}
//               className={`gift-item ${gift.checked ? 'checked' : ''}`}
//             >
//               <input
//                 type="checkbox"
//                 checked={gift.checked}
//                 onChange={() => toggleGift(gift.id)}
//               />
//               <div className="gift-details">
//                 <h3>{gift.name}</h3>
//                 <p>{gift.description}</p>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </main>
//     </div>
//   );
// }

// export default App;

import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  Box,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './App.css';

function App() {
  const [gifts, setGifts] = useState([
    {
      id: 1,
      name: 'Jogo de Talheres',
      description: 'Para nossa nova cozinha',
      checked: false,
    },
    {
      id: 2,
      name: 'Toalhas de Banho',
      description: 'Conjunto de 4 peças',
      checked: false,
    },
    {
      id: 3,
      name: 'Aparelho de Jantar',
      description: 'Para 6 pessoas',
      checked: false,
    },
    {
      id: 4,
      name: 'Máquina de Café',
      description: 'Para começar o dia bem',
      checked: false,
    },
  ]);

  const toggleGift = (id) => {
    setGifts(
      gifts.map((gift) =>
        gift.id === id ? { ...gift, checked: !gift.checked } : gift
      )
    );
  };

  return (
    <Box className="app-container">
      {/* Header com brasão e texto */}
      <Box className="header">
        <Box className="crest-container">
          <img
            src="https://via.placeholder.com/250x250?text=Brasão+do+Casamento"
            alt="Brasão do Casamento"
            className="crest"
          />
          <Typography variant="h4" className="welcome-text">
            Bem-vindo à nossa lista de presentes! Ajude-nos a celebrar o início
            da nossa jornada juntos.
          </Typography>
        </Box>
      </Box>

      {/* Lista de presentes em cards */}
      <Box className="gift-list">
        <Typography variant="h3" className="list-title">
          Lista de Presentes <FavoriteIcon className="heart-icon" />
        </Typography>
        <Box className="cards-grid">
          {gifts.map((gift) => (
            <Card
              key={gift.id}
              className={`gift-card ${gift.checked ? 'checked' : ''}`}
              elevation={3}
            >
              <CardContent className="card-content">
                <Box className="card-header">
                  <Checkbox
                    checked={gift.checked}
                    onChange={() => toggleGift(gift.id)}
                    color="primary"
                    className="checkbox"
                  />
                  <Typography variant="h5" className="gift-name">
                    {gift.name}
                  </Typography>
                </Box>
                <Typography variant="body1" className="gift-description">
                  {gift.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default App;
