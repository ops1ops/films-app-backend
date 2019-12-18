'use strict';
module.exports = (sequelize, DataTypes) => {
  const Films = sequelize.define('Films', {
    directorId: DataTypes.INTEGER,
    type: DataTypes.ENUM('TV', 'film', 'season', 'episode'),
    parentId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    posterUrl: DataTypes.STRING,
    backdropUrl: DataTypes.STRING,
    description: DataTypes.TEXT,
    duration: DataTypes.INTEGER,
    releaseDate: DataTypes.DATE
  }, {});

  Films.associate = ({ Genres, Directors, FilmsImages, Actors, User }) => {
    Films.belongsToMany(Genres,{ through: 'FilmsGenre', as: 'genres' });
    Films.belongsToMany(Actors,{ through: 'FilmActor', as: 'actors' });
    Films.belongsTo(Directors, { as: 'director', foreignKey: 'directorId' });
    Films.hasMany(FilmsImages, { as: 'images' });
    Films.hasMany(Films, { as: 'childs', foreignKey: 'parentId' });
    Films.belongsTo(Films, { as: 'parent', foreignKey: 'parentId'});
    Films.belongsToMany(User, { through: 'Rating', as: 'ratedBy' });
    Films.belongsToMany(User, { through: 'Watchlist', as: 'toWatchedBy' });
  };

  return Films;
};
