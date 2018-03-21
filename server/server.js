require('./config/server.config.js')

const PORT = process.env.PORT;
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const path = require('path');

const Jimp = require("jimp");
const Scraper = require('images-scraper');
const google = new Scraper.Google();

const publicPath = path.join(__dirname, '../public')

const { mongoose } = require('./db/mongoose');
const { Keyword } = require('./models/keyword');

const app = express();

app.use(bodyParser.json());

app.use(express.static(publicPath));

app.post('/search', (req, res) => {
  var body = _.pick(req.body, ['keyword']); //picking up required property only

  var imagesRes = [];

  google.list({
    keyword: body.keyword,
    num: 15,
    detail: true
  })
  .then((images) => {
    for(let index in images){
      Jimp.read(images[index].url)
      .then((img) => {
          img.resize(400, 400)            // resizing
             .quality(70)                 // compressing
             .greyscale()                 // black and white filter
             .write("public/images/"+body.keyword+'-'+[index]+"."+images[index].type.split('/')[1]); // wrtitng to HDD
        })
        .catch((e) => res.status(404).send(e))

        imagesRes.push({
          height:"400",
          width:"400",
          url:"/images/"+body.keyword+'-'+[index]+"."+images[index].type.split('/')[1]
        });
    }

    var keyword = new Keyword({
      keyword: body.keyword,
      urls: imagesRes
    });

    keyword.save().then((doc) => {
      res.status(200).send(doc);
    })
    .catch((e) => res.status(404).send(e))

  })
  .catch((e) => res.status(403).send())

});

app.get('/keyword', (req, res) => {

  // Keyword.find().then((docs) => {
  Keyword.find({},{'keyword':1, '_id':0}).then((docs) => {
    res.status(200).send(docs);
  })
  .catch((e) => res.status(404).send())
})

app.get('/keyword/:keyword', (req, res) => {
    var keyword = req.params.keyword;
  // Keyword.find().then((docs) => {
  Keyword.find({keyword}).then((docs) => {
    res.status(200).send(docs);
  })
  .catch((e) => res.status(404).send())
})

app.all('*', function (req, res) {
    res.sendFile(publicPath+'\\index.html');
})

app.listen(PORT, () => {
  console.log('Server is up at:',PORT );
})
