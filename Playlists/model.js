const Sequelize = require('sequelize')
const sequelize = require('../db')
const Song = require('../Songs/model')

const Playlist = sequelize.define('playlists', {
  name: {
    type: Sequelize.STRING,
    field: 'name',
    allowNull: false
  },
}, {
  timestamps: false,
  tableName: 'playlists'
})

Playlist.hasMany(Song,{foreignKey: 'playlist_id'})

module.exports = Playlist