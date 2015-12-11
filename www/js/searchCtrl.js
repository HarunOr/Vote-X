 angular.module('starter.searchCtrl', ['firebase','ionicLazyLoad','ui.bootstrap'])
.controller("searchCtrl", function ($scope,$http,$rootScope) {
	
	$scope.search = [];
	var countPush = 0;
	
   // Firebase reference
   
    var rootRef = new Firebase("https://vote-x.firebaseio.com");
	
	
	  $scope.$on('$ionicView.beforeEnter', function() {
     // Code you want executed every time view is opened
  
  
		if($rootScope.currentUserSignedIn){
		
    	$scope.user_uid = rootRef.getAuth().uid;
	

	var searchRef = new Firebase("https://vote-x.firebaseio.com/users/"+$scope.user_uid+"/search_history");

	
	searchRef.once("value", function(snapshot) {
  	
  	snapshot.forEach(function(childSnapshot) {
    //Schleife
    var key = childSnapshot.key();
    
		$scope.search[countPush] = key;
		$scope.search[countPush].place = $http.get("https://maps.googleapis.com/maps/api/place/details/json?placeid="+$scope.search[countPush]+"&key=AIzaSyAPiSQRMf0-ZVJzrLwU9o56pm3Q_0fb6Hw").then(function(resp){
			$scope.search[countPush].place = resp.data;
		})
		countPush++;
		
		
	});
	

	
	
});


}	

});
	
	
	
});