const Match = require('../models/match');
// const Unit = require('../models/unit');
const InValidDataError = require('../errors/in-valid-data-err');
const NotFoundError = require('../errors/not-found-err');

const createMatch = (req, res, next) => {
  const {
    title,
    gameMaster,
    date,
    result,
    sheriff,
    done,
    red,
    black,
    modKill,
    bestPlayer,

  } = req.body;
  // const inputs = [
  //   ...red,
  //   ...black,
  //   gameMaster,
  //   sheriff,
  //   done,
  // ];
  // console.log(inputs);

  // const newData = () => inputs.map((value) => {
  //   if (value.length === 24) { return value; }
  //   return Unit.create({ name: value }).then((unit) => unit._id);
  // });
  // console.log('newData=>', newData());
  // if (sheriff.length === 24 && gameMaster === 24) {
  //   Match.create({
  //     title,
  //     gameMaster,
  //     date,
  //     result,
  //     sheriff,
  //     done,
  //     red,
  //     black,
  //     modKill,
  //     bestPlayer,
  //   })
  //     .then((match) => {
  //       res.send(match);
  //     })
  //     .catch((error) => {
  //       if (error.name === 'ValidationError') {
  //         const inValidDataError = new InValidDataError('Переданы некорректные данные');
  //         // console.log('error =>', error);
  //         return next(inValidDataError);
  //       }
  //       return next(error);
  //     });
  // } else {
  //   Unit.create({ name: sheriff }).then((unit) => Match.create({
  //     title,
  //     gameMaster,
  //     date,
  //     result,
  //     sheriff: unit._id,
  //     done,
  //     red,
  //     black,
  //     modKill,
  //     bestPlayer,
  //   }))
  //     .then((match) => {
  //       res.send(match);
  //     })
  //     .catch((error) => {
  //       if (error.name === 'ValidationError') {
  //         const inValidDataError = new InValidDataError('Переданы некорректные данные');
  //         console.log('error =>', error);
  //         return next(inValidDataError);
  //       }
  //       return next(error);
  //     });
  // }

  // Использовать конструкцию switch/case для проверки новых игроков
  Match.create({
    title,
    gameMaster,
    date,
    result,
    sheriff,
    done,
    red,
    black,
    modKill,
    bestPlayer,
  })
    .then((match) => {
      res.send(match);
    })
    .catch((error) => {
      console.log('error=>', error);
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
  Match.find({})
    .populate({
      path: 'gameMaster',
      select: 'name',
    })
    .populate({
      path: 'red',
      select: 'name',
    })
    .populate({
      path: 'black',
      select: 'name',
    })
    .populate({
      path: 'sheriff',
      select: 'name',
    })
    .populate({
      path: 'done',
      select: 'name',
    })
    .populate({
      path: 'bestPlayer',
      select: 'name',
    })
    .populate({
      path: 'modKill',
      select: 'name',
    })
    //   .populate({
    //     path: 'units',
    //     populate: {
    //       path: 'unit',
    //       select: 'name',
    //     },
    //   })
    .then((matches) => res.send(matches))
    .catch(next);
};

const addUnitArray = (req, res, next) => {
  const {
    match,
    array,
  } = req.body;
  for (let i = 0; i <= req.body.array.length - 1; i += 1) {
    Match.findByIdAndUpdate(match._id, {
      $addToSet: {
        units: {
          $each: [{
            unit: array[i].unit,
            role: array[i].role,
            modKill: array[i].modKill,
            bestPlayer: array[i].bestPlayer,
          }],
        },
      },
    }, {
      new: true,
    })
      .then((matchWithUnits) => {
        if (!matchWithUnits) {
          throw new NotFoundError('Такая игра отсутствует');
        }
        res.send(matchWithUnits);
      })
      .catch((error) => {
        if (error.kind === 'ObjectId') {
          return next(new InValidDataError('Переданы некорректные данные'));
        }
        return next(error);
      });
  }
};

const updateMatch = (req, res, next) => {
  const {
    id,
    title,
    gameMaster,
    date,
    result,
    sheriff,
    done,
    red,
    black,
    modKill,
    bestPlayer,
  } = req.body;
  // if (!gameMaster) {
  //   throw new InValidDataError('Переданы некорректные данныe');
  // }
  Match.findByIdAndUpdate(id, {
    title,
    gameMaster,
    date,
    result,
    sheriff,
    done,
    red,
    black,
    modKill,
    bestPlayer,
  }, {
    new: true,
  })
    // .populate({
    //   path: 'gameMaster',
    //   select: 'name',
    // })
    // .populate({
    //   path: 'red',
    //   select: 'name',
    // })
    // .populate({
    //   path: 'black',
    //   select: 'name',
    // })
    // .populate({
    //   path: 'sheriff',
    //   select: 'name',
    // })
    // .populate({
    //   path: 'done',
    //   select: 'name',
    // })
    .then((newMatch) => {
      res.send(newMatch);
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
    match,
    title,
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

const updateResult = (req, res, next) => {
  const {
    match,
    result,
  } = req.body;
  if (!match || !result) {
    throw new InValidDataError('Переданы некорректные данныe');
  }
  Match.findByIdAndUpdate(match._id, {
    result,
  }, {
    new: true,
  })
    .then((newResult) => {
      res.send(newResult);
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
    unit,
    role,
    currentUnit,
  } = req.body;
  const id = currentUnit.unit._id;
  if (!unit || !role) {
    throw new InValidDataError('Переданы некорректные данныe');
  }
  Match.updateOne({
    _id: req.params.id,
    'units.unit': id,
  }, {
    $set: {
      'units.$.unit': unit,
      'units.$.role': role,
    },
  })

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
  updateMatch,
  updateTitle,
  updateResult,
  updateUnitInMatch,
};
