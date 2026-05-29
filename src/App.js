import React, { useState, useEffect } from 'react';
import './App.css';
import ramo from './assets/ramo.png';
import noivo from './assets/noivo.jpg';
import noiva from './assets/noiva.jpg';
import recepcao from './assets/recepcao.jpg';
import Slide1 from './assets/Slide1.jpg';
import Slide2 from './assets/Slide2.jpg';
import Slide3 from './assets/Slide3.jpg';
import Slide4 from './assets/Slide4.png';
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
import WalletStripe from './components/WalletStripe/WalletStripe';
import brasilFlag from './assets/brasil.jpg';
import colombiaFlag from './assets/colombia.jpg';
import { Modal } from 'antd';
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
      welcome:
        'Sejam bem-vindos ao nosso sonho! No dia 29 de agosto, cercados pelo verde da natureza e sob a luz do entardecer, vamos dar o passo mais importante das nossas vidas. Escolhemos cada detalhe com muito carinho e estamos ansiosos para compartilha-los com as pessoas que mais amamos. Aguardamos vocês, Morganna & Rafael',
      countdown: 'CONTAGEM REGRESSIVA',
      days: 'DIAS',
      hours: 'HORAS',
      minutes: 'MINUTOS',
      seconds: 'SEGUNDOS',
      couple: 'O CASAL',
      coupleText:
        'Esta história de amor nasceu em uma pista de dança, em um casamento, e cresceu apesar da distância. Com paciência, respeito e amor mútuo, nos demos conta de que queríamos passar o resto de nossas vidas juntos. O brilho intenso e apaixonado em nossos olhos nos lembra o porquê de termos chegado tão longe.',
      reception: 'RECEPÇÃO',
      receptionText:
        'O casal convida para recepção no dia 29 de agosto de 2026, às 15 horas e 30 minutos, no Recanto Pampulha (Av. Otacílio Negrão de Lima, n.º 7.630, Bairro Pampulha, Belo Horizonte, Minas Gerais, Brasil).',
      gifts: 'LISTA DE PRESENTES',
      giftButton: 'Presentear',
      weddingPlace:
        'Local do casamento 💍. Recanto Pampulha — Av. Otacílio Negrão de Lima, 7630 - Pampulha, Belo Horizonte - MG',
      paymentForm: 'Formas de pagamento',
    },

    es: {
      welcome:
        '¡Sean bienvenidos a nuestro sueño! El día 29 de agosto, rodeados por el verde de la naturaleza y bajo la luz del atardecer, vamos a dar el paso más importante de nuestras vidas. Escogimos cada detalle con mucho cariño y estamos ansiosos por compartirlos con las personas que más amamos. Los esperamos, Morganna & Rafael',
      countdown: 'CUENTA REGRESIVA',
      days: 'DÍAS',
      hours: 'HORAS',
      minutes: 'MINUTOS',
      seconds: 'SEGUNDOS',
      couple: 'LA PAREJA',
      coupleText:
        'Esta historia de amor nació en una pista de baile, en un matrimonio, y creció a pesar de la distancia. Con paciencia, respeto y amor mutuo nos dimos cuenta que queriamos pasar el resto de la vida juntos. El brillo intenso y apasionado en nuestros ojos nos recuerda por qué hemos llegado tan lejos.',
      reception: 'RECEPCIÓN',
      receptionText:
        'La pareja los invita a la recepción el día 29 de agosto de 2026, a las 15 horas e 30 minutos, no Recanto Pampulha (Av. Otacílio Negrão de Lima, n.º 7.630, Barrio Pampulha, Belo Horizonte, Minas Gerais, Brasil).',
      gifts: 'LISTA DE REGALOS',
      giftButton: 'Regalar',
      weddingPlace:
        'Lugar de la boda 💍. Recanto Pampulha — Av. Otacílio Negrão de Lima, 7630 - Pampulha, Belo Horizonte - MG',
      paymentForm: 'Formas de pago',
    },
  };

  const t = translations[language];

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

  const presentear = (presente) => {
    setSelectedItem(presente);
    setModalPresente(true);
  };

  function moneyToStripe(value) {
    return Math.round(Number(value.replace('R$', '').replace(/\./g, '').replace(',', '.')) * 100);
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

  const position = [-19.85497, -43.97319];

  return (
    <div className="app">
      <MusicPlayer />
      {/* TOPO COM BANDEIRAS */}
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
        <div>
          <p>{t.countdown}</p>
        </div>
        <div></div>
        <div className="row">
          <div className="boxStyle">
            <div className="numberStyle">{timeLeft.days}</div>
            <div className="labelStyle" S>
              {t.days}
            </div>
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
        <img src={ramo} className="img-ramo" alt="Ramo de Flores" />
        <h1 className="title">{t.couple}</h1>
        <div className="noivos">
          <div className="noiva">
            <img src={noiva} alt="Noiva" className="foto-noivos" /> <p>MORGANNA</p>
          </div>
          <div className="noivo">
            <img src={noivo} alt="Noivo" className="foto-noivos" /> <p>RAFAEL</p>
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
          loop={true}
        >
          <SwiperSlide>
            <div className="slide-container">
              <img src={Slide1} alt="Slide 1" className="slide-image" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slide-container">
              <img src={Slide2} alt="Slide 2" className="slide-image" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slide-container">
              <img src={Slide3} alt="Slide 3" className="slide-image" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slide-container">
              <img src={Slide4} alt="Slide 4" className="slide-image" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="recepcao">
        <img src={ramo} className="img-ramo" alt="Ramo de Flores" />
        <h1 className="title">{t.reception}</h1>
        <img src={recepcao} className="img-recepcao" alt="Local da recepcao" />
        <div className="recepcao-text">
          <p>{t.receptionText}</p>
        </div>
      </div>
      <div className="map">
        <MapContainer
          center={position}
          zoom={15}
          scrollWheelZoom={true}
          style={{ height: '300px', width: '90%', borderRadius: '16px' }}
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
        <img src={ramo} className="img-ramo" alt="Ramo de Flores" />
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
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
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
                      display: 'block',
                    }}
                  />
                  <CardContent sx={{ padding: '5px 0 0 0 !important' }}>
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
                      {presente.nome[language]}
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
                        background: '#001f3f',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        boxShadow: 'none',
                        '&:hover': { background: '#001f3f', boxShadow: 'none' },
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
          closable={{ 'aria-label': 'Custom Close Button' }}
          open={modalPresente}
          onOk={() => setModalPresente(false)}
          onCancel={() => setModalPresente(false)}
        >
          <Card
            key={selectedItem.id}
            sx={{
              borderRadius: '20px',
              border: '1px solid #e3e3e3',
              boxShadow: 'none',
              padding: '14px',
            }}
          >
            <Box
              component="img"
              src={selectedItem.imagem}
              alt={selectedItem.nome[language]}
              sx={{
                width: '100%',
                height: '180px',
                objectFit: 'cover',
                borderRadius: '18px',
                display: 'block',
              }}
            />
            <CardContent sx={{ padding: '5px 0 0 0 !important' }}>
              <Typography
                sx={{
                  textAlign: 'center',
                  fontSize: '14px',
                  color: '#555',
                  lineHeight: '26px',
                  minHeight: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {selectedItem.nome[language]}
              </Typography>
              <Typography
                sx={{
                  textAlign: 'center',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#444',
                  marginTop: '10px',
                }}
              >
                {selectedItem.preco}
              </Typography>
              <FormControl
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '10px',
                }}
              >
                <FormLabel id={`payment-label`}>{t.paymentForm}</FormLabel>
                <RadioGroup row aria-labelledby={`payment-label`} name="row-radio-buttons-group">
                  <FormControlLabel
                    value="pix"
                    control={<Radio onChange={() => setPaymentForm('pix')} />}
                    label="Pix"
                  />
                  <FormControlLabel
                    value="nequi"
                    control={<Radio onChange={() => setPaymentForm('nequi')} />}
                    label="Llave Bre-B"
                  />
                  <FormControlLabel
                    value="card"
                    control={<Radio onChange={() => setPaymentForm('card')} />}
                    label="Cartão"
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
                  <p>Instruções para pagamento via Pix:</p>
                </div>
              )}
              {paymentForm === 'nequi' && (
                <div className="nequi">
                  <p>Instruciones para pago con Llave Bre-B:</p>
                </div>
              )}
            </CardContent>
          </Card>
        </Modal>
      )}
    </div>
  );
}

export default App;
