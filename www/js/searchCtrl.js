 angular.module('starter.searchCtrl', ['firebase','ionicLazyLoad','ui.bootstrap'])
.controller("searchCtrl", function ($scope,$http,$rootScope,$firebaseArray) {
	
	$scope.search = [];

 
	
   // Firebase reference
   
    var rootRef = new Firebase("https://vote-x.firebaseio.com");
	
$scope.$on('$ionicView.beforeEnter', function() {
    
		if($rootScope.currentUserSignedIn){
		
    	$scope.user_uid = rootRef.getAuth().uid;
	

	var searchRef = new Firebase("https://vote-x.firebaseio.com/users/"+$scope.user_uid+"/search_history");
  
  searchRef.on("child_added", function(snapshot) {
  var data = snapshot.key();
 
    
 
 var query = searchRef.limitToLast(25);
 $scope.searchHistory = $firebaseArray(query);

 
/*   var placeRef = "https://vote-x.firebaseio.com/users/"+$scope.user_uid+"/search_history/"+data.place_id+".json";
    
    // GET suchverlauf
    $http.get(placeRef).then(function(resp) {
    $scope.search[resp.data.place_uid] = resp.data;
     }); 
  */    
      
    

  });


}
    
})
})
