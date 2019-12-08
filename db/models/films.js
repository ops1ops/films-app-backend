'use strict';
module.exports = (sequelize, DataTypes) => {
  const Films = sequelize.define('Films', {
    directorId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    posterUrl: DataTypes.STRING,
    backdropUrl: DataTypes.STRING,
    description: DataTypes.TEXT,
    duration: DataTypes.INTEGER,
    releaseDate: DataTypes.DATE
  }, {});

  Films.associate = ({ Genres }) => {
    Films.belongsToMany(Genres,{
      through: 'FilmsGenre',
      as: 'genres'
    });
  };

  return Films;
};
