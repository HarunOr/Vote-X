 angular.module('starter.voteCtrl', ['firebase','ionicLazyLoad','ui.bootstrap'])
.controller("voteCtrl", function ($scope,$http,$rootScope,$firebaseArray,$ionicLoading,$ionicSlideBoxDelegate) {
	
	// Kommentar Funktion
	
	 
	 var place_votes = new Firebase("https://vote-x.firebaseio.com/places/"+$rootScope.placeObject.place_id+"/votes");
      
   $scope.getSlider = $ionicSlideBoxDelegate.$getByHandle('vote');   
      
      
	  place_votes.once("value",function(snapshot){
      $scope.totalvotes = snapshot.numChildren();
      $scope.vote_nr = snapshot.numChildren()+1;
      
    var d = new Date();
	
	var hour = d.getHours;
    var day = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();         
    
   $scope.vote_points = ($scope.vote_location_points + $scope.vote_employee_points + $scope.vote_quality_points + $scope.best_value_points)/4;
    
    
    
  
   place_votes.once("value",function(snapshot){

   var counter = 0;                  
                   
    $scope.$apply(function(){
    
      snapshot.forEach(function(childSnapshot){
        
      counter++;    
      $scope.votexRatingCalc;
      $scope.temp = 0;
      //Nochmal die Votes berechnen
      //1. Gesamtdurchschnittswertung
      var avgPointRef = place_votes.child(childSnapshot.key()).child('avg_points');
      
      avgPointRef.once("value",function(data){
       $scope.avg_points = data.val()+$scope.temp;
       $scope.temp = $scope.avg_points;                  
      console.log("$scope.avg_points = "+$scope.avg_points);                    
       });
       
      //2. Gesamtdurchschnitt Ambiente Wertung
      var avgAmbienteRef =  place_votes.child(childSnapshot.key()).child('vote_ambience_points');
           
      avgAmbienteRef.once("value",function(data){
        
       $scope.avg_ambience_points = data.val()+$scope.ambiente_temp;
       $scope.ambiente_temp = $scope.avg_ambience_points;                  
      console.log("$scope.avg_ambience_points = "+$scope.avg_ambience_points);                    
                            
                        });      
      
      //3. Gesamtdurchschnitt Preis/Leistung Wertung
      
      var avgBestValueRef =  place_votes.child(childSnapshot.key()).child('vote_best_value_points');
           
      avgBestValueRef.once("value",function(data){
        
       $scope.best_value_points = data.val()+$scope.best_value_temp;
       $scope.best_value_temp = $scope.best_value_points;                  
      console.log("$scope.best_value_points = "+$scope.best_value_points);                    
                            
                        });      

      //4. Gesamtdurchschnitt Service Wertung
      var avgServiceRef =  place_votes.child(childSnapshot.key()).child('vote_employee_points');
           
      avgServiceRef.once("value",function(data){
        
       $scope.avgService_points = data.val()+$scope.avgService_temp;
       $scope.avgService_temp = $scope.avgService_points;                  
      console.log("$scope.avgService_points = "+$scope.avgService_points);                    
                            
                        });          
      //5. Gesamtdurchschnitt Location Wertung
      var avgLocationRef =  place_votes.child(childSnapshot.key()).child('vote_location_points');
           
      avgLocationRef.once("value",function(data){
        
       $scope.location_points = data.val()+$scope.location_temp;
       $scope.location_temp = $scope.location_points;                  
      console.log(" $scope.location_points = "+$scope.location_points);                    
                            
                        });                

      //5. Gesamtdurchschnitt Quality Wertung
      var avgQualityRef =  place_votes.child(childSnapshot.key()).child('vote_quality_points');
           
      avgQualityRef.once("value",function(data){
        
       $scope.quality_points = data.val()+$scope.quality_temp;
       $scope.quality_temp = $scope.quality_points;                  
      console.log(" $scope.quality_points = "+$scope.quality_points);                    
                            
                        });
                   });              
              });	          
        });
	
  
  
  
      var comment = function(){
           
           
           
           
  // Push new vote         
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
				  vote_best_value_points: $scope.best_value_points,
          vote_ambience_points: $scope.vote_ambience_points
				            }) ;    
                    
  // calculate new average values
  var placeRef =  new Firebase("https://vote-x.firebaseio.com/places/"+$rootScope.placeObject.place_id);
  placeRef.child('avg_ambience_points').set(($scope.avg_ambience_points/$scope.totalVotes));                 
  placeRef.child('avg_vote_points').set(($scope.avg_points/$scope.totalVotes));                   
                    
                    
                    
                    
      }
      $scope.service = {points: 3};
      $scope.location = {points: 3};
      $scope.quality = {points: 3};
      $scope.best_value = {points: 3};
      $scope.ambiente = {points: 3};
      
   
   $ionicSlideBoxDelegate.$getByHandle('vote').enableSlide(false);

     

      
  $scope.showInfo  = function(){
    
    $scope.total = ($scope.best_value.points+$scope.service.points+$scope.quality.points+$scope.location.points+$scope.ambiente.points)/5;  
    $rootScope.checkIfSecondSlide.is= true;
    $ionicSlideBoxDelegate.$getByHandle('vote').next();
    $ionicSlideBoxDelegate.$getByHandle('vote').update();             
  }
  
  


  //------------ TextArea functions ---------------
  
  $scope.description = {text: " "};
  
  
  
  $scope.autoExpand = function(e) {
        var element = typeof e === 'object' ? e.target : document.getElementById(e);
    		var scrollHeight = element.scrollHeight -20; // replace 60 by the sum of padding-top and padding-bottom
        element.style.height =  scrollHeight + "px";    
    };
  
  function expand() {
    $scope.autoExpand('TextArea');
  }  
  
  
	
})
});