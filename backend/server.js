const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./Routes/authRoutes');
const typeTauxRoutes = require('./Routes/typeTauxRoutes'); // Importez les routes pour typetaux

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to the backend server');
});

app.use('/auth', authRoutes);
app.use('/typetaux', typeTauxRoutes); // Utilisez les routes pour typetaux

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
