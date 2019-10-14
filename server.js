const express = require('express');

const UsersRouter = require('./users/users-router');

const server = express();

server.use(express.json());
server.use('/api', UsersRouter);

server.get('/', (req, res) => {
    res.json(`index is working`);
});

module.exports = server;