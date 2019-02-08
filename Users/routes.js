const { Router } = require('express');
const User = require('./model');
const bcrypt = require('bcrypt');

const router = new Router();

router.post('/users', (req, res, next) => {
  const user = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    password_confirmation: bcrypt.hashSync(req.body.password_confirmation, 10)
  }

  User
    .create(user)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: `User does not exist`
        })
      }
      return res.status(201).send({
        id: user.id,
        email: user.email
      })
    })
    .catch(error => next(error))
})

module.exports = router