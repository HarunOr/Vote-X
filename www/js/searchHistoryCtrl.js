 angular.module('starter.searchHistoryCtrl', ['firebase','ionicLazyLoad','ui.bootstrap'])
.controller("searchHistoryCtrl", function ($scope,$http,$rootScope,$firebaseArray,$ionicLoading,$timeout) {
	
	$scope.search = [];

 
	
   // Firebase reference
   
    var rootRef = new Firebase("https://vote-x.firebaseio.com");
	
$scope.$on('$ionicView.beforeEnter', function() {
    
		if($rootScope.currentUserSignedIn){

        
        
    	$scope.user_uid = rootRef.getAuth().uid;
	

	var searchRef = new Firebase("https://vote-x.firebaseio.com/users/"+$scope.user_uid+"/search_history");
  
  searchRef.on("child_added", function(snapshot) {
    
  $ionicLoading.show({
    template: '<ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner>'
  });
 
 var query = searchRef.limitToLast(25);
 $scope.searchHistory = $firebaseArray(query);
     $timeout(function() {
     $ionicLoading.hide();; //close the popup after 0,5 seconds for some reason
  }, 500);

  });


}
    
})
})
