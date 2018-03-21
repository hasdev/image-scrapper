app.controller('HistoryController', ['$scope', 'history', function($scope, history){
  $scope.history;
  history.getSavedKeywords().then((res) => {
    $scope.history = res.data;
  })
}])
