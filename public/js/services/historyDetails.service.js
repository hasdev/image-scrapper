app.service('historyDetails', function($http){
  this.getImgList = function(keyword){
    return $http.get('/keyword/'+keyword);
  }
})
