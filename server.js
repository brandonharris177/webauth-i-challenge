const express = require('express');

const RecipesRouter = require('./users/users-router');

const server = express();

server.use(express.json());
server.use('/api', RecipesRouter);

server.get('/', (req, res) => {
    res.json(`index is working`);
});

module.exports = server;