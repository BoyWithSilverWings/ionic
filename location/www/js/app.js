// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic','ngCordova']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);

      if(window.Connection) {
          if(navigator.connection.type == Connection.NONE) {
              $ionicPopup.confirm({
                  title: "Internet Disconnected",
                  content: "The internet is disconnected on your device."
              })
              .then(function(result) {
                  if(!result) {
                      ionic.Platform.exitApp();
                  }
              });
          }
      }
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.controller('GeoCtrl', function($cordovaGeolocation,$scope,$http) {

  $scope.lat = null;
  $scope.lon = null;
  $scope.currentDate = Date();
  $scope.attendace;
  $scope.response;
  $scope.io;
  $scope.remarks;
  var posOptions = {timeout: 10000, enableHighAccuracy: true};
  $scope.changeFunction = function() {
      if($scope.attendance==true) {
      
        $scope.io = 'in';

      } else {
         
        $scope.io = 'out';
          
      }

      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          $scope.lat  = position.coords.latitude;
          $scope.lon  = position.coords.longitude;
          $http.get("http://csalpha2013.esy.es/php/ionic.php?io="+$scope.io+"&lat="+$scope.lat+"&lon="+$scope.lon+"&remarks="+$scope.remarks);
      .success(function (response) { 
      });
          $http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+$scope.lat+","+$scope.lon+"&key=AIzaSyB-tRIR2ztbbS7tUo1GeQBpZGZUPRU3B88")
          .success(function(response) {
              $scope.response = response.results[0].formatted_address;
          });
        }, function(err) {
          $scope.lat = err.code;
          console.log(err);
        });    
      }
});
