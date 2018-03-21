const mongoose = require('mongoose');
const _ = require('lodash');

var KeywordSchema = new mongoose.Schema({
  keyword:{
    type: String,
    required:true,
    trim:true,
  },
  urls: [{
    height:{
      type:String,
      required:true
    },
    width:{
      type:String,
      required:true
    },
    url:{
      type: String,
      required: true,
    }
  }]
});

KeywordSchema.methods.toJSON = function(){
  var doc =  this;
  var docObj = doc.toObject();

  return _.pick(docObj,['_id','keyword', 'urls']);
}

// KeywordSchema.methods.updateKeyword = function(urls){
//   var doc = this;
//
//   return doc.update({
//     $set:{
//       urls:urls
//     }
//   });
// }
//
// KeywordSchema.statics.findByKeyword = function(keyword){
//   var doc = this;
//
//   return User.findOne({keyword}).then((doc) => {
//     console.log(doc);
//     return Promise.resolve(doc);
//   })
// }

var Keyword = mongoose.model('Keyword', KeywordSchema);


module.exports = {
  Keyword
}
