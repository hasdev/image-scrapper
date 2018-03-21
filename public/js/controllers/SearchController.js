app.controller('SearchController', ['$scope', 'search', function($scope, search){
  $scope.imageData;

  $scope.search = function(){
    console.log('Searching with '+$scope.keyword);
    search.getImages($scope.keyword).then((res) => {
      $scope.imageData = res.data;
      console.log(typeof $scope.imageData.urls);
      console.log($scope.imageData.urls);

    })
    .catch((e) => {
      console.log('API error ', e);
    })
  }
}])
