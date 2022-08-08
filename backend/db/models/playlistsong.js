'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlaylistSong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PlaylistSong.belongsTo(models.Song, {foreignKey: 'SongId'})
      PlaylistSong.belongsTo(models.Playlist, {foreignKey: 'PlaylistId'})
    }
  }
  PlaylistSong.init({
    PlaylistId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    SongId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'PlaylistSong',
  });
  return PlaylistSong;
};
