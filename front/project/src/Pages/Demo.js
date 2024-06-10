// Demo.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage, { Submit,  Username, Password, Title } from '@react-login-page/page5';


const Demo = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setMessage(''); // Réinitialiser le message
    try {
      // Validation des champs
      if (!username || !password) {
        setMessage('Veuillez remplir tous les champs');
        return;
      }

      // Effectuer une requête POST à votre endpoint de connexion
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      // Traiter la réponse du serveur
      const responseData = await response.json();
      if (response.ok) {
        // Connexion réussie
        setMessage('Connexion réussie');
        navigate('/home'); // Redirigez vers la page d'accueil
      } else {
        // Échec de la connexion
        setMessage(`Échec de la connexion: ${responseData.message}`);
      }
    } catch (error) {
      // Erreur lors de la connexion
      console.error('Erreur lors de la connexion:', error);
      setMessage('Erreur lors de la connexion. Veuillez réessayer plus tard.');
    }
  };

  return (
    <LoginPage style={css}>
      
      <Username
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Password
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Submit onClick={handleSubmit}>Connexion</Submit>
      <Title visible={false}>Login</Title>
      {message && <p>{message}</p>}
    </LoginPage>
  );
};

const css = {
  '--login-bg': '#5b6ef4',
  '--login-color': '#fff',
  '--login-input': '#333',
  '--login-input-bg': '#fff',
  '--login-input-before': 'rgb(62 41 255 / 15%)',
  '--login-input-after': 'rgb(49 141 255 / 20%)',
  '--login-btn': '#fff',
  '--login-btn-bg': '#5b6ef4',
  '--login-btn-focus': '#3648c6',
  '--login-btn-hover': '#3648c6',
  '--login-btn-active': '#5b6ef4',
  '--login-footer': '#ffffff99',
  height: '100%',
  width: '100%',
};

export default Demo;
