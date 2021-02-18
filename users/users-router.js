const router = require('express').Router();
const Users = require('./users-model.js');
const { restricted, validateUserId } = require('../middleware');

router.get('/', restricted, (req,res) => {
  Users.find()
    .then(users => {
      res.status(200).json({ data: users });
    })
    .catch(error => res.send(error))
});

module.exports = router
