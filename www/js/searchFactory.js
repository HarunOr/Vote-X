var votex = angular

.module('starter.searchFactory',[]);

votex.factory('Search', function($scope, data){
	$scope.user_uid = data;
	
return $scope.user_uid;
	
	
	
})

