const router = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('../../data/dbConfig');
const tokenBuilder = require('./buildToken');
const {
  registerUsername,
	checkBody,
	usernameLogin,
      } = require('../middleware/authentication-middleware');

router.post('/register', checkBody, registerUsername, async (req, res, next) => { // eslint-disable-line
      let user = req.body;
      const hash = bcrypt.hashSync(user.password, 8);
        user.password = hash;
      const id  = await db('users').insert(user);
      const User = await db('users').where('id', id).first();
        res.status(201).json(User)
});

router.post('/login', checkBody, usernameLogin, async (req, res, next) => {
      const { username, password } = req.body;
      await db('users').where({ username })
        .then(([user]) => {
          if(user && bcrypt.compareSync(password, user.password)) {
            const token = tokenBuilder(user)
            res.json({ message: `welcome, ${user.username}`, token })
          } else {
            next({ status: 401, message: 'Invalid Credentials, try again!' })
          }
        });
});

module.exports = router;