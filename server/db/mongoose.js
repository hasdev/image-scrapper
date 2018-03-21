const mongoose = require('mongoose');

mongoose.Promises = global.Promises; //use global promises with mongoose
const db = mongoose.connect(process.env.MONGODB_URI, () => {

});

module.exports = {
  mongoose
}
