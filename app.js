const express = require('express');
const app = express();

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.end('<h1>Test</h1>')
});

app.get('/films', (req, res) => {
  res.end('<h1>Films</h1>')
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
});