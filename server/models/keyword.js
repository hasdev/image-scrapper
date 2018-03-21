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

KeywordSchema.methods.toJSON = function(){ //fires when sending the res, picks required properties only
  var doc =  this;
  var docObj = doc.toObject();

  return _.pick(docObj,['_id','keyword', 'images', 'timestamp']);
}

var Keyword = mongoose.model('Keyword', KeywordSchema);

module.exports = {
  Keyword
}
