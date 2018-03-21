require('./config/server.config.js')

const PORT = process.env.PORT;
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const Jimp = require("jimp");

var prod;
var env = process.env.NODE_ENV || 'development';

if(env === 'development' || env === 'test'){
  prod = '';
}
else {
  prod = '/dist'; // serve from dist on production
}

const publicPath = path.join(__dirname, `../public${prod}`)


const { mongoose } = require('./db/mongoose');
const { Keyword } = require('./models/keyword');

const app = express();

app.use(bodyParser.json());

app.use(express.static(publicPath));

app.post('/search', (req, res) => {
  var body = _.pick(req.body, ['keyword', 'timestamp']); //picking up required property only

  var url = `https://www.google.co.in/search?q=%22${body.keyword}%22&source=lnms&tbm=isch`;

  var resData = { //resData from scraping
    keyword:body.keyword,
    images:[]
  };

  request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            var count = 0;
            var jimpPromises = [];

            $('img', 'div#search').filter(function(){ //searching for el img under div with id search
                if(count == 15)
                  return;

                var data = $(this);
                var img = data.attr('src'); //extractiong src
                count++;
                resData.images.push({url:img}); //pushing to store

            })

            resData.images.forEach((imgObject, index) => { //using foreach to preserve index value
              Jimp.read(imgObject.url)
                .then((jimpImg) => {
                  jimpPromises.push(//combining all promises
                    jimpImg.quality(70)
                            .greyscale()
                            .write(`public${prod}/images/`+body.keyword.replace(/\s/g,'')+'-'+[index]+".png") // writing to public/images, overriding with .png
                  );
                })
              resData.images[index].url = "/images/"+body.keyword.replace(/\s/g,'')+'-'+[index]+".png"; // updating url to our resource
            })

            Promise.all(jimpPromises).then(() => {
              //when jimp completes its task save to db and return res
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

  Keyword.find({},{'timestamp':2, 'keyword':1, '_id':0}).then((docs) => {//find all and get mentioned properties only
    res.status(200).send(docs);
  })
  .catch((e) => res.status(404).send())
})

app.get('/keyword/:keyword', (req, res) => {
  var keyword = req.params.keyword;

  Keyword.find({keyword}).then((docs) => {//find by keyword
    res.status(200).send(docs);
  })
  .catch((e) => res.status(404).send())
})

app.get('*', function (req, res) { //redirection for angular routing
    res.sendFile(path.resolve(publicPath+'\index.html'));
})

app.listen(PORT, () => {
  console.log('Server is up at:',PORT );
})
