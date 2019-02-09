const Sequelize = require('sequelize')
const sequelize = require('../db')
const Playlist = require('../Playlists/model')

const Song = sequelize.define('songs', {
  title: {
    type: Sequelize.STRING,
    field: 'title',
    allowNull: false
  },
  //foreign key ?
  artist_id: {
    type: Sequelize.STRING,
    field: 'artist_id',
    allowNull: false
  },
  album_title: {
    type: Sequelize.STRING,
    field: 'album_title',
    allowNull: false
  },
  // foreign key ?
  playlistId: {
    type: Sequelize.INTEGER,
    field: 'playlist_id'
  }
}, {
    timestamps: false,
    tableName: 'songs'
  })

module.exports = Song