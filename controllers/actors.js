const withErrorLogs = require('../utils/withErrorLogs');

const { Actors } = require('../db');

exports.getAllActors = (req, res) => withErrorLogs(async () => {
  const actors = await(
    Actors.findAll({
      attributes: ['id', 'name', 'posterUrl']
    })
  );

  return res.send(actors);
});

exports.getActorById = (req, res) => withErrorLogs(async () => {
  const { id } = req.params;

  const actor = await(
    Actors.findOne({
      where: { id },
      attributes: ['id', 'name', 'gender', 'posterUrl', 'biography', 'bornDate'],
      include: [
        { association: 'films', attributes: ['id', 'name', 'posterUrl'], through: { as: 'pivot', attributes: ['character'] } },
        { association: 'images', attributes: ['id', 'url'] },
      ],
    })
  );

  if (!actor) {
    return res.status(404).send({ error: 'Actor does not exist'});
  }

  return res.send(actor);
});