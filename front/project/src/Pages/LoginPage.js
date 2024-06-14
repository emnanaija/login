import React, { useState } from 'react';
import '../Assets/styles.css'; // Assurez-vous d'avoir votre fichier CSS importé correctement
import { ReactComponent as AccountCircleIcon } from '../Assets/account.svg'; // Importez l'icône SVG
import { ReactComponent as LockIcon } from '../Assets/lock.svg'; // Importez l'icône SVG pour "lock"
import logo from '../Assets/logoo.png'; // Importez votre logo
import { useNavigate } from 'react-router-dom';
import loginSchema from '../Schemas/validationSchema'; // Importez le schéma de validation

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState(''); // État pour les erreurs d'authentification
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation avec Zod
    const result = loginSchema.safeParse({ username, password });

    if (!result.success) {
      // Extraire les messages d'erreur
      const newErrors = {};
      result.error.errors.forEach((error) => {
        newErrors[error.path[0]] = error.message;
      });
      setErrors(newErrors);
      return;
    }

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
        // Si l'authentification échoue
        setAuthError("Nom d'utilisateur ou mot de passe incorrect");
      }
    } catch (error) {
      console.error('Une erreur est survenue lors de l\'envoi de la requête', error);
      setAuthError("Une erreur est survenue. Veuillez réessayer plus tard.");
    }
  };

  return (
    <div className="login">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <h2>E-bank</h2>
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
  {errors.username && <div className="error-message">{errors.username}</div>}
  
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
  {errors.password && <div className="error-message">{errors.password}</div>}
  
  {authError && <div className="auth-error">{authError}</div>}
  
  <button type="submit">Se connecter</button>
</form>

    </div>
  );
}

export default LoginPage;
