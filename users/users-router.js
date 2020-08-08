const router = require('express').Router();
const Users = require('./users-model.js');
const { restricted } = require('../middleware');

router.get('/', restricted, (req,res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => res.send(error))
});

// router

module.exports = router
