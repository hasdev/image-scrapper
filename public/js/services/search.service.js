app.service('search', ['$http', function($http){
  this.getImages = function(keyword, timestamp){
    return $http.post('/search', {
        keyword,
        timestamp
    });
  }
}])
