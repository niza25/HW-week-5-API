const Sequelize = require('sequelize')
const sequelize = require('../db')
const Song = require('../Songs/model')

const Artist = sequelize.define('artists', {
  artist_name: {
    type: Sequelize.STRING,
    field: 'artist_name',
    allowNull: false
  },
}, {
    timestamps: false,
    tableName: 'artists'
  })

Artist.hasMany(Song)

module.exports = Artist