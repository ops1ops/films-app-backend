const withErrorLogs = require('../utils/withErrorLogs');
const jwt = require('jsonwebtoken');

const { User } = require('../db');

exports.signIn = (req, res) => withErrorLogs(async () => {
  const { credentials } = req.body;
  console.log(req.body)
  const user = await User.findOne({ where: { email: credentials.email }});

  if (user) {
    console.log(user)
    // const isValidPassword = bcrypt.compareSync(credentials.password, user.password);
    console.log(user.password)
    const isValidPassword = credentials.password === user.password;
    if (isValidPassword) {
      const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_KEY);
      console.log(token)
      return res.json({
        token,
        id: user.id,
        name: user.name,
        email: user.email,
      });
    }

    return res.status(422).send({ error: 'User with this email and password doesnt exist' })
  }

  return res.status(404).send({ error: 'User with this email does not exist' });
});
