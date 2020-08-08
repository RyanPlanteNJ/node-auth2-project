const bcyrptjs = require('bcryptjs')
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets.js');

const Users = require('../users/users-model.js');
const { isValid } = require('../middleware.js');

router.post('/register', (req, res) => {
  const credentials = req.body;
  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 12;
    const hash = bcryptjs.hashSync(credentials.password, rounds);
    credentials.password = hash;



  }
})



module.exports = router;
