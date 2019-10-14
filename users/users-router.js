const express = require('express');

const Users = require('./users-model');

const router = express.Router();

router.get('/', (req, res) => {
res.json('working from router')
});

module.exports = router;