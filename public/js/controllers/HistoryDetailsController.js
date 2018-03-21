app.controller('HistoryDetailsController', ['$scope', 'historyDetails', '$stateParams', function($scope, historyDetails, $stateParams){
  $scope.historyDetails;

  $scope.keyword = $stateParams.keyword;
  historyDetails.getImgList($scope.keyword).then((res) => {
    $scope.historyDetails = res.data;
    console.log($scope.historyDetails);
  })
}]);
