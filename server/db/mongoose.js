const mongoose = require('mongoose');

mongoose.Promises = global.Promises;
const db = mongoose.connect(process.env.MONGODB_URI, () => {

});

module.exports = {
  mongoose
}
