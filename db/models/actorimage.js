'use strict';
module.exports = (sequelize, DataTypes) => {
  const ActorImage = sequelize.define('ActorImage', {
    actorId: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {});
  ActorImage.associate = function({ Actors }) {
    ActorImage.belongsTo(Actors, { as: 'actors', foreignKey: 'actorId' });
  };
  return ActorImage;
};