 angular.module('starter.vote_historyCtrl', ['firebase','google.places'])
.controller("vote_historyCtrl", function ($scope,$rootScope,$ionicLoading, $timeout) {
	
    
    if($rootScope.currentUserSignedIn){
        
   
    var userVoteRef = new Firebase("https://vote-x.firebaseio.com/users/"+$rootScope.userInfo.uid+"/vote_history");
    $rootScope.counter = 0;
    $scope.votedPlace = [25];
    $scope.votedPlace[$rootScope.counter]= {id: 0, placeObject: "", voteText: "", votePoints: "", voteTime: "", voteUpvotes: 0};
    $scope.somethingExists = false;
    
    
    userVoteRef.limitToFirst(25).on("child_added", function(snapshot){
        
         $ionicLoading.show({
    template: '<ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner>'
  });
   
var votedPlaceRef = new Firebase("https://vote-x.firebaseio.com/places/"+snapshot.key()+"/votes/"+snapshot.val());   
votedPlaceRef.once("value", function(childSnapshot){
   
    var voteData = childSnapshot.val();
       var placeId = snapshot.key();
       
   var geocoder = new google.maps.Geocoder;
   geocoder.geocode({'placeId': placeId}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
      if (results[0]) {
          $scope.$apply(function(){
              $scope.somethingExists = true;
             $scope.votedPlace[$rootScope.counter] = {id: $rootScope.counter, placeObject: results[0], voteText:voteData.description,votePoints: voteData.vote_points, voteTime:voteData.vote_time,voteUpvotes: voteData.vote_upvotes};  
              
          })
        

          $rootScope.counter++;

      }}
   })
})   
    $timeout(function(){
     $ionicLoading.hide();      
    },200);
   
     
    });
    
     }
})
