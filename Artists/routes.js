const { Router } = require('express')
const Artist = require('./model')
const Song = require('../Songs/model')

const router = new Router()

//retrieve all with their songs
router.get('/artists', (req, res, next) => {
  
  const limit = req.query.limit || 25;
  const offset = req.query.offset || 0;

  Promise.all([
    Artist.count(),
    Artist.findAll({
      include: [Song],
      limit, offset})
  ])
  .then(([total, artists]) => {
    res.send({
      artists, total
    })
  })
  .catch(error => next(error))
})

module.exports = router