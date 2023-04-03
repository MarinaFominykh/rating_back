require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {
  errors,
} = require('celebrate');

const bodyParser = require('body-parser');

const {
  PORT = 3001,
} = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/ratingdb', {
  useNewUrlParser: true,
});

// const matchRouter = require('./routes/matches');
// const unitRouter = require('./routes/units');
const router = require('./routes/routes');
const handlerErrors = require('./middlewares/handleErrors');
const {
  requestLogger,
  errorLogger,
} = require('./middlewares/logger');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(requestLogger);
app.use(cors());
app.use(router);
app.use(errors());
app.use(errorLogger);
app.use(handlerErrors);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
