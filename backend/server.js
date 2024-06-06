const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./authRoutes');

const app = express();

app.use(bodyParser.json());

// Définir une route pour les requêtes GET vers "/"
app.get('/', (req, res) => {
  res.send('Welcome to the backend server');
});

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
