 angular.module('starter.voteCtrl', ['firebase','ionicLazyLoad','ui.bootstrap'])
.controller("voteCtrl", function ($scope,$http,$rootScope,$firebaseArray,$ionicLoading,$timeout, $rootScope) {
	
	// Kommentar Funktion
	
	 
	 var place_votes = new Firebase("https://vote-x.firebaseio.com/places/"+$rootScope.placeObject.place_id+"/votes");
      
	  place_votes.once("value",function(snapshot){
      
      $scope.vote_nr = snapshot.numChildren()+1;
      
    var d = new Date();
	
	var hour = d.getHours;
    var day = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();         
    
   $scope.vote_points = ($scope.vote_location_points + $scope.vote_employee_points + $scope.vote_quality_points + $scope.best_value_points)/4;
    
           
	place_votes.push({
          vote_nr: $scope.vote_nr,
          voter_uid: $scope.user_uid,
				  vote_time: hour+" "+day+" "+(month+1)+" "+year, 
				  reports: 0,
				  title: $scope.title,   
				  description: $scope.description,
				  vote_images: $scope.vote_images,
      		vote_points: $scope.vote_points,
				  vote_location_points: $scope.vote_location_points,	
          vote_employees_points: $scope.vote_employees_points,
				  vote_quality_points: $scope.vote_quality_points,
				  vote_best_value_points: $scope.best_value_points
				            }) ;    
	
	  });
	
	
})