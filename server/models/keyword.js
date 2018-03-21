const mongoose = require('mongoose');
const _ = require('lodash');

var KeywordSchema = new mongoose.Schema({
  keyword:{
    type: String,
    required:true,
    trim:true,
  },
  images: [{
      url:{
        type:String,
        required:true
      }
    }
  ],
  timestamp:{
    type:Date,
    required:true,
    default: Date.now
  }
});

KeywordSchema.methods.toJSON = function(){ // when the documents toJSON method is called
  var doc =  this; //using schema methods we get access to document instance here
  var docObj = doc.toObject(); //mongoose doc to js-object

  return _.pick(docObj,['_id','keyword', 'images', 'timestamp']);
}

var Keyword = mongoose.model('Keyword', KeywordSchema);

module.exports = {
  Keyword
}
