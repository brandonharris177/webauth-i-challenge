const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');
const restricted = require('./restriced-middleware');

const router = express();

router.use(helmet());
router.use(express.json());
router.use(cors());

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

  // console.log('session', req.session);

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.username = user.username;

        // console.log('session', req.session);
        res.status(200).json({
          message: `Welcome ${user.username}!`,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
  

router.get('/users', restricted, (req, res) => {
  console.log('username', req.session.username);
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;