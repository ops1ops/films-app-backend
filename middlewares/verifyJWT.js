const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {

      if (err) {
        return res.status(422).send({ error: 'Invalid token' })
      }

      req.userId = decoded.id;

      next();
    });
  } else {
    return res.status(401).send({ error: 'No token provided'})
  }
};
