const withErrorLogs = require('../utils/withErrorLogs');

const { Genres, Films } = require('../db');

exports.getAllGenres = (req, res) => withErrorLogs(async () => {
  const genres = await(
    Genres.findAll({
      attributes: ['id', 'name'],
    })
  );

  return res.send(genres);
});

exports.getFilmsByGenreId = (req, res) => withErrorLogs(async () => {
  const { id } = req.params;

  const films = await(
    Films.findAll({
      attributes: ['id', 'type', 'name', 'description', 'posterUrl', 'releaseDate'],
      include: [{ association: 'genres', attributes: [], where: { id } }]
    })
  );

  return res.send(films);
});
