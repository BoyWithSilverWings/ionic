// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('app', ['ionic', 'ionic.cloud'])

app.config(function($ionicCloudProvider) {
  $ionicCloudProvider.init({
    "core": {
      "app_id": "7b79a4c8"
    }
  });
});


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
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.controller('AuthenticationController', function($scope, $ionicUser, $ionicAuth) {
  $scope.error = "";
  $scope.loginData = {'username': 'dan', 'password': "123"};
  var loginOptions = {'inAppBrowserOptions': {'hidden': true}};
  $scope.sendData = function() {
    $ionicAuth.login('custom', $scope.loginData, loginOptions).then(function(){
        $scope.error = "Logged IN";
     }, function(err){
        $scope.error = err.errorcode;
     });
    console.log("Here");
  }
  
});


