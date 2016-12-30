angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams,$rootScope) {
})
  .controller('ItemListCtrl',function ($http,$scope,$rootScope) {
    $http.jsonp('https://moviestime.herokuapp.com/getMovies?callback=JSON_CALLBACK')
      .success(function (result) {
        result.push(JSON.parse('{"movieName":"ALL"}'));
        result.reverse();
        $scope.movies = result;
        $scope.selected = $scope.movies[0];
      })
      .error(function (data, status, headers, config) {
        //this always gets called
        console.log(status);
      });
    $scope.refresh = function() {

      $http.jsonp('https://moviestime.herokuapp.com/listData?callback=JSON_CALLBACK')
        .success(function (result) {
          $rootScope.items = result;
          $scope.$broadcast("scroll.refreshComplete");
        })
        .error(function (data, status, headers, config) {
          //this always gets called
          console.log(status);
        });
    }
  })
  .controller('ItemCtrl',function ($scope,$stateParams,$rootScope,$sce) {


var id=$stateParams.itemId;
    $scope.title='';
    for(var i=0;i<$rootScope.items.length;i++)
    {
      if($rootScope.items[i].Id==id)
      {
        $scope.item=$rootScope.items[i];
        $rootScope.trustSrc= $sce.trustAsResourceUrl($rootScope.items[i].trailerLink);
      }
    }
  })



;
