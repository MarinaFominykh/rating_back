module.exports = ((err, req, res, next) => {
  const {
    statusCode = 500, message,
  } = err;
  // console.log(err);
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});
