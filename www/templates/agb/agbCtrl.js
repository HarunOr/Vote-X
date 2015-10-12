angular.module('starter.agbCtrl', [])

.controller('agbCtrl', function ($scope,$state) { 
	
	
	$scope.goBack = function () {
		
		$state.go ('app.feedback');
	}
	
	
	
})