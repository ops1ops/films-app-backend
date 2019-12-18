const db = require('../db');

const { Rating } = db;

module.exports = async (id) => {
  const average = await Rating.findAll({
    where: { filmId: id },
    attributes: ['filmId', [db.sequelize.fn('AVG', db.sequelize.col('rating')), 'avgRating']],
    group: ['filmId'],
    order: [[db.sequelize.fn('AVG', db.sequelize.col('rating')), 'DESC']]
  });

  const ratings = await Rating.findAll({
    where: { filmId: id },
  });

  const count = ratings.length;

  return { count, average };
};
