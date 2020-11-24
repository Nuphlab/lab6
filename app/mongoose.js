/*

This file is for initializing mongoose

*/
const mongoose = require('mongoose');
mongoose.connect(process.env.ATLAS_CONNECTION_STRING, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  message
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
});

function message() {
  console.log('got dat connect')
}
//mongoose.connect(process.env)