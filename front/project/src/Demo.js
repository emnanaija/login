import React, { useState } from 'react';
import LoginPage, { Submit, Logo, Username, Password } from '@react-login-page/page5';
import logo from './bt.png'; // Importez votre image PNG

const Demo = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    setMessage(''); // Réinitialiser le message
    try {
      // Effectuer une requête POST à votre endpoint de connexion
      console.log('Tentative de connexion avec les identifiants:', { username, password });
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      // Vérifier si la réponse est OK
      if (!response.ok) {
        // Si la réponse est une erreur, extraire le message d'erreur de la réponse JSON
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }

      // Traiter la réponse du serveur
      const responseData = await response.json();
      console.log('Réponse du serveur:', responseData);

      // Connexion réussie, rediriger l'utilisateur vers une page sécurisée ou afficher un message de succès
      setMessage('Connexion réussie');
    } catch (error) {
      // Gérer les erreurs
      console.error('Erreur lors de la connexion:', error);
      setMessage(`Échec de la connexion: ${error.message}`);
    }
  };

  return (
    <LoginPage style={css}>
      <Logo>
        <img src={logo} alt="Logo" style={{ width: 150, height: 200 }} />
      </Logo>
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
