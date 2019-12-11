'use strict';
module.exports = (sequelize, DataTypes) => {
  const FilmsImages = sequelize.define('FilmsImages', {
    filmId: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {});
  FilmsImages.associate = ({ Films }) => {
    FilmsImages.belongsTo(Films, { as: 'film', foreignKey: 'filmId' })
  };
  return FilmsImages;
};