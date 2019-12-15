'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    userId: DataTypes.INTEGER,
    filmId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER
  }, {});
  Rating.associate = function(models) {

  };
  return Rating;
};