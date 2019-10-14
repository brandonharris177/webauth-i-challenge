const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');

const router = express();

router.use(helmet());
router.use(express.json());
router.use(cors());

router.get('/', (req, res) => {
    Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get users' });
    });
});

router.post('/register', (req, res) => {
    let user = req.body;
  
    // validate the user
  
    // hash the password
    const hash = bcrypt.hashSync(user.password, 8);
  
    // we override the password with the hash
    user.password = hash;
  
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  
router.post('/login', (req, res) => {
let { username, password } = req.body;
if (username && password) {
    Users.findBy({ username })
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}! you are logged in` });
        } else {
        res.status(401).json({ message: 'You cannot pass!!' });
        }
    })
    .catch(error => {
        res.status(500).json(error);
    });
} else {
    res.status(400).json({ message: 'please provide credentials' });
}
});

router.get('/users', (req, res) => {
    Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get users' });
    });
});

module.exports = router;