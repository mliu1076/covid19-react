import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './Home';
import Data from './Data';
import Map from './Map';
import IpBox from './IpBox';
import { UserLocationProvider } from './UserLocation';
import './App.css';

function NavBar({ onAboutClick }) {
  const navigate = useNavigate();

  return (
    <nav className="nav-bar">
      <button onClick={() => navigate('/')}>Home</button>
      <button onClick={() => navigate('/map')}>Map</button>
      <button onClick={() => navigate('/data')}>Data</button>
      <button onClick={onAboutClick}>About</button>
    </nav>
  );
}

function AppContent() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <header className="app-header flex items-center justify-center">
        <h1 className="wave-gradient text-6xl font-extrabold">
          &#x1f9a0; COVID-19 Map Visualization
       </h1>
      </header>
      <NavBar onAboutClick={() => setShowModal(true)} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/data" element={<Data />} />
      </Routes>

      <IpBox />

      <footer className="app-footer">
        <a
          href="https://github.com/mliu1076"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
        >
          <img
            src="https://img.icons8.com/ios11/512/228BE6/github.png"
            alt="GitHub"
            className="github-icon"
          />
        </a>
        © 2025 Max Liu. All rights reserved.
      </footer>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="modal-close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>About This App</h2>
            <p>This is a React app showcasing yearly COVID-19 stats from 2020 to 2023 through user and Google API Map interactions.</p>
            <p>
              It uses Google Maps API for mapping, BigDataCloud for reverse geocoding, REST Countries for country currency and flags, 
              Supabase API for database management, and IP-API for user geolocation.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <UserLocationProvider>
      <Router>
        <AppContent />
      </Router>
    </UserLocationProvider>
  );
}

export default App;