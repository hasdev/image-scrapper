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

KeywordSchema.methods.toJSON = function(){
  var doc =  this;
  var docObj = doc.toObject();

  return _.pick(docObj,['_id','keyword', 'images', 'timestamp']);
}

KeywordSchema.methods.updateKeyword = function(urls){
  var doc = this;

  return doc.update({
    $set:{
      urls:urls
    }
  });
}

KeywordSchema.statics.findByKeyword = function(keyword){
  var doc = this;
  console.log('here getting keyword',keyword);
  return doc.findOne({keyword}).then((doc) => {
    console.log(doc);
    return Promise.resolve(doc);
  })
}

var Keyword = mongoose.model('Keyword', KeywordSchema);


module.exports = {
  Keyword
}
