import React, { useState, useEffect } from 'react';
import './App.css';

import ramo from './assets/ramo.png';
import noivo from './assets/noivo.jpg';
import noiva from './assets/noiva.jpg';
import recepcao from './assets/recepcao.png';

import brasilFlag from './assets/brasil.jpg';
import colombiaFlag from './assets/colombia.png';

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

import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

import { Modal } from 'antd';

import WalletStripe from './components/WalletStripe/WalletStripe';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function App() {
  const [language, setLanguage] = useState('pt');
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalPresente, setModalPresente] = useState(false);
  const [paymentForm, setPaymentForm] = useState('pix');

  const translations = {
    pt: {
      welcome: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      countdown: 'CONTAGEM REGRESSIVA',
      days: 'DIAS',
      hours: 'HORAS',
      minutes: 'MINUTOS',
      seconds: 'SEGUNDOS',
      couple: 'O CASAL',
      coupleText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      reception: 'RECEPÇÃO',
      receptionText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      gifts: 'LISTA DE PRESENTES',
      giftButton: 'Presentear',
      weddingPlace:
        'Recanto Pampulha — Av. Otacílio Negrão de Lima, 7630 - Pampulha, Belo Horizonte - MG',
      paymentForm: 'Formas de pagamento',
    },

    es: {
      welcome: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      countdown: 'CUENTA REGRESIVA',
      days: 'DÍAS',
      hours: 'HORAS',
      minutes: 'MINUTOS',
      seconds: 'SEGUNDOS',
      couple: 'LA PAREJA',
      coupleText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      reception: 'RECEPCIÓN',
      receptionText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      gifts: 'LISTA DE REGALOS',
      giftButton: 'Regalar',
      weddingPlace:
        'Recanto Pampulha — Av. Otacílio Negrão de Lima, 7630 - Pampulha, Belo Horizonte - MG',
      paymentForm: 'Formas de pago',
    },
  };

  const t = translations[language];

  const targetDate = new Date('2026-08-29T00:00:00');

  const calculateTimeLeft = () => {
    const now = new Date();

    const difference = targetDate - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
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

  function moneyToStripe(value) {
    return Math.round(Number(value.replace('R$', '').replace(/\./g, '').replace(',', '.')) * 100);
  }

  const presentear = (presente) => {
    setSelectedItem(presente);
    setModalPresente(true);
  };

  const presentes = [
    {
      id: 1,
      nome: {
        pt: '2 Passagens Aéreas para a Lua de Mel',
        es: '2 Pasajes Aéreos para la Luna de Miel',
      },
      preco: 'R$1.914,53',
      imagem:
        'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop',
    },

    {
      id: 2,
      nome: {
        pt: 'Abajur Decorativo',
        es: 'Lámpara Decorativa',
      },
      preco: 'R$253,84',
      imagem:
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
    },

    {
      id: 3,
      nome: {
        pt: 'Adega de Vinhos Climatizada',
        es: 'Cava de Vinos Climatizada',
      },
      preco: 'R$1.538,41',
      imagem:
        'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?q=80&w=1200&auto=format&fit=crop',
    },

    {
      id: 4,
      nome: {
        pt: 'Aluguel de Carro para a Lua de Mel',
        es: 'Alquiler de Auto para la Luna de Miel',
      },
      preco: 'R$1.851,85',
      imagem:
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
    },
  ];

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

  const position = [-19.85497, -43.97319];

  return (
    <div className="app">
      <MusicPlayer />

      <div className="language-selector">
        <img
          src={brasilFlag}
          alt="Português"
          onClick={() => setLanguage('pt')}
          className={language === 'pt' ? 'active-flag' : ''}
        />

        <img
          src={colombiaFlag}
          alt="Español"
          onClick={() => setLanguage('es')}
          className={language === 'es' ? 'active-flag' : ''}
        />
      </div>

      <div className="cover-image" />

      <div className="welcome-text">
        <p>{t.welcome}</p>
      </div>

      <div className="countdown">
        <p>{t.countdown}</p>

        <div className="row">
          <div className="boxStyle">
            <div className="numberStyle">{timeLeft.days}</div>
            <div className="labelStyle">{t.days}</div>
          </div>

          <div className="boxStyle">
            <div className="numberStyle">{timeLeft.hours}</div>
            <div className="labelStyle">{t.hours}</div>
          </div>

          <div className="boxStyle">
            <div className="numberStyle">{timeLeft.minutes}</div>
            <div className="labelStyle">{t.minutes}</div>
          </div>

          <div className="boxStyle">
            <div className="numberStyle">{timeLeft.seconds}</div>
            <div className="labelStyle">{t.seconds}</div>
          </div>
        </div>
      </div>

      <div className="sobre-noivos">
        <img src={ramo} className="img-ramo" alt="Ramo" />

        <h1 className="title">{t.couple}</h1>

        <div className="noivos">
          <div className="noiva">
            <img src={noiva} alt="Noiva" className="foto-noivos" />
            <p>MORGANNA</p>
          </div>

          <div className="noivo">
            <img src={noivo} alt="Noivo" className="foto-noivos" />
            <p>RAFAEL</p>
          </div>
        </div>

        <div className="noivos-text">
          <p>{t.coupleText}</p>
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
          loop
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
        <img src={ramo} className="img-ramo" alt="Ramo" />

        <h1 className="title">{t.reception}</h1>

        <img src={recepcao} className="img-recepcao" alt="Recepção" />

        <div className="recepcao-text">
          <p>{t.receptionText}</p>
        </div>
      </div>

      <div className="map">
        <MapContainer
          center={position}
          zoom={15}
          scrollWheelZoom
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
            <Popup>{t.weddingPlace}</Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="lista-presentes">
        <img src={ramo} className="img-ramo" alt="Ramo" />

        <h1 className="title">{t.gifts}</h1>

        <Box
          sx={{
            background: '#f7f7f7',
            minHeight: '100vh',
            padding: '20px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
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
                    alt={presente.nome[language]}
                    sx={{
                      width: '100%',
                      height: '180px',
                      objectFit: 'cover',
                      borderRadius: '18px',
                    }}
                  />

                  <CardContent>
                    <Typography
                      sx={{
                        textAlign: 'center',
                        fontSize: '18px',
                      }}
                    >
                      {presente.nome[language]}
                    </Typography>

                    <Typography
                      sx={{
                        textAlign: 'center',
                        fontSize: '24px',
                        fontWeight: 'bold',
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
                      }}
                      onClick={() => presentear(presente)}
                    >
                      {t.giftButton}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Box>
      </div>

      {modalPresente && selectedItem && (
        <Modal
          title="Detalhes do Presente"
          open={modalPresente}
          onCancel={() => setModalPresente(false)}
          footer={null}
        >
          <Typography sx={{ marginBottom: '15px' }}>{selectedItem.nome[language]}</Typography>

          <Typography sx={{ marginBottom: '20px' }}>{selectedItem.preco}</Typography>

          <FormControl>
            <FormLabel>{t.paymentForm}</FormLabel>

            <RadioGroup row value={paymentForm}>
              <FormControlLabel
                value="pix"
                control={<Radio />}
                label="Pix"
                onChange={() => setPaymentForm('pix')}
              />

              <FormControlLabel
                value="nequi"
                control={<Radio />}
                label="Llave Bre-B"
                onChange={() => setPaymentForm('nequi')}
              />

              <FormControlLabel
                value="card"
                control={<Radio />}
                label="Cartão"
                onChange={() => setPaymentForm('card')}
              />
            </RadioGroup>
          </FormControl>

          {paymentForm === 'card' && (
            <div className="stripe">
              <WalletStripe amount={moneyToStripe(selectedItem.preco)} />
            </div>
          )}

          {paymentForm === 'pix' && (
            <div className="pix">
              <p>Instruções para pagamento via Pix</p>
            </div>
          )}

          {paymentForm === 'nequi' && (
            <div className="nequi">
              <p>Instruciones para pago con Llave Bre-B</p>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

export default App;
