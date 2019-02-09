const { Router } = require('express')
const Playlist = require('./model')
const auth = require('../auth/middleware')
const Song = require('../Songs/model')

const router = new Router()

router.get('/playlists', auth, (req, res, next) => {

  const limit = req.query.limit || 25;
  const offset = req.query.offset || 0;

  Promise.all([
    Playlist.count(),
    Playlist.findAll({ limit, offset })
  ])
    .then(([total, playlists]) => {
      res.status(200).send({
        playlists, total
      })
    })
    .catch(error => next(error))
})

router.get('/playlists/:id', auth, (req, res, next) => {
  Playlist
    .findById(req.params.id, { include: [Song] })
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: `Playlist does not exist`
        })
      }
      return res.status(200).send(playlist)
    })
    .catch(error => next(error))
})

router.post('/playlists', (req, res, next) => {
  Playlist
    .create(req.body)
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: `Playlist does not exist`
        })
      }
      return res.status(201).send(playlist)
    })
    .catch(error => next(error))
})

router.delete('/playlists/:id', auth, (req, res, next) => {
  Playlist
    .findById(req.params.id)
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: `Playlist does not exist`
        })
      }
      return playlist.destroy()
        .then(() => res.send({
          message: `Playlist was deleted`
        }))
    })
    .catch(error => next(error))
})

module.exports = router