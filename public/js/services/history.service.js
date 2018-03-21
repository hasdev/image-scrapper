app.service('history', function($http){
  this.getSavedKeywords = function(keyword){
    return $http.get('/keyword');
  }
})
