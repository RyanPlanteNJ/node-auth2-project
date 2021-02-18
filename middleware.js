const Users = require('./users/users-model.js');
const jwt = require('jsonwebtoken');
const secrets = require('./config/secrets.js');

module.exports = {
  validateUserId: function (req, res, next) {
    Users.findById(req.params.id)
    .then(user => {
      if(user) {
        req.user = user;
        next()
      } else {
        res.status(404).json({
          message: 'The User is a lie (user does not exist)'
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'GLaDOS left. Try again some other time (Server error)'})
    });
  },

  isValid: function(user) {
    return Boolean(user.username && user.password && typeof user.password === 'string');
  },

  restricted: function (req,res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      if (token){
        jwt.verify(token, secrets.jwtSecret, (error, decodedToken) => {
          if (error) {
            res.status(401).json({ you: "what's taters, precious? "});
          } else {
            req.decodedJwt = decodedToken;
            console.log(req.decodedJwt);
            next();
          }
        })
      } else {
        throw new Error('invalid auth data');
      }
    } catch (error) {
      res.status(401).json({ error: error.message});
    }
  },

  makeCheckRole: function(role){
    return function (req, res, next) {
      if (req.decodedJwt.role && req.decodedJwt.role === role) {
        next();
      } else {
        res.status(403).json({ you: 'You have no power here' });
      }
    }
  },

  generateToken: function(user) {
    const payload = {
      subject: user.id,
      username: user.username,
      department: user.department
    };

    const options = {
      expiresIn: "2h"
    };

    return jwt.sign(payload, secrets.jwtSecret, options);

  }
}
