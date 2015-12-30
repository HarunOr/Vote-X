angular.module('starter.userCtrl', [])

.controller('userCtrl', function ($scope, $firebaseAuth, $rootScope, $ionicPopup,$timeout, $ionicLoading, $ionicScrollDelegate) {
	    console.info("ionic.Platform.isWebView() = "+ionic.Platform.isWebView());
        if(ionic.Platform.isWebView()){
           screen.lockOrientation('portrait'); 
            
        }

        

          
	 
  });
