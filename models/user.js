const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/un-authorized-err');

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },
});
userSchema.statics.findUserByCredentials = function findUserByCredentials({
  login,
  password,
}) {
  return this.findOne({
    login,
  }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Логин или пароль введены неправильно.'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Логин или пароль введены неправильно.'));
          }

          return user;
        });
    });
};
module.exports = mongoose.model('user', userSchema);
