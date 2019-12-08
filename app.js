require('dotenv').config();
const express = require('express');
const filmsRoute = require('./routes/films');

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.set('json spaces', 4);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
  next();
});

app.use('/api', filmsRoute);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));