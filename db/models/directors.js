'use strict';
module.exports = (sequelize, DataTypes) => {
  const Directors = sequelize.define('Directors', {
    name: DataTypes.STRING
  }, {});
  Directors.associate = function(models) {
    // associations can be defined here
  };
  return Directors;
};