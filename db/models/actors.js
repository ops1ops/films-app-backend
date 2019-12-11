'use strict';
module.exports = (sequelize, DataTypes) => {
  const Actors = sequelize.define('Actors', {
    name: DataTypes.STRING,
    gender: DataTypes.INTEGER,
    posterUrl: DataTypes.STRING,
    biography: DataTypes.STRING,
    bornDate: DataTypes.DATE
  }, {});

  Actors.associate = ({ Films, ActorImage }) => {
    Actors.belongsToMany(Films,{ through: 'FilmActor', as: 'films' });
    Actors.hasMany(ActorImage, { as: 'images' });
  };

  return Actors;
};