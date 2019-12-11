'use strict';
module.exports = (sequelize, DataTypes) => {
  const Directors = sequelize.define('Directors', {
    name: DataTypes.STRING,
    posterUrl: DataTypes.STRING,
    biography: DataTypes.STRING,
    bornDate: DataTypes.DATE,
  }, {});
  Directors.associate = function({ Films }) {
    Directors.hasMany(Films, { as: 'films' })
  };
  return Directors;
};