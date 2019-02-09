const Sequelize = require('sequelize')
const sequelize = require('../db')

const Song = sequelize.define('songs', {
  title: {
    type: Sequelize.STRING,
    field: 'title',
    allowNull: false
  },
  artist_name: {
    type: Sequelize.STRING,
    field: 'artist_name',
    allowNull: false
  },
  album_title: {
    type: Sequelize.STRING,
    field: 'album_title',
    allowNull: false
  },
  playlist_id: {
    type: Sequelize.INTEGER,
    field: 'playlist_id'
  },
  artist_id: {
    type: Sequelize.INTEGER,
    field: 'artist_id'
  } 
}, {
    timestamps: false,
    tableName: 'songs'
  })

module.exports = Song