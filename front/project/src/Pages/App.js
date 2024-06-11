// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Demo from './Demo';
import Home from './Home';
import Layout from '../Layouts/Layout';
import '../App.css';
import '../index.css';
import AccountFormPage from './AccountFormPage'; // Importez le composant de la page de formulaire

import LoginPage from './LoginPage'; // Importez la page de connexion

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Demo />} />
          <Route path="/home" element={<Layout><Home /></Layout>} />
          <Route path="/add-account" element={<Layout><AccountFormPage /></Layout>} />
          <Route path="/login" element={<LoginPage />} /> 


        </Routes>
      </div>
    </Router>
  );
}

export default App;
