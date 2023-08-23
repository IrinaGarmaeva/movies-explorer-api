const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const { errors } = require('celebrate');
const errorHandler = require('./middlewares/errorHandler');
const { PORT, DB_ADDRESS } = require('./config');
const routes = require('./routes');
const limiter = require('./utils/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
})
  .then(() => console.log('Connected to DB'))
  .catch(() => console.log('No connection to DB'));

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(limiter);

app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Port is listening on port ${PORT}`);
});
