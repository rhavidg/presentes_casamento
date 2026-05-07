// function Carteira() {
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

import React, { useState, useEffect } from 'react';
import './App.css';
import Wallet from './components/Wallet/Wallet';
import ramo from './assets/ramo.png';
import noivo from './assets/noivo.jpg';
import noiva from './assets/noiva.jpg';
import recepcao from './assets/recepcao.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function App() {
  const position = [-19.9167, -43.9345]; // Belo Horizonte
  const targetDate = new Date('2026-08-29T00:00:00');

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const styles = {
    slide: {
      height: '300px',
      background: '#fff',
      color: '#333',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      borderRadius: '12px',
    },
  };

  const presentes = [
    {
      id: 1,
      nome: '2 Passagens Aéreas para a Lua de Mel',
      preco: 'R$1.914,53',
      imagem:
        'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 2,
      nome: 'Abajur Decorativo',
      preco: 'R$253,84',
      imagem:
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 3,
      nome: 'Adega de Vinhos Climatizada',
      preco: 'R$1.538,41',
      imagem:
        'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 4,
      nome: 'Aluguel de Carro para a Lua de Mel',
      preco: 'R$1.851,85',
      imagem:
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
    },
  ];
  return (
    <div className="app">
      {/* <Wallet /> */}
      <div className="cover-image" />
      <div className="welcome-text">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non pulvinar lorem, sit
          amet lacinia dui. Suspendisse potenti. Donec congue dapibus mi. Fusce tempor ex id luctus
          varius. Maecenas ac lorem non sapien tincidunt interdum vel eget neque. Praesent tempus
          nunc gravida odio euismod, quis fermentum ipsum sollicitudin. Donec sed nibh vestibulum,
          mollis diam a, pretium magna. Donec sit amet fermentum urna. Integer sit amet arcu a justo
          pretium aliquet. Curabitur facilisis sed lacus ut fringilla. Vestibulum eleifend enim eu
          justo elementum vestibulum. Donec scelerisque diam nunc, eget iaculis nisi aliquam non.
        </p>
      </div>
      <div className="countdown">
        <div>
          <p>CONTAGEM</p>
          <p>REGRESSIVA</p>
        </div>
        <div></div>
        <div className="row">
          <div className="boxStyle">
            <div className="numberStyle">{timeLeft.days}</div>
            <div className="labelStyle" S>
              DIAS
            </div>
          </div>

          <div className="boxStyle">
            <div className="numberStyle">{timeLeft.hours}</div>
            <div className="labelStyle">HORAS</div>
          </div>

          <div className="boxStyle">
            <div className="numberStyle">{timeLeft.minutes}</div>
            <div className="labelStyle">MINUTOS</div>
          </div>

          <div className="boxStyle">
            <div className="numberStyle">{timeLeft.seconds}</div>
            <div className="labelStyle">SEGUNDOS</div>
          </div>
        </div>
      </div>
      <div className="sobre-noivos">
        <img src={ramo} className="img-ramo" alt="Ramo de Flores" />
        <h1 className="title">O CASAL</h1>
        <div className="noivos">
          <div className="noiva">
            <img src={noiva} alt="Noiva" className="foto-noivos" />
            <p>MARIA</p>
          </div>
          <div className="noivo">
            <img src={noivo} alt="Noivo" className="foto-noivos" />
            <p>JOAO</p>
          </div>
        </div>
        <div className="noivos-text">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non pulvinar lorem, sit
            amet lacinia dui. Suspendisse potenti. Donec congue dapibus mi. Fusce tempor ex id
            luctus varius. Maecenas ac lorem non sapien tincidunt interdum vel eget neque. Praesent
            tempus nunc gravida odio euismod, quis fermentum ipsum sollicitudin. Donec sed nibh
            vestibulum, mollis diam a, pretium magna. Donec sit amet fermentum urna. Integer sit
            amet arcu a justo pretium aliquet. Curabitur facilisis sed lacus ut fringilla.
            Vestibulum eleifend enim eu justo elementum vestibulum. Donec scelerisque diam nunc,
            eget iaculis nisi aliquam non.
          </p>
        </div>
      </div>
      <div className="carousel">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000 }}
          loop={true}
        >
          <SwiperSlide>
            <div style={styles.slide}>Slide 1</div>
          </SwiperSlide>

          <SwiperSlide>
            <div style={styles.slide}>Slide 2</div>
          </SwiperSlide>

          <SwiperSlide>
            <div style={styles.slide}>Slide 3</div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="recepcao">
        <img src={ramo} className="img-ramo" alt="Ramo de Flores" />
        <h1 className="title">RECEPÇÃO</h1>
        <img src={recepcao} className="img-recepcao" alt="Local da recepcao" />
        <div className="recepcao-text">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non pulvinar lorem, sit
            amet lacinia dui. Suspendisse potenti. Donec congue dapibus mi. Fusce tempor ex id
            luctus varius. Maecenas ac lorem non sapien tincidunt interdum vel eget neque. Praesent
            tempus nunc gravida odio euismod, quis fermentum ipsum sollicitudin.
          </p>
        </div>
      </div>
      <div className="map">
        <MapContainer
          center={position}
          zoom={15}
          scrollWheelZoom={true}
          style={{
            height: '300px',
            width: '90%',
            borderRadius: '16px',
          }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={position}>
            <Popup>Local do casamento 💍</Popup>
          </Marker>
        </MapContainer>
      </div>
      <div className="lista-presentes">
        <img src={ramo} className="img-ramo" alt="Ramo de Flores" />
        <h1 className="title">LISTA DE PRESENTES</h1>
        <Box
          sx={{
            background: '#f7f7f7',
            minHeight: '100vh',
            padding: '20px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              width: '100%',
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr 1fr',
                  md: '1fr 1fr 1fr',
                },
                gap: '16px',
              }}
            >
              {presentes.map((presente) => (
                <Card
                  key={presente.id}
                  sx={{
                    borderRadius: '20px',
                    border: '1px solid #e3e3e3',
                    boxShadow: 'none',
                    padding: '14px',
                  }}
                >
                  <Box
                    component="img"
                    src={presente.imagem}
                    alt={presente.nome}
                    sx={{
                      width: '100%',
                      height: '180px',
                      objectFit: 'cover',
                      borderRadius: '18px',
                      display: 'block',
                    }}
                  />

                  <CardContent
                    sx={{
                      padding: '5px 0 0 0 !important',
                    }}
                  >
                    <Typography
                      sx={{
                        textAlign: 'center',
                        fontSize: '18px',
                        color: '#555',
                        lineHeight: '26px',
                        minHeight: '80px',

                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {presente.nome}
                    </Typography>

                    <Typography
                      sx={{
                        textAlign: 'center',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#444',
                        marginTop: '10px',
                      }}
                    >
                      {presente.preco}
                    </Typography>

                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        marginTop: '22px',
                        height: '55px',
                        borderRadius: '16px',
                        background: '#b88673',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        boxShadow: 'none',

                        '&:hover': {
                          background: '#a97563',
                          boxShadow: 'none',
                        },
                      }}
                    >
                      Presentear
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default App;

// import { useState } from 'react';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Checkbox,
//   Box,
// } from '@mui/material';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import './App.css';

// function App() {
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

//   const toggleGift = (id) => {
//     setGifts(
//       gifts.map((gift) =>
//         gift.id === id ? { ...gift, checked: !gift.checked } : gift
//       )
//     );
//   };

//   return (
//     <Box className="app-container">
//       {/* Header com brasão e texto */}
//       <Box className="header">
//         <Box className="crest-container">
//           <img
//             src="https://via.placeholder.com/250x250?text=Brasão+do+Casamento"
//             alt="Brasão do Casamento"
//             className="crest"
//           />
//           <Typography variant="h4" className="welcome-text">
//             Bem-vindo à nossa lista de presentes! Ajude-nos a celebrar o início
//             da nossa jornada juntos.
//           </Typography>
//         </Box>
//       </Box>

//       {/* Lista de presentes em cards */}
//       <Box className="gift-list">
//         <Typography variant="h3" className="list-title">
//           Lista de Presentes <FavoriteIcon className="heart-icon" />
//         </Typography>
//         <Box className="cards-grid">
//           {gifts.map((gift) => (
//             <Card
//               key={gift.id}
//               className={`gift-card ${gift.checked ? 'checked' : ''}`}
//               elevation={3}
//             >
//               <CardContent className="card-content">
//                 <Box className="card-header">
//                   <Checkbox
//                     checked={gift.checked}
//                     onChange={() => toggleGift(gift.id)}
//                     color="primary"
//                     className="checkbox"
//                   />
//                   <Typography variant="h5" className="gift-name">
//                     {gift.name}
//                   </Typography>
//                 </Box>
//                 <Typography variant="body1" className="gift-description">
//                   {gift.description}
//                 </Typography>
//               </CardContent>
//             </Card>
//           ))}
//         </Box>
//       </Box>
//     </Box>
//   );
// }

// export default App;
