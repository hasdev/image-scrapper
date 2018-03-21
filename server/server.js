require('./config/server.config.js')

const PORT = process.env.PORT;
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const date = require('node-datetime');

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
  var body = _.pick(req.body, ['keyword', 'timestamp']); //picking up required property only

  var url = `https://www.google.co.in/search?q=%22${body.keyword}%22&source=lnms&tbm=isch`;

  // var dateTime = date.create().format('Y-m-d H:M:S');
  var resData = {
    keyword:body.keyword,
    images:[]
  };

  request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            var count = 0;
            var jimpPromises = [];

            $('img', 'div#search').filter(function(){
                if(count == 15)
                  return;
                var data = $(this);
                var img = data.attr('src');
                count++;

                resData.images.push({url:img});

            })

            resData.images.forEach((imgObject, index) => {
              Jimp.read(imgObject.url)
                .then((jimpImg) => {
                  jimpPromises.push(
                    jimpImg.quality(70)
                            .greyscale()
                            .write("public/images/"+body.keyword+'-'+[index]+".png")
                  );
                })
              resData.images[index].url = "/images/"+body.keyword+'-'+[index]+".png";
            })

            Promise.all(jimpPromises).then(() => {

              var newDoc = new Keyword({
                keyword: body.keyword,
                images: resData.images,
                timestamp: body.timestamp
              });

              return newDoc.save()
            })
            .then((doc) => {
              res.status(200).send(doc);
            })
            .catch((e) => res.status(404).send(e))
        }
    })

})

app.get('/keyword', (req, res) => {

  // Keyword.find().then((docs) => {
  Keyword.find({},{'timestamp':2, 'keyword':1, '_id':0}).then((docs) => {
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
