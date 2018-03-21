app.service('search', function($http){
  this.getImages = function(keyword, timestamp){
    return $http.post('/search', {
        keyword:keyword,
        timestamp:timestamp
    });
  }
})
