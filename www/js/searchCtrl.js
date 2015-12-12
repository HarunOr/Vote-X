 angular.module('starter.searchCtrl', ['firebase','ionicLazyLoad','ui.bootstrap'])
.controller("searchCtrl", function ($scope,$http,$rootScope,$ionicScrollDelegate) {
	
	$scope.search = [];
  var i = 0;
 
	
   // Firebase reference
   
    var rootRef = new Firebase("https://vote-x.firebaseio.com");
	
$scope.$on('$ionicView.beforeEnter', function() {
     // Code you want executed every time view is opened
		if($rootScope.currentUserSignedIn){
		
    	$scope.user_uid = rootRef.getAuth().uid;
	

	var searchRef = new Firebase("https://vote-x.firebaseio.com/users/"+$scope.user_uid+"/search_history");
  
  searchRef.on("child_added", function(snapshot) {
  var data = snapshot.val();
      


  console.log("data = "+data);

   var placeRef = "https://vote-x.firebaseio.com/users/"+$scope.user_uid+"/search_history/"+data.place_id+".json";
    console.log("placeRef = "+placeRef);
    
 $http.get(placeRef).then(function(resp) {
    $scope.search[resp.data.place_uid] = resp.data;
     }); 
      
      
    

  });


}
    
})
})