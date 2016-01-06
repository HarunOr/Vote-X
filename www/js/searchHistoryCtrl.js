 angular.module('starter.searchHistoryCtrl', ['firebase','ionicLazyLoad','ui.bootstrap'])
.controller("searchHistoryCtrl", function ($scope,$http,$rootScope,$firebaseArray,$ionicLoading,$timeout) {
	
	$scope.search = [];

 
	
   // Firebase reference
   
    var rootRef = new Firebase("https://vote-x.firebaseio.com");
	if($rootScope.currentUserSignedIn){
    $scope.$on('$ionicView.beforeEnter', function() {

    	$scope.user_uid = rootRef.getAuth().uid;
	
  var numRef = new Firebase("https://vote-x.firebaseio.com/users/"+$scope.user_uid+"/search_history");
  

	var searchRef = new Firebase("https://vote-x.firebaseio.com/users/"+$scope.user_uid+"/search_history");
  
  searchRef.limitToFirst(25).on("child_added", function(snapshot) {
 $scope.totalSearchHistory = snapshot.numChildren();   
  $ionicLoading.show({
    template: '<ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner>'
  });
$scope.searchHistory = $firebaseArray(searchRef);

     $timeout(function() {
     $ionicLoading.hide();; //close the popup after 0,5 seconds for some reason
  }, 500);

  });
  

})
    
}
})
