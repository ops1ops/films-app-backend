'use strict';
module.exports = (sequelize, DataTypes) => {
  const Genres = sequelize.define('Genres', {
    name: DataTypes.STRING
  }, {});
  Genres.associate = function({ Films }) {
    Genres.belongsToMany(Films, { through: 'FilmsGenre', as: 'films' });
  };
  return Genres;
};