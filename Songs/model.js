const Sequelize = require('sequelize')
const sequelize = require('../db')
const Artist = require('../Artists/model')

const Song = sequelize.define('songs', {
  title: {
    type: Sequelize.STRING,
    field: 'title',
    allowNull: false
  },
  // shouldnt be there
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
  playlistId: {
    type: Sequelize.INTEGER,
    field: 'playlist_id'
  },
  // ??
  /* artist_id: {
    type: Sequelize.INTEGER,
    field: 'artist_id'
  } */
}, {
    timestamps: false,
    tableName: 'songs'
  })

module.exports = Song