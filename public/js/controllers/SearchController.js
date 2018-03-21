app.controller('SearchController', ['$scope', 'search', function($scope, search){
  $scope.imageData;
  $scope.enableSearch = false;
  $scope.showProgress = false;

  $scope.search = function(){
    $scope.enableSearch = true;
    $scope.showProgress = true;

    search.getImages($scope.keyword, new Date().getTime() ).then(function(res){//calling service
      $scope.imageData = res.data;
      $scope.showProgress = false;
      $scope.enableSearch = false;

    })
    .catch(function(e){
      console.log('Service Error: search',e);
    })
  }
}])
