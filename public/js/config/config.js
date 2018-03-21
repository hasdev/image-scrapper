app.config(['$stateProvider','$locationProvider', function($stateProvider, $locationProvider){

  $locationProvider.html5Mode(true);

  $stateProvider
  .state('home',{
    url:'/',
    templateUrl:'/views/search.html',
    controller:'SearchController'
  })
  .state('history',{
    url:'history',
    templateUrl:'/views/history.html',
    controller: 'HistoryController'
  })
}]);
