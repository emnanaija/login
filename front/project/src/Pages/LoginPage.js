import React, { useState } from 'react';
import '../Assets/styles.css'; // Assurez-vous d'avoir votre fichier CSS importé correctement
import { ReactComponent as AccountCircleIcon } from '../Assets/account.svg'; // Importez l'icône SVG
import { ReactComponent as LockIcon } from '../Assets/lock.svg'; // Importez l'icône SVG pour "lock"
import logo from '../Assets/bt.png'; // Importez votre logo
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Si la requête est réussie (status 200), vous pouvez rediriger ou effectuer d'autres actions
        console.log('Authentification réussie');
        navigate('/home');
      } else {
        console.error('Échec de l\'authentification');
      }
    } catch (error) {
      console.error('Une erreur est survenue lors de l\'envoi de la requête', error);
    }
  };

  return (
    <div className="login">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <h2>Banque de Tunisie</h2>
      <h3>Bienvenue!</h3>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="textbox">
          <input 
           
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <span className="icon-container">
            <AccountCircleIcon className="icon" />
          </span>
        </div>
        <div className="textbox">
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <span className="icon-container">
            <LockIcon className="icon" />
          </span>
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default LoginPage;
