app.controller('HistoryDetailsController', ['$scope', 'historyDetails', '$stateParams', function($scope, historyDetails, $stateParams){
  $scope.historyDetails;
  $scope.keyword = $stateParams.keyword; //from url/state

  historyDetails.getImgList($scope.keyword).then(function(res){//calling service
    $scope.historyDetails = res.data;
  })
  .catch(function(e){
    console.log('Service Error: historyDetails',e);
  })
}]);
