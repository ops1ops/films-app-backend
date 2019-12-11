const withErrorLogs = require('../utils/withErrorLogs');
const axios = require('axios')

const { Films, Genres, FilmsGenre, Actors } = require('../db');

exports.getAllFilms = (req, res) => withErrorLogs(async () => {
  const films = await(
    Films.findAll({
      attributes: ['id', 'name', 'releaseDate', 'posterUrl', 'backdropUrl']
    })
  );

  return res.send(films);
});

exports.getFilmsByGenreId = (req, res) => withErrorLogs(async () => {
  const { id } = req.params;

  const films = await(
    Films.findAll({
      attributes: ['id', 'name', 'description', 'posterUrl', 'releaseDate'],
      include: [{ association: 'genres', attributes: [], where: { id } }]
    })
  );

  return res.send(films);
});

exports.getFilmById = (req, res) => withErrorLogs(async () => {
  const { id } = req.params;

  const film = await(
    Films.findOne({
      where: { id },
      attributes: ['id', 'name', 'posterUrl', 'description', 'duration', 'releaseDate'],
      include: [
        { association: 'genres', attributes: ['id', 'name'], through: { attributes: [] } },
        { association: 'director', attributes: ['id', 'name'] },
        { association: 'images', attributes: ['id', 'url'] },
        { association: 'actors', attributes: ['id', 'posterUrl', 'name'], through: { as: 'pivot', attributes: ['character']} }
      ],
    })
  );

  if (!film) {
    return res.status(404).send({ error: 'Film was not found'});
  }

  return res.json(film);
});

// const { data: { genres } } = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=5623ba47e9f90658f2478c29935cec0e')
// for (let i = 0; i <= genres.length - 1; i++) {
//   await Genres.create({ id: genres[i].id, name: genres[i].name})
// }




// const { data: { results } } = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=5623ba47e9f90658f2478c29935cec0e');
// for (let i = 0; i <= results.length - 1; i++) {
//   const item = results[i];
//   const { data: { backdrops }} = await axios.get(`https://api.themoviedb.org/3/movie/${item.id}/images?api_key=5623ba47e9f90658f2478c29935cec0e`);
//   const images = backdrops.map(item => ({ url: `https://image.tmdb.org/t/p/original${item.file_path}`})).slice(0, 10);
//   const { data: { crew, cast } } = await axios.get(`https://api.themoviedb.org/3/movie/${item.id}/credits?api_key=5623ba47e9f90658f2478c29935cec0e`);
//   const { id: directorId } = crew.find(({ job }) => job === 'Director');
//   const { data: directorInfo } = await axios.get(`https://api.themoviedb.org/3/person/${directorId}?api_key=5623ba47e9f90658f2478c29935cec0e`);
//
//
//   const film = await Films.create({
//     images,
//     name: item.title,
//     description: item.overview,
//     posterUrl: `https://image.tmdb.org/t/p/original${item.poster_path}`,
//     backdropUrl: `https://image.tmdb.org/t/p/original${item.backdrop_path}`,
//     duration: Math.floor(Math.random() * (180 - 105) + 105),
//     releaseDate: new Date(item.release_date),
//     director: {
//       name: directorInfo.name,
//       posterUrl: `https://image.tmdb.org/t/p/original${directorInfo.profile_path}`,
//       biography: directorInfo.biography,
//       bornDate: new Date(directorInfo.birthday),
//     }
//   }, { include: ['images', 'director']});
//
//   item.genre_ids.forEach(async (id) => {
//     await film.addGenre([id]);
//   });
//
//   const length = cast.length > 10 ? 10 : cast.length - 1;
//
//   for (let k = 0; k <= length; k++) {
//     const { id, character } = cast[k];
//     console.log("CHAR", character)
//     const { data: actor } = await axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=5623ba47e9f90658f2478c29935cec0e`);
//     const { data: { profiles } } = await axios.get(`https://api.themoviedb.org/3/person/${id}/images?api_key=5623ba47e9f90658f2478c29935cec0e`);
//
//     if (profiles && profiles.length && actor.biography) {
//       const images = profiles.map(image => ({ url: `https://image.tmdb.org/t/p/original${image.file_path}` })).slice(0, 10);
//       try {
//         const createdActor = await Actors.create({
//           images,
//           name: actor.name,
//           gender: actor.gender,
//           posterUrl: actor.profile_path ? `https://image.tmdb.org/t/p/original${actor.profile_path}` : null,
//           biography: actor.biography,
//           bornDate: actor.birthday ? new Date(actor.birthday) : new Date(1970)
//         }, { include: ['images']});
//
//         await film.addActor(createdActor, { through: { character }});
//       } catch (e) {
//         console.log(e)
//       }
//
//     }
//   }
// }




