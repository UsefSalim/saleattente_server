const mongoose = require('mongoose');
const Fawn = require('fawn');

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Mongo Db Connected'))
  .catch((err) => console.log(`error connection to the DataBase : ${err}`));

// add Disconnections !!!

Fawn.init(mongoose);
