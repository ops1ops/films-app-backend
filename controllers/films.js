const withErrorLogs = require('../utils/withErrorLogs');
const axios = require('axios')

const { Films, Genres, FilmsGenre } = require('../db');

exports.getAllFilms = (req, res) => withErrorLogs(async () => {
  console.log(1)
  const films = await(
    Films.findAll({
      include: [{ association: 'genres', attributes: ['id', 'name'], through: { attributes: [] } }],
      attributes: ['id', 'name', 'releaseDate', 'posterUrl', 'backdropUrl']
    })
  );

  return res.send(films);
});

exports.getFilmById = (req, res) => withErrorLogs(async () => {
  const { id } = req.params;

  const film = await(
    Films.findOne({
      where: { id },
      include: [{ association: 'genres', attributes: ['id', 'name'], through: { attributes: [] } }],
    })
  );

  if (!film) {
    return res.status(404).send({ error: 'Film was not found'});
  }

  return res.json(film);
});


//
// Films.create({ id: 333, name: 'qqq', directorId: 1 }).then(film => {
//   Genres.addGenre([film, 444]);
// });

// const { data: { results } } = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=5623ba47e9f90658f2478c29935cec0e')
// for (let i = 0; results.length - 1; i++) {
//   const item = results[i];
//
//   const film = await Films.create({
//     directorId: 1,
//     name: item.title,
//     description: item.overview,
//     posterUrl: `https://image.tmdb.org/t/p/original${item.poster_path}`,
//     backdropUrl: `https://image.tmdb.org/t/p/original${item.backdrop_path}`,
//     duration: Math.floor(Math.random() * (180 - 60) + 60),
//     releaseDate: new Date(item.release_date),
//   });
//   console.log(film.id)
// for (let i = 0; i < item.genre_ids.length - 1; i++) {
//   const genre = item.genre_ids[i];
//
//   await FilmsGenre.create({
//     genreId: genre,
//     filmId: film.id
//   })
// }
// }
// const { data: { genres } } = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=5623ba47e9f90658f2478c29935cec0e')
