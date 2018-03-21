app.config(['$stateProvider','$locationProvider', function($stateProvider, $locationProvider){

  // $locationProvider.html5Mode(true); //for pretty url

  //ui-router
  $stateProvider
  .state('home',{
    url:'/',
    templateUrl:'/views/search.html',
    controller:'SearchController'
  })
  .state('history',{
    url:'/history',
    templateUrl:'/views/history.html',
    controller: 'HistoryController'
  })
  .state('historyDetails',{
    url:'/history/images?keyword',
    templateUrl:'/views/historyDetails.html',
    controller: 'HistoryDetailsController',
    params: {
      keyword: {
        value: 'DefaultKeyword'
      }
    }
  })
}]);
