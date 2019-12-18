'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    confirmed: DataTypes.BOOLEAN,
  }, {});
  User.associate = ({ Films }) => {
    User.belongsToMany(Films, { through: 'Rating', as: 'ratedFilms' });
    User.belongsToMany(Films, { through: 'Watchlist', as: 'toWatchFilms' });
  };
  return User;
};
