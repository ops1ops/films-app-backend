'use strict';
module.exports = (sequelize, DataTypes) => {
  const FilmActor = sequelize.define('FilmActor', {
    filmId: DataTypes.INTEGER,
    actorId: DataTypes.INTEGER,
    character: DataTypes.STRING
  }, {});
  FilmActor.associate = function(models) {
    // associations can be defined here
  };
  return FilmActor;
};