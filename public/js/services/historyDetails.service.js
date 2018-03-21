app.service('historyDetails', ['$http', function($http){
  this.getImgList = function(keyword){
    return $http.get('/keyword/'+keyword);
  }
}])
