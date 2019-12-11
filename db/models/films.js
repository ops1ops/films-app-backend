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

  Films.associate = ({ Genres, Directors, FilmsImages, Actors }) => {
    Films.belongsToMany(Genres,{ through: 'FilmsGenre', as: 'genres' });
    Films.belongsToMany(Actors,{ through: 'FilmActor', as: 'actors' });
    Films.belongsTo(Directors, { as: 'director', foreignKey: 'directorId' });
    Films.hasMany(FilmsImages, { as: 'images' });
  };

  return Films;
};
