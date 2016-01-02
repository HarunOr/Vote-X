angular.module('starter.agbCtrl', [])

.controller('agbCtrl', function ($scope,$state, $rootScope, $ionicPopup) { 
	
	
	$scope.goBack = function () {
		
		$state.go ('app.feedback');
	}
	
    
    $rootScope.agbCounter = 0;
	
    
    $scope.counter = function(){
      $rootScope.agbCounter++;
      
      if($rootScope.agbCounter == 3){
            $ionicPopup.alert({
     title: 'Developed by Harun Oral',
     template: '<p align="center">www.harunoral.de</p>'
   });
      }  
    };
	
})