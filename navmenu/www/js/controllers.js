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

    $http.jsonp('https://moviestime.herokuapp.com/getCenima?callback=JSON_CALLBACK')
      .success(function (result) {
        result.push(JSON.parse('{"cenima":"ALL"}'));
        result.reverse();
        $rootScope.cenima = result;
        $rootScope.CenimaSelected = $rootScope.cenima[0];
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

  .controller('PopupCrtl',function ($scope,$stateParams,$rootScope,$ionicPopup) {
    $scope.currentDate = new Date();
    $scope.datePickerCallback = function (val) {
      if (!val) {
        console.log('Date not selected');
      } else {
        console.log('Selected date is : ', val);
      }
    };
    $scope.filterPopup= function(){
      var confirmPopup = $ionicPopup.confirm({
        title: 'SEARCH BY CHOICE',
        template: ' <label class=" col col-100"  > <b> Select Cenima</b> </label>'+
        ' <select ng-options="cenima as cenima.cenima for cenima in cenima track by cenima.cenima" class=" col col-100" ng-model="CenimaSelected"></select>'+
        ' <label class=" col col-100"  > <b> Select Date</b> </label>'+
          '<input class="my-date-time-picker" type="date"  ng-model="currentDate" ng-click="popup()" >',
         // '<input type="date" >',
        //' <select ng-options="cenima as cenima.cenima for cenima in cenima track by cenima.cenima" class=" col col-100" ng-model="CenimaSelected"></select>',
        buttons: [{
          text: 'Filter',
          type: 'button-block button-outline button-stable',
          scope: null,
          onTap: function(e) {
            $scope.showAlert();
          }

        }, {
          text: 'Back',
          type: 'button-block button-outline button-stable',
          onTap: function(e) {

          }
        }]
      });
      confirmPopup.then(function(res){
        if(res){

        }else{

        }
      });
    };

    // permissions
    $scope.showAlert = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'we would like yo access',
        template: '<i class="ion-android-contacts"></i> Contact <br/> <i class="ion-android-locate"></i> Location',
        okType: 'button-block button-outline button-stable',

      });
      alertPopup.then(function(res) {
        console.log(45);
      });
    };

  })

;
