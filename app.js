const express = require('express');
const mongoose = require('mongoose');

const { errors } = require('celebrate');
const errorHandler = require('./middlewares/errorHandler');

const routes = require('./routes');
const limiter = require('./utils/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
})
  .then(() => console.log('Connected to DB'))
  .catch(() => console.log('No connection to DB'));

const app = express();
app.use(requestLogger);
app.use(limiter);

app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Port is listening on port ${PORT}`);
});
