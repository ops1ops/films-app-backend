const withErrorLogs = require('../utils/withErrorLogs');
const getFromApi = require('../utils/getFromApi');

const { Films, Actors, Genres, Rating } = require('../db');

exports.getAllTVs = (req, res) => withErrorLogs(async () => {
  const tvs = await(
    Films.findAll({
      where: { type: 'TV' },
      attributes: ['id', 'type', 'name', 'description', 'posterUrl', 'releaseDate']
    })
  );





//   const startTime = new Date();
//   const { data: { results } } = await getFromApi(`https://api.themoviedb.org/3/tv/popular?api_key=5623ba47e9f90658f2478c29935cec0e`);
//   for (let i = 0; i <= results.length - 1; i++) {
//     const tv = results[i];
//     console.log("TV",tv)
//     const { data: item } = await getFromApi(`https://api.themoviedb.org/3/tv/${tv.id}?api_key=5623ba47e9f90658f2478c29935cec0e`);
//     // ^^^^^^ TV info
//     const { created_by } = item;
//     const { id: directorId } = created_by[0];
//
//     const { data: { backdrops }} = await getFromApi(`https://api.themoviedb.org/3/tv/${item.id}/images?api_key=5623ba47e9f90658f2478c29935cec0e`);
//
//     const images = backdrops.map(item => ({ url: `https://image.tmdb.org/t/p/original${item.file_path}`})).slice(0, 10);
//     const { data: { crew, cast } } = await getFromApi(`https://api.themoviedb.org/3/tv/${item.id}/credits?api_key=5623ba47e9f90658f2478c29935cec0e`);
//     const { data: directorInfo } = await getFromApi(`https://api.themoviedb.org/3/person/${directorId}?api_key=5623ba47e9f90658f2478c29935cec0e`);
//
//     const film = await Films.create({
//       images,
//       type: 'TV',
//       name: tv.name,
//       description: item.overview,
//       posterUrl: `https://image.tmdb.org/t/p/original${item.poster_path}`,
//       backdropUrl: `https://image.tmdb.org/t/p/original${item.backdrop_path}`,
//       duration: item.episode_run_time[0],
//       releaseDate: new Date(item.first_air_date),
//       director: {
//         name: directorInfo.name,
//         posterUrl: `https://image.tmdb.org/t/p/original${directorInfo.profile_path}`,
//         biography: directorInfo.biography,
//         bornDate: new Date(directorInfo.birthday),
//       }
//     }, { include: ['images', 'director']});
//
//     item.genres.forEach(async ({id, name}) => {
//       const [createdGenre, created] = await Genres.findOrCreate({
//         where: { id },
//         defaults: { name },
//       });
//
//       await film.addGenre(createdGenre);
//     });
//
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
//
// const endTime = new Date();
// console.log("-------------------------------------FINISHED---------------------------------------------------------");
// console.log("------------------------------------------------------------------------------------------------------");
// console.log("------------------------------------------------------------------------------------------------------");
// console.log("START TIME ", startTime);
// console.log("END TIME ", endTime);


  return res.json(tvs);
});


exports.getTVById = (req, res) => withErrorLogs(async () => {
  const { id } = req.params;

  const tv = await(
    Films.findOne({
      where: { id },
      attributes: ['id', 'type', 'name', 'posterUrl', 'description', 'duration', 'releaseDate'],
      include: [
        { association: 'genres', attributes: ['id', 'name'], through: { attributes: [] } },
        { association: 'director', attributes: ['id', 'name', 'posterUrl', 'biography', 'bornDate'] },
        { association: 'ratedBy', attributes: ['name'], through: { attributes: ['rating'], as: 'pivot' } },
        { association: 'images', attributes: ['id', 'url'] },
        { association: 'actors', attributes: ['id', 'posterUrl', 'name'], through: { as: 'pivot', attributes: ['character']} },
        { association: 'childs'},
      ],
    })
  );

  if (!tv) {
    return res.status(404).send({ error: 'TV does not exist'});
  }

  const ratingInfo = await getRatingInfoByFilmId(id);

  return res.json({ data: tv, ratingInfo });
});
