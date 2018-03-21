app.controller('HistoryController', ['$scope', 'history','$state', function($scope, history, $state){
  $scope.history;
  history.getSavedKeywords().then((res) => {
    $scope.history = res.data;
  })
  $scope.viewResult = function(keyword){
      $state.go('historyDetails',{'keyword':keyword});
    };
}])
