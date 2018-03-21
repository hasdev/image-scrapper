app.controller('SearchController', ['$scope', 'search', function($scope, search){
  $scope.imageData;
  $scope.enableSearch = false;
  $scope.showProgress = false;

  $scope.search = function(){
    $scope.enableSearch = true;
    $scope.showProgress = true;
    console.log('Searching with '+$scope.keyword);
    search.getImages($scope.keyword).then((res) => {
      $scope.imageData = res.data;
      $scope.showProgress = false;
      $scope.enableSearch = false;

      console.log('Search Success: ',$scope.imageData);
    })
    .catch((e) => {
      console.log('API error ', e);
    })
  }
}])
