var mongoose = require('mongoose');
require("dotenv").config();

exports.connection = mongoose.connect(process.env.DATABASE, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  })
  .then(() => console.log('Connected to database!'))
  .catch(err => {
  console.log(`DB Connection Error ${err.message}`);
  
});
  
mongoose.set('debug', false);