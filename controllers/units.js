const Unit = require('../models/unit');
const InValidDataError = require('../errors/in-valid-data-err');
const EmailDuplicateError = require('../errors/email-duplicate-err');
const NotFoundError = require('../errors/not-found-err');

const createUnit = (req, res, next) => {
  const { name } = req.body;
  Unit.create({ name })
    .then((unit) => {
      res.send(unit);
    })
    .catch((error) => {
      // console.log('error=>', error.keyValue.name);
      if (error.code === 11000) {
        next(new EmailDuplicateError('Пользователь с таким ником уже существует'));
      } else if (error._message === 'unit validation failed') {
        return next(new InValidDataError('Переданы некорректные данные'));
      }
      return next(error);
    });
};
const createUnits = (req, res, next) => {
  const array = req.body.filter((item) => item !== null);
  Unit.insertMany(array)
    .then((units) => { res.send(units); })
    .catch((error) => {
      if (error.code === 11000) {
        next(new EmailDuplicateError(`Пользователь с ником ${error.message.slice((error.message.indexOf('name:')) + 6)}уже существует`));
      } else if (error._message === 'unit validation failed') {
        return next(new InValidDataError('Переданы некорректные данные'));
      }
      return next(error);
    });
};

const updateUnit = (req, res, next) => {
  const { name } = req.body;
  Unit.findByIdAndUpdate(req.params.id, { name }, { new: true })
    .then((newData) => res.send(newData))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InValidDataError('Переданы некорректные данные при обновлении данных игрока'));
      } else if (err.code === 11000) {
        next(new EmailDuplicateError(`Пользователь с ником ${err.keyValue.name} уже существует`));
      } else { next(err); }
    })
    .catch(next);
};

const getUnits = (req, res, next) => {
  Unit.find({})
    .then((units) => res.send(units))
    .catch(next);
};

const getUnit = (req, res, next) => {
  Unit.findById(req.params.id)
    .then((unit) => {
      if (!unit) {
        throw new NotFoundError('Такой игрок не найден');
      }
      res.send({ data: unit });
    })
    .catch(next);
};

const deleteUnit = (req, res, next) => {
  Unit.findById(req.params.id)
    .then((unit) => {
      if (!unit) {
        throw new NotFoundError('Игрок не найден');
      }
      return unit;
    })
    .then((unit) => unit.remove())
    .then(() => res.send({ message: 'Игрок удален' }))

    .catch((error) => {
      if (error.kind === 'ObjectId') {
        const inValidDataError = new InValidDataError('Переданы некорректные данные');
        next(inValidDataError);
      }
      next(error);
    });
};

module.exports = {
  createUnit,
  getUnits,
  updateUnit,
  deleteUnit,
  getUnit,
  createUnits,
};
