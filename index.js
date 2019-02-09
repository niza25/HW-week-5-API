const express = require('express')
const bodyParser = require('body-parser')
const usersRouter = require('./Users/routes')
const playlistsRouter = require('./Playlists/routes')
const songsRouter = require('./Songs/routes')
const artistsRouter = require('./Artists/routes')
const authRouter = require('./auth/routes')

const app = express()
const port = process.env.PORT || 4000

app
  .use(bodyParser.json())
  .use(authRouter)
  .use(usersRouter)
  .use(playlistsRouter)
  .use(songsRouter)
  .use(artistsRouter)
  .listen(port, () => console.log(`Listening on port ${port}`))