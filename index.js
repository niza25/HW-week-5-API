const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./Users/routes');

const app = express()
const port = process.env.PORT || 4000

app
  .use(bodyParser.json())
  .use(usersRouter)
  .listen(port, () => console.log(`Listening on port ${port}`))