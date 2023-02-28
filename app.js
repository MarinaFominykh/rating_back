const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const bodyParser = require('body-parser');

const {
  PORT = 3001,
} = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/ratingdb', {
  useNewUrlParser: true,
});

const matchRouter = require('./routes/matches');
const unitRouter = require('./routes/units');
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
app.use(matchRouter);
app.use(unitRouter);
app.use(errorLogger);
app.use(handlerErrors);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
