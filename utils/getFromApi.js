const axios = require('axios');

module.exports = async (url) => {
  const response = await axios.get(url);
  const { headers: { 'x-ratelimit-remaining': limit } } = response;
  console.log('LIMIT', limit)
  if (limit === '1') {
    console.log('TIMEOUT STARTED ', new Date());
    await new Promise((res) => {
      setTimeout(() => {
        console.log('TIMEOUT FINISHED ', new Date());
        res();
      }, 8000);
    });
  }
  return response;
};