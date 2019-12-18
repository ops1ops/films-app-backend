'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    rating: DataTypes.INTEGER
  }, {});
  Rating.associate = function(models) {

  };
  return Rating;
};