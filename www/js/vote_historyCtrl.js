 angular.module('starter.vote_historyCtrl', ['firebase','google.places'])
.controller("vote_historyCtrl", function ($scope,$rootScope,$ionicLoading, $firebaseArray) {
	var userVoteRef = new Firebase("https://vote-x.firebaseio.com/users/"+$rootScope.userInfo.uid+"/vote_history");
    
    $scope.votedPlace= [];
    
    
    userVoteRef.on("child_added", function(snapshot){
        
         $ionicLoading.show({
    template: '<ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner>'
  });
   
var votedPlaceRef = new Firebase("https://vote-x.firebaseio.com/places/"+snapshot.key()+"/votes/"+snapshot.val());   
votedPlaceRef.once("value", function(childSnapshot){
    var voteData = childSnapshot.val();
    $scope.votePoints = voteData.vote_points;
    $scope.voteUpvotes = voteData.vote_upvotes;
    $scope.voteText = voteData.description;
    $scope.voteTime = voteData.vote_time;
    console.info("$scope.votePoints "+$scope.votePoints);
    console.info("$scope.voteText "+$scope.voteText);
    
})   
   var placeId = snapshot.key();
   var geocoder = new google.maps.Geocoder;
   geocoder.geocode({'placeId': placeId}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
      if (results[0]) {
          $scope.votedPlace.push(results[0]);
        console.info($scope.votedPlace);
      }}
   })
   
     $ionicLoading.hide();   
    });
    
    
})
