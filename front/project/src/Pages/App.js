// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Demo from './Demo';
import Home from './Home';
import Layout from '../Layouts/Layout';
import '../App.css';
import '../index.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Demo />} />
          <Route path="/home" element={<Layout><Home /></Layout>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
