const { Router } = require('express')
const Song = require('./model')
const Artist = require('../Artists/model')

const router = new Router()

// add song - check
router.post('/playlists/:id/songs', (req, res, next) => {

  Artist
    .findOne({
      where: {
        artist_name: req.body.artist_name
      }
    })
    .then(foundArtist => {
      if (!foundArtist) {
        Artist
          .create(req.body)
          .then(newArtist => {
            res.status(201).send(newArtist)
            return newArtist.id
          })
          .then(newId => {
            Song
              .create(req.body, {
                where: {
                  artist_id: newId
                }
              })
              .then(song => {
                if (!song) {
                  return res.status(404).send({
                    message: `Song does not exist`
                  })
                }
                return res.status(201).send(song)
              })
          })
          .catch(error => next(error))
      } else {
        Song
          .create(req.body, {
            where: {
              artist_id: foundArtist.id
            }
          })
          .then(song => {
            if (!song) {
              return res.status(404).send({
                message: `Song does not exist`
              })
            }
            return res.status(201).send(song)
          })
          .catch(error => next(error))
      }
    })
    .catch(error => next(error))
})

router.put('/playlists/:id/songs/:id', (req, res, next) => {

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

router.delete('/playlists/:id/songs/:id', (req, res, next) => {
  Song
    .findById(req.params.id)
    .then(song => {
      if (!song) {
        return res.status(404).send({
          message: `Song does not exist`
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