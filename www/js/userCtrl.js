angular.module('starter.userCtrl', [])

.controller('userCtrl', function ($scope, $ionicModal, userFactory) {

	$scope.viewerData = userFactory.giveProfileData();
	$scope.viewerData.since = $scope.viewerData.since.substring(5, 16);



  });
