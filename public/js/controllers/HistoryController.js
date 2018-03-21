app.controller('HistoryController', ['$scope', 'history','$state', function($scope, history, $state){
  $scope.history;

  history.getSavedKeywords().then(function(res) { //calling service
    $scope.history = res.data;
  })
  .catch(function(e){
    console.log('Service Error: history',e);
  })

  $scope.viewResult = function(keyword){//to view past searches result
      $state.go('historyDetails',{'keyword':keyword});
  };
}])
