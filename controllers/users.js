const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
// const NotFoundError = require('../errors/not-found-err');
const InValidDataError = require('../errors/in-valid-data-err');
const EmailDuplicateError = require('../errors/email-duplicate-err');

const {
  NODE_ENV,
  JWT_SECRET = 'dev-key',
} = process.env;

// POST /signup
const createUser = (req, res, next) => {
  const {
    login,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({

      login,
      password: hash,

    }))
    .then((user) => {
      const newUser = user.toObject();
      delete newUser.password;
      res.send(newUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InValidDataError('Переданы некорректные данные при создании пользователя.'));
      } else if (err.code === 11000) {
        next(new EmailDuplicateError('Пользователь с таким логином уже зарегистрирован.'));
      } else {
        next(err);
      }
    });
};

// POST /signin

const loginUser = (req, res, next) => {
  const {
    login,
    password,
  } = req.body;
  User.findUserByCredentials({
    login,
    password,
  })
    .then((user) => {
      const token = jwt.sign({
        _id: user._id,
      }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-key', {
        expiresIn: '21d',
      });
      res.send({
        token,
      });
    })
    .catch(next);
};

// GET /users — все пользователи
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};
module.exports = {
  createUser,
  getUsers,
  loginUser,
};
