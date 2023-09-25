const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');

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
app.use(cors({ origin: ['http://localhost:3001', 'https://movies.irina.nomoredomainsicu.ru', 'http://movies.irina.nomoredomainsicu.ru'], credentials: true }));
app.use(cookieParser());
app.use(helmet());
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
