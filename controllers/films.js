const withErrorLogs = require('../utils/withErrorLogs');
const axios = require('axios');
const db = require('../db');
const getRatingInfoByFilmId = require('../utils/getRatingInfoByFilmId');

const { Films, Actors, Genres, Rating, Watchlist, Sequelize } = db;
const { Op } = Sequelize;

exports.getAllFilms = (req, res) => withErrorLogs(async () => {
  const films = await(
    Films.findAll({
      where: { type: 'film' },
      attributes: ['id', 'type', 'name', 'description', 'releaseDate', 'posterUrl', 'backdropUrl']
    })
  );

  return res.send(films);
});

exports.getFilmById = (req, res) => withErrorLogs(async () => {
  const { id } = req.params;
  const { userId } = req.query;

  const film = await(
    Films.findOne({
      where: { id },
      attributes: ['id', 'type', 'name', 'posterUrl', 'description', 'duration', 'releaseDate'],
      include: [
        { association: 'genres', attributes: ['id', 'name'], through: { attributes: [] } },
        { association: 'director', attributes: ['id', 'name', 'posterUrl', 'biography', 'bornDate'] },
        { association: 'ratedBy', attributes: ['id'], through: { attributes: ['rating'], as: 'pivot' } },
        { association: 'images', attributes: ['id', 'url'] },
        { association: 'toWatchedBy', attributes: ['id'] },
        { association: 'actors', attributes: ['id', 'posterUrl', 'name'], through: { as: 'pivot', attributes: ['character']} },
        { association: 'childs'},
        { association: 'parent'}
      ],
    })
  );

  if (!film) {
    return res.status(404).send({ error: 'Film does not exist'});
  }

  const ratingInfo = await getRatingInfoByFilmId(id);

  return res.json({ data: film, ratingInfo });
});

exports.rateFilm = (req, res) => withErrorLogs(async () => {
  const { id } = req.params;
  const { rating } = req.body;
  const { userId } = req;
  console.log(rating)
  const isRatingValid = rating <= 10 && rating >= 1;
  console.log(isRatingValid, "QQQQ")
  if (isRatingValid) {
    const [ratedObj, isCreated] = await Rating.findOrCreate({
      where: { UserId: userId, FilmId: id },
      defaults: { FilmId: id, rating }
    });

    if (!isCreated) {
      await ratedObj.update({ rating });
    }

    const ratingInfo = await getRatingInfoByFilmId(id);
    console.log(ratingInfo)
    return res.send({ rating, ratingInfo })
  }

  return res.status(422).send({ error: 'Invalid rating' })
});

exports.addToWatchlist = (req, res) => withErrorLogs(async () => {
  const { id } = req.params;
  const { userId } = req;
  try {
    const watchlist = await Watchlist.create({ FilmId: id, UserId: userId });

    if (watchlist) {
      return res.send({ success: true })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Something went wrong' });
  }
});

exports.deleteFromWatchList = (req, res) => withErrorLogs(async () => {
  const { id } = req.params;
  const { userId } = req;

  try {
    await Watchlist.destroy({
      where: {FilmId: id, UserId: userId}
    })

    return res.send({ success: true })
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Something went wrong' });
  }
});

exports.search = (req, res) => withErrorLogs(async () => {
  const { name } = req.query;
  console.log(2)
  try {
    const films = await Films.findAll({
      where: name ? { name: { [Op.like]: `%${name}%`} } : {}
    });

    return res.send(films)
  } catch (error) {
    return res.status(500).send({ error: 'Something went wrong' });
  }
});

// PARSER
//
// const { data: { genres } } = await getFromApi('https://api.themoviedb.org/3/genre/movie/list?api_key=5623ba47e9f90658f2478c29935cec0e')
// for (let i = 0; i <= genres.length - 1; i++) {
//   await Genres.create({ id: genres[i].id, name: genres[i].name})
// }

// const startTime = new Date();
// for (let t = 1; t <= 3; t++) {
//   const { data: { results } } = await getFromApi(`https://api.themoviedb.org/3/discover/movie?api_key=5623ba47e9f90658f2478c29935cec0e&page=${t}`);
//   for (let i = 0; i <= results.length - 1; i++) {
//     const item = results[i];
//     const { data: { backdrops }} = await getFromApi(`https://api.themoviedb.org/3/movie/${item.id}/images?api_key=5623ba47e9f90658f2478c29935cec0e`);
//     const images = backdrops.map(item => ({ url: `https://image.tmdb.org/t/p/original${item.file_path}`})).slice(0, 10);
//     const { data: { crew, cast } } = await getFromApi(`https://api.themoviedb.org/3/movie/${item.id}/credits?api_key=5623ba47e9f90658f2478c29935cec0e`);
//     const { id: directorId } = crew.find(({ job }) => job === 'Director');
//     const { data: directorInfo } = await getFromApi(`https://api.themoviedb.org/3/person/${directorId}?api_key=5623ba47e9f90658f2478c29935cec0e`);
//
//     const film = await Films.create({
//       images,
//       name: item.title,
//       description: item.overview,
//       posterUrl: `https://image.tmdb.org/t/p/original${item.poster_path}`,
//       backdropUrl: `https://image.tmdb.org/t/p/original${item.backdrop_path}`,
//       duration: Math.floor(Math.random() * (180 - 105) + 105),
//       releaseDate: new Date(item.release_date),
//       director: {
//         name: directorInfo.name,
//         posterUrl: `https://image.tmdb.org/t/p/original${directorInfo.profile_path}`,
//         biography: directorInfo.biography,
//         bornDate: new Date(directorInfo.birthday),
//       }
//     }, { include: ['images', 'director']});
//
//     item.genre_ids.forEach(async (id) => {
//       await film.addGenre([id]);
//     });
//
//     // const length = cast.length > 10 ? 10 : cast.length - 1;
//
//     for (let k = 0; k <= cast.length - 1; k++) {
//       const { id, character } = cast[k];
//       console.log("CHAR", character)
//       const { data: actor } = await getFromApi(`https://api.themoviedb.org/3/person/${id}?api_key=5623ba47e9f90658f2478c29935cec0e`);
//       const { data: { profiles } } = await getFromApi(`https://api.themoviedb.org/3/person/${id}/images?api_key=5623ba47e9f90658f2478c29935cec0e`);
//
//       if (profiles && profiles.length && actor.biography && actor.gender && character) {
//         const images = profiles.map(image => ({ url: `https://image.tmdb.org/t/p/original${image.file_path}` }));
//         try {
//           const [createdActor, created] = await Actors.findOrCreate({
//               where: { name: actor.name },
//               defaults: {
//                 images,
//                 name: actor.name,
//                 gender: actor.gender,
//                 posterUrl: actor.profile_path ? `https://image.tmdb.org/t/p/original${actor.profile_path}` : null,
//                 biography: actor.biography,
//                 bornDate: actor.birthday ? new Date(actor.birthday) : new Date(1970)
//               },
//               include: ['images']
//             }
//           );
//
//           await film.addActor(createdActor, { through: { character }});
//         } catch (e) {
//           console.log(e)
//         }
//
//       }
//     }
//   }
// }
// const endTime = new Date();
// console.log("-------------------------------------FINISHED---------------------------------------------------------");
// console.log("------------------------------------------------------------------------------------------------------");
// console.log("------------------------------------------------------------------------------------------------------");
// console.log("START TIME ", startTime);
// console.log("END TIME ", endTime);



