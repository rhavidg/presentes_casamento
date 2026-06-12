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
import WalletAsaas from './components/WalletAsaas/WalletAsaas';

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
  const [visibleItems, setVisibleItems] = useState(6);

  const translations = {
    pt: {
      welcome:
        'Sejam bem-vindos ao nosso sonho! \n \n No dia 29 de agosto, cercados pelo verde da natureza e sob a luz do entardecer, vamos dar o passo mais importante das nossas vidas. \n Escolhemos cada detalhe com muito carinho e estamos ansiosos para compartilha-los com as pessoas que mais amamos. \n \n Aguardamos vocês, \n Morganna & Rafael',
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
      seeMore: 'Ver mais presentes',
    },

    es: {
      welcome:
        '¡Sean bienvenidos a nuestro sueño! \n \n El día 29 de agosto, rodeados por el verde de la naturaleza y bajo la luz del atardecer, vamos a dar el paso más importante de nuestras vidas. \n Escogimos cada detalle con mucho cariño y estamos ansiosos por compartirlos con las personas que más amamos. \n \n Los esperamos, \n Morganna & Rafael',
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
      seeMore: 'Ver más regalos',
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

  function formatAsaasValue(value) {
    if (typeof value === 'number') {
      return Number(value.toFixed(2));
    }

    return Number(
      value
        .replace(/[^\d,]/g, '')
        .replace(/\./g, '')
        .replace(',', '.'),
    );
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
      id: 0,
      nome: {
        pt: 'Teste',
        es: 'Teste',
      },
      preco: 'R$5,00',
      imagem: 'https://m.media-amazon.com/images/I/61FtzwngS0L._AC_SY300_SX300_QL70_ML2_.jpg',
    },
    {
      id: 1,
      nome: {
        pt: 'Conjunto de Copos Long Drink Nadir Opera 360 ml',
        es: 'Juego de vasos largos Nadir Opera, 360 ml',
      },
      preco: 'R$38,50',
      imagem: 'https://m.media-amazon.com/images/I/61FtzwngS0L._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 2,
      nome: {
        pt: 'Conjunto de Potes pra noiva parar de roubar os potes alheios',
        es: 'Juego de vasijas para evitar que la novia robe las vasijas de otras personas.',
      },
      preco: 'R$55,00',
      imagem: 'https://m.media-amazon.com/images/I/61UiGQhiNOL._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 3,
      nome: {
        pt: 'Lixeira para banheiro',
        es: 'Papelera del baño',
      },
      preco: 'R$58,30',
      imagem: 'https://m.media-amazon.com/images/I/31Bq-ckBoPL._SX342_SY445_QL70_ML2_.jpg',
    },

    {
      id: 4,
      nome: {
        pt: 'Manta',
        es: 'Frazada',
      },
      preco: 'R$66,00',
      imagem: 'https://m.media-amazon.com/images/I/51taaNnkAgS._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 5,
      nome: {
        pt: 'Afiador de facas',
        es: 'Afilador de cuchillos',
      },
      preco: 'R$89,10',
      imagem: 'https://m.media-amazon.com/images/I/618GkjY9CGL._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 6,
      nome: {
        pt: 'Lixeira para cozinha',
        es: 'Cubo de basura de cocina',
      },
      preco: 'R$99,00',
      imagem: 'https://m.media-amazon.com/images/I/31PeUhiUIRL._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 7,
      nome: {
        pt: 'Doação para a fundação de Rafa',
        es: 'Donación a la fundación de Rafa',
      },
      preco: 'R$100,00',
      imagem:
        'https://media.istockphoto.com/id/1417882544/pt/foto/large-group-of-cats-and-dogs-looking-at-the-camera-on-blue-background.jpg?s=612x612&w=0&k=20&c=p5pau38yZiPfhRGIwNOVB771NNepJphk7tRHttVjDRU=',
    },

    {
      id: 8,
      nome: {
        pt: 'Frigideira Antiaderente',
        es: 'Sartén antiadherente',
      },
      preco: 'R$107,69',
      imagem: 'https://m.media-amazon.com/images/I/51-jW6qP7YL._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 9,
      nome: {
        pt: 'Suporte para bolo',
        es: 'Soporte para pasteles',
      },
      preco: 'R$108,78',
      imagem: 'https://m.media-amazon.com/images/I/51F3tZyNaTL._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 10,
      nome: {
        pt: 'Cueca sexy para a noite de núpcia',
        es: 'Lencería sexy para la noche de bodas.',
      },
      preco: 'R$108,90',
      imagem:
        'https://media.istockphoto.com/id/1167387292/pt/vetorial/under-18-years-sign-mark-vector-illustration.jpg?s=612x612&w=0&k=20&c=l2WY_KgzGitSGya52701em2hC0aAxBrxWnJQS7hZfNg=',
    },

    {
      id: 11,
      nome: {
        pt: 'Panela de Arroz Elétrica',
        es: 'Olla arrocera eléctrica',
      },
      preco: 'R$119,79',
      imagem: 'https://m.media-amazon.com/images/I/51mK0ThSiRL._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 12,
      nome: {
        pt: 'Cota Operação Lua de Mel',
        es: 'Cuota de Operación Luna de Miel',
      },
      preco: 'R$121,00',
      imagem:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbUHnjdt97VkBITpCiYWQkbrg6oq_XFsC4vQ&s',
    },

    {
      id: 13,
      nome: {
        pt: 'Aluguel de pranchas de surfe',
        es: 'Alquiler de tablas de surf',
      },
      preco: 'R$121,00',
      imagem:
        'https://adaptive-images.uooucdn.com.br/tr:w-1100,h-1594,c-at_max,pr-true,q-80/a150-ofyzsg/pv/d9/12/e1/d15e7696e2a4238a4cd232af66.jpg',
    },

    {
      id: 14,
      nome: {
        pt: 'City tour com guia local',
        es: 'Visita guiada por la ciudad con un guía local luna de miel',
      },
      preco: 'R$127,05',
      imagem:
        'https://cdn6.campograndenews.com.br/uploads/noticias/2021/09/02/cbcd5abe26978aa22b11f4115f9606402f188110.jpg',
    },

    {
      id: 15,
      nome: {
        pt: 'Jogo Toalha de Banho Azul 4 Peças',
        es: 'Juego de toallas de baño azules, 4 piezas',
      },
      preco: 'R$133,10',
      imagem: 'https://m.media-amazon.com/images/I/61tBVVGk08L._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 16,
      nome: {
        pt: 'Jogo Para Churrasco Polywood Inox 3 Peças',
        es: 'Juego de barbacoa de acero inoxidable Polywood, 3 piezas',
      },
      preco: 'R$133,10',
      imagem: 'https://m.media-amazon.com/images/I/81NUeCtVs0L._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 17,
      nome: {
        pt: 'Aluguel de Stand-up Paddle',
        es: 'Alquiler de tablas de paddle surf',
      },
      preco: 'R$157,30',
      imagem:
        'https://decathlonstore.vtexassets.com/unsafe/fit-in/628x628/center/middle/https%3A%2F%2Fdecathlonpro.vtexassets.com%2Farquivos%2Fids%2F165874305%2Fpack-allround-sup-106-no-size-azul-unico1.jpg%3Fv%3D638742939016400000',
    },

    {
      id: 18,
      nome: {
        pt: 'Porta Doce de Porcelana 2 Níveis',
        es: 'Bombonera de porcelana de dos niveles',
      },
      preco: 'R$160,93',
      imagem: 'https://m.media-amazon.com/images/I/61D6aAacS8L._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 19,
      nome: {
        pt: '5 meses de streaming de filmes para o casal',
        es: 'Cinco meses de streaming de películas para la pareja.',
      },
      preco: 'R$176,00',
      imagem:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8_jQ6itKkchVMwRoaAYvYlQ0VmEIN79NrAA&s',
    },

    {
      id: 20,
      nome: {
        pt: 'Garanta novos filhos para os pais de planta',
        es: 'Nuevas plantas para la pareja',
      },
      preco: 'R$180,00',
      imagem:
        'https://images.unsplash.com/photo-1543459176-4426b37223ba?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBsYW50c3xlbnwwfHwwfHx8MA%3D%3D',
    },

    {
      id: 21,
      nome: {
        pt: 'Flores para Decoração',
        es: 'Flores para decoración',
      },
      preco: 'R$181,50',
      imagem: 'https://m.media-amazon.com/images/I/71NrDRiedDL._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 22,
      nome: {
        pt: 'Drink para os noivos na Lua de Mel',
        es: 'Unos tragos para los recién casados ​​en su luna de miel.',
      },
      preco: 'R$181,50',
      imagem:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi-LCfmD4-eebu3wwBJc5hj6tl64GI6ZQV4Q&s',
    },

    {
      id: 23,
      nome: {
        pt: 'Aula de culinária pro casal não morrer de fome',
        es: 'Clase de cocina para que la pareja no muera de hambre.',
      },
      preco: 'R$181,50',
      imagem:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3xHJ-i6F5n0iuu6wnHtwe_rGSwz8mFEHELA&s',
    },

    {
      id: 24,
      nome: {
        pt: 'Doação para a fundação de Rafa',
        es: 'Donación a la fundación de Rafa',
      },
      preco: 'R$200,00',
      imagem:
        'https://media.istockphoto.com/id/1417882544/pt/foto/large-group-of-cats-and-dogs-looking-at-the-camera-on-blue-background.jpg?s=612x612&w=0&k=20&c=p5pau38yZiPfhRGIwNOVB771NNepJphk7tRHttVjDRU=',
    },

    {
      id: 25,
      nome: {
        pt: 'Ajuda para creche de Alice durante a lua de mel',
        es: 'Ayuda con el cuidado de Alice durante la luna de miel.',
      },
      preco: 'R$200,00',
      imagem:
        'https://img.nsctotal.com.br/wp-content/uploads/2024/06/Hotel-para-gatos-em-Florianopolis-tem-playground-academia-e-tratamento-5-estrelas-7.jpg',
    },

    {
      id: 26,
      nome: {
        pt: 'Mixer 3 em 1 Vermelho',
        es: 'Batidora 3 en 1, roja',
      },
      preco: 'R$204,49',
      imagem: 'https://m.media-amazon.com/images/I/411dxRUdznL._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 27,
      nome: {
        pt: 'Aspirador de Pó Vertical',
        es: 'Aspiradora vertical',
      },
      preco: 'R$211,75',
      imagem: 'https://m.media-amazon.com/images/I/510P6tjT3ZL._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 28,
      nome: {
        pt: 'Jogo de acessórios para banheiro',
        es: 'Juego de accesorios de baño',
      },
      preco: 'R$216,59',
      imagem: 'https://m.media-amazon.com/images/I/51EUPpkgdeL._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 29,
      nome: {
        pt: 'Jogo de Banho Buddemeyer',
        es: 'Juego de baño Buddemeyer',
      },
      preco: 'R$217,80',
      imagem: 'https://m.media-amazon.com/images/I/61T2RHNR8DL._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 30,
      nome: {
        pt: 'Jogo de copos - Tool Box',
        es: 'Juego de vasos',
      },
      preco: 'R$223,85',
      imagem: 'https://tbox.vtexassets.com/arquivos/ids/164994/245111_0.jpg?v=638749039350430000',
    },
    {
      id: 31,
      nome: {
        pt: 'Cota para perrengues na lua de mel',
        es: 'Cuota para imprevistos en la luna de miel',
      },
      preco: 'R$242,00',
      imagem:
        'https://static.vecteezy.com/ti/vetor-gratis/t2/8084989-dinheiro-saco-e-pilha-de-moeda-de-ouro-vetor.jpg',
    },

    {
      id: 32,
      nome: {
        pt: 'Cafeteira Elétrica',
        es: 'Cafetera eléctrica',
      },
      preco: 'R$254,10',
      imagem: 'https://m.media-amazon.com/images/I/71cM7xwJqXL._AC_SX300_SY300_QL70_ML2_.jpg',
    },

    {
      id: 33,
      nome: {
        pt: 'Conjunto de Assadeiras',
        es: 'Juego de fuentes para horno',
      },
      preco: 'R$254,10',
      imagem: 'https://m.media-amazon.com/images/I/51M7Bcnch1L._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 34,
      nome: {
        pt: 'Jogo de Taças para Vinho',
        es: 'Juego de copas para vino',
      },
      preco: 'R$266,20',
      imagem: 'https://m.media-amazon.com/images/I/61HrTUVvICL._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 35,
      nome: {
        pt: 'Kit para primeiros socorros domésticos',
        es: 'Kit de primeros auxilios para el hogar',
      },
      preco: 'R$272,25',
      imagem: 'https://m.media-amazon.com/images/I/61RY1rCmxmL._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 36,
      nome: {
        pt: 'Jogo de Lençol Casal',
        es: 'Juego de sábanas matrimonial',
      },
      preco: 'R$278,30',
      imagem: 'https://m.media-amazon.com/images/I/61Uy+uPEp6L._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 37,
      nome: {
        pt: 'Aparelho de Jantar 20 Peças',
        es: 'Vajilla de 20 piezas',
      },
      preco: 'R$290,40',
      imagem: 'https://m.media-amazon.com/images/I/61zFo6M5WLL._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 38,
      nome: {
        pt: 'Jogo de Panelas Antiaderente',
        es: 'Juego de ollas antiadherentes',
      },
      preco: 'R$302,50',
      imagem: 'https://m.media-amazon.com/images/I/5131vjv1suL._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 39,
      nome: {
        pt: 'Kit para café da manhã dos noivos',
        es: 'Kit para desayuno de los novios',
      },
      preco: 'R$302,50',
      imagem:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkfkpWo-BGO6shcT7ut0MqM0YFwZzfLr2Ttg&s',
    },

    {
      id: 40,
      nome: {
        pt: 'Ventilador',
        es: 'Ventilador',
      },
      preco: 'R$314,60',
      imagem: 'https://m.media-amazon.com/images/I/61o7Q8hq2zL._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 41,
      nome: {
        pt: 'Jogo de Toalhas Premium',
        es: 'Juego de toallas premium',
      },
      preco: 'R$326,70',
      imagem: 'https://m.media-amazon.com/images/I/611jKTcW9SL._AC_SX679_.jpg',
    },

    {
      id: 42,
      nome: {
        pt: 'Kit churrasco para o mestre da grelha',
        es: 'Kit de parrilla para el maestro de la parrilla',
      },
      preco: 'R$338,80',
      imagem: 'https://m.media-amazon.com/images/I/71DrcY44B4L._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 43,
      nome: {
        pt: 'Passeio romântico na lua de mel',
        es: 'Paseo romántico en la luna de miel',
      },
      preco: 'R$363,00',
      imagem:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXqPWgIWlx4IVEf29XnD21ZNz5Q2RvlGTh6A&s',
    },

    {
      id: 44,
      nome: {
        pt: 'Ferro de Passar',
        es: 'Plancha',
      },
      preco: 'R$375,10',
      imagem: 'https://m.media-amazon.com/images/I/71-L8b9C7lL._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 45,
      nome: {
        pt: 'Kit para noites de pizza em casa',
        es: 'Kit para noches de pizza en casa',
      },
      preco: 'R$387,20',
      imagem: 'https://m.media-amazon.com/images/I/610Uuuyn7mL._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 46,
      nome: {
        pt: 'Liquidificador',
        es: 'Licuadora',
      },
      preco: 'R$399,30',
      imagem: 'https://m.media-amazon.com/images/I/51ddQ2FJr-L._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 47,
      nome: {
        pt: 'Kit organização da casa',
        es: 'Kit de organización del hogar',
      },
      preco: 'R$423,50',
      imagem: 'https://m.media-amazon.com/images/I/71C0EPEwHcL._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 48,
      nome: {
        pt: 'Batedeira',
        es: 'Batidora',
      },
      preco: 'R$435,60',
      imagem: 'https://m.media-amazon.com/images/I/51aQCAmwRLL._AC_SX679_.jpg',
    },

    {
      id: 49,
      nome: {
        pt: 'Micro-ondas',
        es: 'Microondas',
      },
      preco: 'R$484,00',
      imagem: 'https://m.media-amazon.com/images/I/51fyuoyD1sL._AC_SX342_SY445_QL70_ML2_.jpg',
    },

    {
      id: 50,
      nome: {
        pt: 'Ajuda para mobiliar o lar',
        es: 'Ayuda para amueblar el hogar',
      },
      preco: 'R$500,00',
      imagem:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlJ0WrL2jREcsd9NRzul464zPaSl0wLH7yFA&s',
    },

    {
      id: 51,
      nome: {
        pt: 'Air Fryer',
        es: 'Freidora de aire',
      },
      preco: 'R$544,50',
      imagem: 'https://m.media-amazon.com/images/I/81RLJR4NbeL._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 52,
      nome: {
        pt: 'Smart Speaker',
        es: 'Altavoz inteligente',
      },
      preco: 'R$605,00',
      imagem: 'https://m.media-amazon.com/images/I/71nWVFteisL._AC_SY606_.jpg',
    },

    {
      id: 53,
      nome: {
        pt: 'Aspirador Robô',
        es: 'Robot aspirador',
      },
      preco: 'R$726,00',
      imagem: 'https://m.media-amazon.com/images/I/71ti8eTWLQL._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 54,
      nome: {
        pt: 'Jantar romântico completo',
        es: 'Cena romántica completa',
      },
      preco: 'R$726,00',
      imagem:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf3tHWwzIdNCCi_iTBpmBKBv8R-556l4MEoQ&s',
    },

    {
      id: 55,
      nome: {
        pt: 'Máquina de Café Espresso',
        es: 'Máquina de café espresso',
      },
      preco: 'R$847,00',
      imagem: 'https://m.media-amazon.com/images/I/71FXFo4kYiL._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 56,
      nome: {
        pt: 'Smart TV',
        es: 'Smart TV',
      },
      preco: 'R$968,00',
      imagem: 'https://m.media-amazon.com/images/I/61tCoc7NunL._AC_SX300_SY300_QL70_ML2_.jpg',
    },

    {
      id: 57,
      nome: {
        pt: 'Ajuda para entrada do apartamento',
        es: 'Ayuda para la entrada del apartamento',
      },
      preco: 'R$1000,00',
      imagem:
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/602045013.jpg?k=28d8c0a0f070c6f98746615ce35f7b27dbc0cbc70fe7b865009e3f4f3a4e06d0&o=',
    },

    {
      id: 58,
      nome: {
        pt: 'Geladeira',
        es: 'Refrigerador',
      },
      preco: 'R$1210,00',
      imagem: 'https://m.media-amazon.com/images/I/41EIiO9FP8L._AC_SX342_SY445_QL70_ML2_.jpg',
    },

    {
      id: 59,
      nome: {
        pt: 'Máquina de Lavar',
        es: 'Lavadora',
      },
      preco: 'R$1452,00',
      imagem: 'https://m.media-amazon.com/images/I/51j31MMQXrL._AC_SX342_SY445_QL70_ML2_.jpg',
    },

    {
      id: 60,
      nome: {
        pt: 'Lua de mel dos sonhos',
        es: 'La luna de miel de sus sueños',
      },
      preco: 'R$1815,00',
      imagem:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTpQikuS-XWmzlx-_WADqsz1f31Rm1Mlzduw&s',
    },
    {
      id: 61,
      nome: {
        pt: 'Aparelho de jantar em porcelana',
        es: 'Juego de vajilla de porcelana',
      },
      preco: 'R$700,59',
      imagem: 'https://m.media-amazon.com/images/I/71ITeD8YaZL._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 62,
      nome: {
        pt: 'Edredom',
        es: 'Edredón',
      },
      preco: 'R$724,79',
      imagem: 'https://m.media-amazon.com/images/I/71RDq03-uQL._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 63,
      nome: {
        pt: 'Jogo de Panelas Preto - 5 Peças',
        es: 'Juego de utensilios de cocina negros - 5 piezas',
      },
      preco: 'R$834,90',
      imagem: 'https://m.media-amazon.com/images/I/41-M0K7tnoL._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 64,
      nome: {
        pt: 'Aquecedor de toalhas',
        es: 'Calentador de toallas',
      },
      preco: 'R$880,00',
      imagem: 'https://m.media-amazon.com/images/I/61zkHp0UY9L._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 65,
      nome: {
        pt: 'Coifa de parede',
        es: 'Campana extractora',
      },
      preco: 'R$882,09',
      imagem: 'https://m.media-amazon.com/images/I/41utUUoXfEL._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 66,
      nome: {
        pt: 'Cota passagens aéreas para a Lua de Mel',
        es: 'Contribucion tiquetes de avión para la luna de miel',
      },
      preco: 'R$1.000,00',
      imagem: 'https://aquieassim.com.br/wp-content/uploads/2015/03/20150329_132539.jpg',
    },

    {
      id: 67,
      nome: {
        pt: 'Aparador Muse',
        es: 'Aparador Muse',
      },
      preco: 'R$1.052,70',
      imagem:
        'https://product-hub-prd.madeiramadeira.com.br/982929/images/eabfe303-b61a-4652-a2d5-8c715c259364naturalle1744842589200zoom.jpg?width=700&canvas=1:1&bg-color=FFF',
    },

    {
      id: 68,
      nome: {
        pt: 'Faqueiro gold',
        es: 'Juego de cubiertos dorados',
      },
      preco: 'R$1.101,10',
      imagem: 'https://m.media-amazon.com/images/I/61g--PP6kpL._AC_SX679_.jpg',
    },

    {
      id: 69,
      nome: {
        pt: 'Jogo de Lençol 300 Fios - Trosseau',
        es: 'Juego de sábanas de 300 hilos - Trosseau',
      },
      preco: 'R$1.149,50',
      imagem:
        'https://lojatrousseau.vtexassets.com/arquivos/ids/327881-800-auto?v=639094482098500000&width=800&height=auto&aspect=true',
    },

    {
      id: 70,
      nome: {
        pt: 'Cooktop 5 bocas - Brastemp',
        es: 'Estufa de cocción de 5 quemadores - Brastemp',
      },
      preco: 'R$1.452,00',
      imagem: 'https://m.media-amazon.com/images/I/51YMJtQrnnL._AC_SX342_SY445_QL70_ML2_.jpg',
    },

    {
      id: 71,
      nome: {
        pt: 'Prateleira para livros',
        es: 'Estante para libros',
      },
      preco: 'R$1.488,30',
      imagem: 'https://m.media-amazon.com/images/I/71x+baFq5XL._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 72,
      nome: {
        pt: 'Soundbar JBL Cinema SB160',
        es: 'Barra de sonido JBL Cinema SB160',
      },
      preco: 'R$1.512,50',
      imagem: 'https://m.media-amazon.com/images/I/51n1AK9rmdL._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 73,
      nome: {
        pt: 'Buffet 4 Portas cor Madeira Natural e Azul',
        es: 'Aparador de 4 puertas en madera natural y azul.',
      },
      preco: 'R$1.512,50',
      imagem:
        'https://mezmoveis.cdn.magazord.com.br/img/2025/09/produto/2654/mescla-4-portas-azul-1.jpg?ims=fit-in/600x600/filters:fill(white)',
    },

    {
      id: 74,
      nome: {
        pt: 'Sofá Lord',
        es: 'Sofá Lord',
      },
      preco: 'R$1.573,00',
      imagem:
        'https://product-hub-prd.madeiramadeira.com.br/135639050/images/ee08c8f8-a03a-4198-b2df-aafa3c9101936f978107standardresolution.jpg?width=700&canvas=1:1&bg-color=FFF',
    },

    {
      id: 75,
      nome: {
        pt: 'Chopeira 5 Litros',
        es: 'Dispensador de cerveza de 5 litros',
      },
      preco: 'R$1.754,50',
      imagem:
        'https://images.tcdn.com.br/img/img_prod/1288719/chopeira_termica_portatil_about_beer_5_litros_7_1_13ba2eb1f4d2b6cba8994d5218051c09.jpg',
    },

    {
      id: 76,
      nome: {
        pt: 'Forno a Gás de Embutir Brastemp',
        es: 'Horno de gas empotrable Brastemp',
      },
      preco: 'R$1.923,90',
      imagem:
        'https://brastemp.vtexassets.com/arquivos/ids/271155-800-auto?v=638997598543270000&width=800&height=auto&aspect=true',
    },

    {
      id: 77,
      nome: {
        pt: 'Panela Oval Signature - Le Creuset',
        es: 'Sartén Ovalada Signature - Le Creuset',
      },
      preco: 'R$1.996,50',
      imagem:
        'https://www.lecreuset.com.br/dw/image/v2/BDRT_PRD/on/demandware.static/-/Sites-le-creuset-br-master/default/dwe9d467ec/images/produto-lecreuset-panela-oval-chambray.png?sw=650&sh=650&sm=fit',
    },

    {
      id: 78,
      nome: {
        pt: 'Ar Condicionado Split Inverter 12000 BTUs',
        es: 'Aire acondicionado split inverter de 12000 BTU',
      },
      preco: 'R$2.297,79',
      imagem: 'https://m.media-amazon.com/images/I/51IO1FC6r5L._AC_SX342_SY445_QL70_ML2_.jpg',
    },

    {
      id: 79,
      nome: {
        pt: 'Smart TV 50" UHD 4K',
        es: 'Televisor inteligente UHD 4K de 50 pulgadas',
      },
      preco: 'R$2.530,00',
      imagem: 'https://m.media-amazon.com/images/I/61Hj1b864XL._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 80,
      nome: {
        pt: 'Lava-louças',
        es: 'Lavavajillas',
      },
      preco: 'R$2.662,00',
      imagem:
        'https://brastemp.vtexassets.com/arquivos/ids/269634-800-auto?v=638984623937330000&width=800&height=auto&aspect=true',
    },

    {
      id: 81,
      nome: {
        pt: 'Jogo de talheres',
        es: 'Juego de cubiertos',
      },
      preco: 'R$2.783,00',
      imagem:
        'https://letseatit.com.br/cdn/shop/files/PRE-VENDA-Faqueiro-Laguiole-La-Maison-Luxo-Azul-Marinho-18-Pecas.webp?v=1761954360&width=960',
    },

    {
      id: 82,
      nome: {
        pt: 'Lava e Seca Samsung 3 em 1 e Lavagem a Seco 11kg',
        es: 'Lavadora y secadora Samsung 3 en 1 con función de limpieza en seco, 11 kg',
      },
      preco: 'R$3.872,00',
      imagem: 'https://m.media-amazon.com/images/I/41HELBbb0WL._AC_SY300_SX300_QL70_ML2_.jpg',
    },

    {
      id: 83,
      nome: {
        pt: 'Patrocine a lua de mel dos noivos',
        es: 'Patrocina la luna de miel de los recién casados.',
      },
      preco: 'R$7.744,00',
      imagem:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPr-tmEKQfw03kEAokxGpO2F8g63PVRu6mAw&s',
    },

    {
      id: 84,
      nome: {
        pt: 'Poder ir junto com os noivos para a lua de mel',
        es: 'Poder ir de luna de miel con los recién casados',
      },
      preco: 'R$121.000,00',
      imagem:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTidf7XK2RxaIZ-KfkuiBfG1XDNuoggkxCG8Q&s',
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
              {presentes.slice(0, visibleItems).map((presente) => (
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
                      objectFit: 'contain',
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
                        '&:hover': {
                          background: '#001f3f',
                          boxShadow: 'none',
                        },
                      }}
                      onClick={() => presentear(presente)}
                    >
                      {t.giftButton}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>

            {visibleItems < presentes.length && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '32px',
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => setVisibleItems((prev) => prev + 6)}
                  sx={{
                    background: '#001f3f',
                    borderRadius: '16px',
                    padding: '12px 32px',
                    textTransform: 'none',
                    fontSize: '16px',
                    '&:hover': {
                      background: '#001f3f',
                    },
                  }}
                >
                  {t.seeMore}
                </Button>
              </Box>
            )}
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
                objectFit: 'contain',
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
                <RadioGroup
                  row
                  value={paymentForm}
                  onChange={(e) => setPaymentForm(e.target.value)}
                  aria-labelledby="payment-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel value="pix" control={<Radio />} label="Pix" />

                  <FormControlLabel value="nequi" control={<Radio />} label="Llave Bre-B" />

                  <FormControlLabel value="card" control={<Radio />} label="Cartão" />
                </RadioGroup>
              </FormControl>
              {paymentForm === 'card' && (
                <div className="stripe">
                  {/* <WalletStripe amount={moneyToStripe(selectedItem.preco)} /> */}
                  <WalletAsaas
                    amount={formatAsaasValue(selectedItem.preco)}
                    productName={selectedItem.nome[language]}
                    onPaymentSuccess={() => {
                      setModalPresente(false);
                      setSelectedItem(null);
                    }}
                  />
                </div>
              )}
              {paymentForm === 'pix' && (
                <div className="pix">
                  <p>Instruções para pagamento via Pix:</p>
                  <p>Chave - CPF: 058.764.985-21</p>
                </div>
              )}
              {paymentForm === 'nequi' && (
                <div className="nequi">
                  <p>Instruciones para pago con Llave Bre-B:</p>
                  <embed src="/llave.pdf" type="application/pdf" width="100%" height="600px" />
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
