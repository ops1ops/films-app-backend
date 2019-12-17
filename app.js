require('dotenv').config();
const express = require('express');

const { DEFAULT_PORT, JSON_SPACES_NUMBER } = require('./constants/constants');
const { filmsRoute, actorsRoute, genresRoute, usersRoute, tvsRoute } = require('./routes');

const PORT = process.env.PORT || DEFAULT_PORT;
const app = express();

app.use(express.json());
app.set('json spaces', JSON_SPACES_NUMBER);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
  next();
});

app.use('/api', filmsRoute, actorsRoute, genresRoute, usersRoute, tvsRoute);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));