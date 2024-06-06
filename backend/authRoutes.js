const express = require('express');
const router = express.Router();
const pool = require('./db');

// Route de connexion
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Tentative de connexion:', { username, password });

  try {
    // Exécutez une requête SQL pour vérifier les informations d'identification
    const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
    console.log('Résultat de la requête:', result.rows);

    // Vérifiez si un utilisateur a été trouvé
    if (result.rows.length > 0) {
      // Authentification réussie
      res.status(200).json({ message: 'Authentication successful' });
    } else {
      // Nom d'utilisateur ou mot de passe incorrect
      console.log('Nom d\'utilisateur ou mot de passe incorrect');
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
