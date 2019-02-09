const { Router } = require('express')
const User = require('./model')
const bcrypt = require('bcrypt')

const router = new Router()


router.post('/users', (req, res, next) => {

  const psw = req.body.password;
  const pswConf = req.body.password_confirmation;

  const user = {
    email: req.body.email,
    password: bcrypt.hashSync(psw, 10)
  }

  if (psw === pswConf) {
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
  } else {
    return res.status(404).send({
      message: `Passwords do not match`
    })
  }
})

module.exports = router