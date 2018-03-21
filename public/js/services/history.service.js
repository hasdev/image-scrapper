app.service('history', ['$http', function($http){
  this.getSavedKeywords = function(keyword){
    return $http.get('/keyword');
  }
}])
