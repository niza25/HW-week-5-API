const { Router } = require('express')
const Song = require('./model')
const Artist = require('../Artists/model')

const router = new Router()

// add song - check
router.post('/playlists/:id/songs', (req, res, next) => {
  
  Song
    .create(req.body)
    .then(song => {
      if (!song) {
        return res.status(404).send({
          message: `Song does not exist`
        })
      }
      return res.status(201).send(song)
    })
    .catch(error => next(error))

    // should not create double
      Artist
      .create(req.body)
      .then(artist => {
        if (!artist) {
          return res.status(404).send({
            message: `Artist does not exist`
          })
        }
        return res.status(201).send(artist)
      })
})

// change song inf___ CHECK
router.put('/playlists/:id/songs/:id', (req, res, next)=>{
  
  Song
    .findById(req.params.id)
    .then(song => {
      if (!song) {
        return res.status(404).send({
          message: `Song does not exist`
        })
      }
      return song.update(req.body)
      .then(song => res.send(song))
    })
    .catch(error => next(error))
})

// delete the song __CHECK
router.delete('/playlists/:id/songs/:id', (req, res, next) => {
  Song
    .findById(req.params.id)
    .then(song => {
      if (!song) {
        return res.status(404).send({
          message: `song does not exist`
        })
      }
      return song.destroy()
        .then(() => res.send({
          message: `Song was deleted`
        }))
    })
    .catch(error => next(error))
})

module.exports = router