const bcryptjs = require('bcryptjs')
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets.js');

const Users = require('../users/users-model.js');
const { isValid, generateToken } = require('../middleware.js');

router.post('/register', (req, res) => {
  const credentials = req.body;
  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 12;
    const hash = bcryptjs.hashSync(credentials.password, rounds);
    credentials.password = hash;

    Users.add(credentials)
      .then(user => {
        const token = generateToken(user);
        res.status(201).json({data: user, token});
      })
      .catch(error => {
        res.status(500).json({ message: error.message});
      });
    } else {
      res.status(400).json({ message: "Give us your info otherwise we'll have to steal your gold"})
    }
});

router.post('/login', (req, res) => {
  const {username, password } = req.body;

  if (isValid(req.body)) {
    Users.findBy({ username: username})
      .then(([user]) => {
        if(user && bcryptjs.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({
            message: "Welcome to the Mines of Moria", token
          });
        } else {
          res.status(401).json({message: "This isn't a mine: it's a tomb" })
        }
      })
      .catch(error => {
        res.status(500).json({ mesage: error.message });
      });
  } else {
    res.status(400).json({
      message: "Please provide correct credentials or we'll have to steal your gold"
    });
  }

})

module.exports = router;
