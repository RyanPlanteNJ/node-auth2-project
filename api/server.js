const express = require('express')
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/users-Router');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(morgan('dev'));

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.status(200).json({ api: "It's Morphin Time"})
});

module.exports = server;
