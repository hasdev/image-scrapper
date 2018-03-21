# Google Image Scrapper

Uses request to fetch html, cheerio to parse it for images. Jimp for compression and writing to server. MongoDb to store final results.
Uses angularjs on client-side, can search for images and retrieve past search data. Ui-component lib used is angular-material.
* public folder holds the client app.
* server folder holds the api-backend.

## Getting Started

### Prerequisites

* node
* mongodb

### Installing

```
npm install
bower install
npm run start
or
npm run start-watch
```

## Database

The databse is hosted on [mlab.com](https://mlab.com) for production.
For local, a mongodb instance should be running at localhost:27017

## Deployment

The app is deployed using heroku on [https://powerful-dusk-34453.herokuapp.com/](https://powerful-dusk-34453.herokuapp.com/)
On production the app is served via dist setup using gulp.

## References

* [https://scotch.io/tutorials/scraping-the-web-with-node-js](https://scotch.io/tutorials/scraping-the-web-with-node-js) - Web scraping basics

## Authors

* **Udhay Singh Manhas** 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

