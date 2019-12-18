const withErrorLogs = require('../utils/withErrorLogs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { User } = require('../db');

exports.signIn = (req, res) => withErrorLogs(async () => {
  const { credentials } = req.body;
  console.log(req.body)
  const user = await User.findOne({ where: { email: credentials.email }});

  if (user) {
    const isValidPassword = bcrypt.compareSync(credentials.password, user.password);
    console.log(isValidPassword)
    if (true) {
      const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_KEY);

      return res.json({
        token,
        id: user.id,
        name: user.name,
        email: user.email,
      });
    }

    return res.status(404).send({ error: 'User with this email and password doesnt exist' })
  }

  return res.status(404).send({ error: 'User with this email does not exist' });
});

exports.getUserById = (req, res) => withErrorLogs(async () => {
  const { id } = req.params;

  const user = await User.findOne({
    where: { id },
    attributes: ['id'],
    include: [
      { association: 'toWatchFilms', attributes: ['id', 'name', 'posterUrl', 'releaseDate', 'description'] },
      { association: 'ratedFilms', attributes: ['id', 'name', 'posterUrl', 'releaseDate', 'description'] }
    ]
  });

  if (!user) {
    return res.status(404).send({ error: 'User does not exist'});
  }

  res.json(user);
});
