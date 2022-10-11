const Match = require('../models/match');
const InValidDataError = require('../errors/in-valid-data-err');
const NotFoundError = require('../errors/not-found-err');

const createMatch = (req, res, next) => {
  const {
    title,
    gameMaster,
    date,
    result,
  } = req.body;
  Match.create({
    title,
    gameMaster,
    date,
    result,
  })
    .then((match) => {
      res.send(match);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        const inValidDataError = new InValidDataError('Переданы некорректные данные');
        return next(inValidDataError);
      }
      return next(error);
    });
};

const deleteMatch = (req, res, next) => {
  Match.findById(req.params.id)
    .then((match) => {
      if (!match) {
        throw new NotFoundError('Запрашиваемая игра не найдена');
      }
      return match;
    })
    .then((match) => match.remove())
    .then(() => res.send({
      message: 'Игра успешно удалена!',
    }))
    .catch((error) => {
      if (error.kind === 'ObjectId') {
        return next(new InValidDataError('Переданы некорректные данные'));
      }
      return next(error);
    });
};

const getMatches = (req, res, next) => {
  Match.find({}).populate({
    path: 'gameMaster',
    select: 'name',
  })
    .populate({
      path: 'units',
      populate: {
        path: 'unit',
        select: 'name',
      },
    })
    .then((matches) => res.send(matches))
    .catch(next);
};

const addUnitArray = (req, res, next) => {
  // const {
  //   unit, role, modKill, bestPlayer,
  // } = req.body;
  for (let i = 0; i <= req.body.array.length - 1; i += 1) {
    Match.findByIdAndUpdate(req.body.id, {
      $addToSet: {
        units: {
          $each: [{
            unit: req.body.array[i].unit,
            role: req.body.array[i].role,
            modKill: req.body.array[i].modKill,
            bestPlayer: req.body.array[i].bestPlayer,
          }],
        },
      },
    }, {
      new: true,
    })
      .then((match) => {
        if (!match) {
          throw new NotFoundError('Такая игра отсутствует');
        }
        res.send(match);
      })
      .catch((error) => {
        if (error.kind === 'ObjectId') {
          return next(new InValidDataError('Переданы некорректные данные'));
        }
        return next(error);
      });
  }
};

const updateGameMaster = (req, res, next) => {
  const {
    gameMaster, match,
  } = req.body;
  console.log(match.units);
  if (!gameMaster) {
    throw new InValidDataError('Переданы некорректные данныe');
  }
  Match.findByIdAndUpdate(match._id, {
    gameMaster,
  }, {
    new: true,
  })
    .then((newGameMaster) => {
      res.send(newGameMaster);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new InValidDataError('Переданы некорректные данные'));
      } else {
        next(error);
      }
    })
    .catch(next);
};

const updateTitle = (req, res, next) => {
  const {
    match, title,
  } = req.body;
  // console.log(match.units[0].unit.name);
  if (!match || !title) {
    throw new InValidDataError('Переданы некорректные данныe');
  }
  Match.findByIdAndUpdate(match._id, {
    title,
  }, {
    new: true,
  })
    .then((newTitle) => {
      res.send(newTitle);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new InValidDataError('Переданы некорректные данные'));
      } else {
        next(error);
      }
    })
    .catch(next);
};

const updateUnitInMatch = (req, res, next) => {
  const {
    unit, role, modKill, bestPlayer, match, currentUnit,
  } = req.body;
  const id = currentUnit.unit._id;
  if (!unit || !role) {
    throw new InValidDataError('Переданы некорректные данныe');
  }
  Match.updateOne(
    { _id: match._id, 'units.unit': id },
    {
      $set: {
        'units.$.unit': unit,
        'units.$.role': role,
        'units.$.modKill': modKill,
        'units.$.bestPlayer': bestPlayer,
      },
    },

  )
  // Match.findByIdAndUpdate(
  //   match._id,
  //   { $pull: { units: { unit: id } } },
  //   {
  //     $push: {
  //       units: {
  //         unit,
  //         role,
  //         modKill,
  //         bestPlayer,
  //       },
  //     },
  //   },
  //   { new: true },
  // )
  // Match.findByIdAndUpdate(
  //   match._id,
  //   {
  //     $push: {
  //       units: {
  //         unit,
  //         role,
  //         modKill,
  //         bestPlayer,
  //       },
  //     },
  //   },
  //   { new: true },
  // )
    .then((newUnit) => {
      res.send(newUnit);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new InValidDataError('Переданы некорректные данные'));
      } else {
        next(error);
      }
    })
    .catch(next);
};

module.exports = {
  createMatch,
  deleteMatch,
  getMatches,
  addUnitArray,
  updateGameMaster,
  updateTitle,
  updateUnitInMatch,
};
