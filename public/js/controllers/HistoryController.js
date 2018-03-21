app.controller('HistoryController', ['$scope', 'history','$state', function($scope, history, $state){
  $scope.history;
  history.getSavedKeywords().then((res) => {
    $scope.history = res.data;
    console.log($scope.history);
  })
  $scope.viewResult = function(keyword){
      $state.go('historyDetails',{'keyword':keyword});
    };
}])
