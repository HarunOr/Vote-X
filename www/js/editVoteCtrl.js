 angular.module('starter.editVoteCtrl', ['firebase','ui.bootstrap'])
.controller("editVoteCtrl", function ($scope,$http,$rootScope,$firebaseArray,$ionicLoading,$ionicSlideBoxDelegate,$ionicPopup,$timeout) {
	
	// Kommentar Funktion

  var getVoteRef = new Firebase("https://vote-x.firebaseio.com/users/"+$rootScope.userInfo.uid+"/vote_history/"+$rootScope.placeObject.place_id);
  
  getVoteRef.once("value", function(snapshot){
      $rootScope.voteKey.key = snapshot.val();
      
  });  
  
  $timeout(function(){

  
  var myVoteRef = new Firebase("https://vote-x.firebaseio.com/places/"+$rootScope.placeObject.place_id+"/votes/"+$rootScope.voteKey.key);   
myVoteRef.once("value", function(snapshot){
    
    var data = snapshot.val();
   
    $scope.service = {points: data.vote_employees_points};
    $scope.location = {points: data.vote_location_points};
    $scope.quality = {points: data.vote_quality_points};
    $scope.best_value = {points: data.vote_best_value_points};
    $scope.ambiente = {points: data.vote_ambience_points};
    $scope.vote_images = {src: data.vote_images};
    $scope.description = {text: data.description};
    
    $scope.total = {points: ($scope.service.points + $scope.location.points + $scope.quality.points + $scope.best_value.points + $scope.ambiente.points)/5};
    $ionicSlideBoxDelegate.$getByHandle('editVote').enableSlide(false);
})}, 250);
   


     

      
  $scope.showInfo  = function(){
    
    $scope.total = {points: ($scope.service.points + $scope.location.points + $scope.quality.points + $scope.best_value.points + $scope.ambiente.points)/5};
    $rootScope.checkIfSecondSlide.is= true;
    $ionicSlideBoxDelegate.$getByHandle('editVote').next();
    $ionicSlideBoxDelegate.$getByHandle('editVote').update();             
  }
  
  


  //------------ TextArea functions ---------------
  
  
  
  $scope.autoExpand = function(e) {
        var element = typeof e === 'object' ? e.target : document.getElementById(e);
    		var scrollHeight = element.scrollHeight -20; // replace 60 by the sum of padding-top and padding-bottom
        element.style.height =  scrollHeight + "px";    
    };
  
  function expand() {
    $scope.autoExpand('TextArea');
  }  
  
  
        $scope.vote = function(){
   ;
    
    //Leerer Text
    
    
    if($scope.description.text == undefined){
        
             
   $ionicPopup.alert({
     title: 'Text zu kurz',
     template: 'Ihre Bewertung muss mindestends 10 Zeichen enthalten!'
   });
        
    }
    else {
        
    
    
    
  // Push new vote    
    var myVoteRef = new Firebase("https://vote-x.firebaseio.com/places/"+$rootScope.placeObject.place_id+"/votes/"+$rootScope.voteKey.key);   
	var votePusher = myVoteRef.update({
				  description: $scope.description.text,
				  vote_images: $scope.vote_images.src,
      		      vote_points: $scope.total,
				  vote_location_points: $scope.location.points,	
                  vote_employees_points: $scope.service.points,
				  vote_quality_points: $scope.quality.points,
				  vote_best_value_points: $scope.best_value.points,
                  vote_ambience_points: $scope.ambiente.points
				            }) ;    

         
  
  
  var voteHistoryRef = new Firebase("https://vote-x.firebaseio.com/users/"+$rootScope.userInfo.uid);
  
  voteHistoryRef.child("vote_history").child($rootScope.placeObject.place_id).set(votePusher.key());
  
                 
      
      
        $ionicPopup.alert({
     title: 'Erfolgreich gevotet',
     template: 'Ihre Bewertung wurde erfolgreich übermittelt!'
   });
   
        $rootScope.checkIfSecondSlide.is= false;
        $scope.myPopup.close();
      }}
  
	
})
