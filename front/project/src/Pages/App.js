import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Demo from './Demo';
import Home from './Home';
import Layout from '../Layouts/Layout';
import '../App.css';
import '../index.css';

import LoginPage from './LoginPage'; // Importez la page de connexion
import AddTypeTaux from './AddTypeTaux'; // Importez le nouveau composant
import TypeTauxList from './TypeTauxList'; // Importez le composant TypeTauxList

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Demo />} />
          <Route path="/home" element={<Layout><Home /></Layout>} />
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/add-type-taux" element={<Layout><AddTypeTaux /></Layout>} /> 
          <Route path="/typetaux" element={<Layout><TypeTauxList /></Layout>} /> 

        </Routes>
      </div>
    </Router>
  );
}

export default App;
