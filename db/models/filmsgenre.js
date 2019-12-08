'use strict';
module.exports = (sequelize, DataTypes) => {
  const FilmsGenre = sequelize.define('FilmsGenre', {
    genreId: DataTypes.INTEGER,
    filmId: DataTypes.INTEGER
  }, {});
  FilmsGenre.associate = function(models) {
    // associations can be defined here
  };
  return FilmsGenre;
};