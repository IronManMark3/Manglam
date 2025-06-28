import React from 'react';
import { Routes, Route } from 'react-router-dom';
import routes from './routes';
import ScrollController from './components/common/ScrollController';

function App() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden text-black">
      {/* 🟨 Light Creamy Background */}
      <div className="absolute inset-0 z-0 bg-[#fefaf6]" />

      {/* 🧱 Main App Content Layer */}
      <div className="relative z-20">
        <ScrollController /> {/* ✅ Global scroll smoothness + sensitivity */}
        <Routes>
          {routes.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
        </Routes>
      </div>
    </div>
  );
}

export default App;
