import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '@fontsource/playfair-display/700-italic.css';


const Root = () => {
  useEffect(() => {
    AOS.init({
      duration: 2500, // ⏱️ Slow and smooth
      easing: 'ease-in-out', // 💨 Fluid motion
      once: false,
      offset: 80,
    });
  }, []);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
