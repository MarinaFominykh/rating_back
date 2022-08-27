const Unit = require('../models/unit');
const InValidDataError = require('../errors/in-valid-data-err');
const EmailDuplicateError = require('../errors/email-duplicate-err');

const createUnit = (req, res, next) => {
  const { name } = req.body;
  Unit.create({ name })
    .then((unit) => { res.send({ unit }); })
    .catch((error) => {
      if (error.code === 11000) {
        next(new EmailDuplicateError('Пользователь с таким ником уже существует'));
      } else if (error._message === 'unit validation failed') {
        return next(new InValidDataError('Переданы некорректные данные'));
      }
      return next(error);
    });
};

const getUnits = (req, res, next) => {
  Unit.find({})
    .then((units) => res.send(units))
    .catch(next);
};

module.exports = {
  createUnit,
  getUnits,
};
