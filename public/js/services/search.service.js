app.service('search', ['$http', function($http){
  this.getImages = function(keyword){
    return $http.post('/search', {
        keyword:keyword
    });
  }
}])
