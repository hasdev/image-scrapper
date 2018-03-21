require('./config/server.config.js')

const PORT = process.env.PORT;
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const path = require('path');
const Scraper = require('images-scraper');
const google = new Scraper.Google();

const publicPath = path.join(__dirname, '../public')

const { mongoose } = require('./db/mongoose');
// const { Image } = require('./models/image');

const app = express();

app.use(bodyParser.json());

app.use(express.static(publicPath));

app.post('/search', (req, res) => {
  var body = _.pick(req.body, ['keyword']);
  console.log('Search Keyword ',body);
  
  google.list({
  	keyword: 'banana',
  	num: 15,
  	detail: true,
  	nightmare: {
  		show: true
  	}
  })
  .then((res) => {
  	res.status(200).send(res);
  }).catch((e) => res.status(404).send(e));

  // you can also watch on events
  google.on('result', function (item) {
  	console.log('out', item);
  });
});

app.all('*', function (req, res) {
    res.sendFile(publicPath+'\\index.html');
})

app.listen(PORT, () => {
  console.log('Server is up at:',PORT );
})
