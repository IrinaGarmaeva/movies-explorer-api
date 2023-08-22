const express = require('express');
const mongoose = require('mongoose');

const { PORT = 4000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
})
  .then(() => console.log('Connected to DB'))
  .catch(() => console.log('No connection to DB'));

const app = express();

app.listen(PORT, () => {
  console.log(`Port is listening on port ${PORT}`);
});
