const mongoose = require('mongoose');

mongoose
  .connect('mongodb+srv://root:root@cluster0.jgn2d.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch(function(err) {
    throw Error(err);
  });

module.exports = mongoose; 
