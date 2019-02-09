const { Router } = require('express')
const router = new Router()
const { toJWT } = require('./jwt')
const bcrypt = require('bcrypt');
const User = require ('../Users/model')

router.post('/tokens', (req, res) => {
  const email = req.body.email
  const psw = req.body.password
  
  if (!email || !psw) {
    res.status(422).send({
      message: 'Please supply a valid email and password'
    })
  } else {
    User
      .findOne({
        where: {
          email: req.body.email
        }
      })
      .then(entity => {
        if (!entity) {
          res.status(404).send({
            message: 'User with that email does not exist'
          })
        }
        if (bcrypt.compareSync(req.body.password, entity.password)) {
          res.send({
            //check that
            token: toJWT({ userId: entity.id })
          })
        }
        else {
          res.status(422).send({
            message: 'Password was incorrect'
          })
        }
      })
      .catch(err => {
        console.error(err)
        res.status(500).send({
          message: 'Something went wrong'
        })
      })
  }
})

module.exports = router