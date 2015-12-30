 angular.module('starter.voteCtrl', ['firebase','ionicLazyLoad','ui.bootstrap'])
.controller("voteCtrl", function ($scope,$http,$rootScope,$firebaseArray,$ionicLoading,$ionicSlideBoxDelegate,$ionicPopup) {
	
	// Kommentar Funktion
	
	 
	 var place_votes = new Firebase("https://vote-x.firebaseio.com/places/"+$rootScope.placeObject.place_id+"/votes");
       
         $scope.description = {text: " "};
       //Für die Berechnung von Durchschnittswerten
      $scope.total_avg = 0;
      $scope.ambiente_avg = 0;
      $scope.best_value_avg = 0;
      $scope.service_avg = 0;
      $scope.location_avg = 0;
      $scope.quality_avg = 0;
       
   $scope.getSlider = $ionicSlideBoxDelegate.$getByHandle('vote');   
      
      $scope.vote_images = {src: null};
      
      
      
	  place_votes.once("value",function(snapshot){
      $scope.totalvotes = snapshot.numChildren();
      

      
      $scope.vote_nr = snapshot.numChildren()+1;
       var counter = 0;    
    var d = new Date();
    
	var minutes = d.getMinutes();
	var hours = d.getHours();
    var day = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();         
    
    
    

    
    
  
   place_votes.once("value",function(snapshot){

                
                   
    $scope.$apply(function(){
    
      snapshot.forEach(function(childSnapshot){
        
      counter++;    
      $scope.votexRatingCalc;
      $scope.temp = 0;
      $scope.ambiente_temp = 0;
      $scope.best_value_temp = 0;
      $scope.avgService_temp = 0;
      $scope.location_temp = 0;
      $scope.quality_temp = 0;
      
      //Nochmal die Votes berechnen
      //1. Gesamtdurchschnittswertung
      var avgPointRef = place_votes.child(childSnapshot.key()).child('vote_points');
      
      avgPointRef.once("value",function(data){
       $scope.avg_points = data.val()+$scope.temp;
       $scope.temp = $scope.avg_points;  
       console.info("counter = "+counter);                
      console.log("$scope.avg_points = "+$scope.avg_points);  
      $rootScope.voteUpdater.avg_points = $scope.avg_points;             
       });
       
      //2. Gesamtdurchschnitt Ambiente Wertung
      var avgAmbienteRef =  place_votes.child(childSnapshot.key()).child('vote_ambience_points');
           
      avgAmbienteRef.once("value",function(data){
        
       $scope.avg_ambience_points = data.val()+$scope.ambiente_temp;
       $scope.ambiente_temp = $scope.avg_ambience_points;                  
      console.log("$scope.avg_ambience_points = "+$scope.avg_ambience_points);                    
        $rootScope.voteUpdater.ambiente_avg = $scope.avg_ambience_points;                   
                        });      
      
      //3. Gesamtdurchschnitt Preis/Leistung Wertung
      
      var avgBestValueRef =  place_votes.child(childSnapshot.key()).child('vote_best_value_points');
           
      avgBestValueRef.once("value",function(data){
        
       $scope.best_value_points = data.val()+$scope.best_value_temp;
       $scope.best_value_temp = $scope.best_value_points;                  
      console.log("$scope.best_value_points = "+$scope.best_value_points);                    
       $rootScope.voteUpdater.best_value_avg = $scope.best_value_points;                     
                        });      

      //4. Gesamtdurchschnitt Service Wertung
      var avgServiceRef =  place_votes.child(childSnapshot.key()).child('vote_employees_points');
           
      avgServiceRef.once("value",function(data){
        
       $scope.avgService_points = data.val()+$scope.avgService_temp;
       $scope.avgService_temp = $scope.avgService_points;                  
      console.log("$scope.avgService_points = "+$scope.avgService_points);  
      $rootScope.voteUpdater.service_avg = $scope.avgService_points;                  
                            
                        });          
      //5. Gesamtdurchschnitt Location Wertung
      var avgLocationRef =  place_votes.child(childSnapshot.key()).child('vote_location_points');
           
      avgLocationRef.once("value",function(data){
        
       $scope.location_points = data.val()+$scope.location_temp;
       $scope.location_temp = $scope.location_points;                  
      console.log(" $scope.location_points = "+$scope.location_points);
      $rootScope.voteUpdater.location_avg = $scope.location_points;                    
                            
                        });                

      //6. Gesamtdurchschnitt Quality Wertung
      var avgQualityRef =  place_votes.child(childSnapshot.key()).child('vote_quality_points');
           
      avgQualityRef.once("value",function(data){
        
       $scope.quality_points = data.val()+$scope.quality_temp;
       $scope.quality_temp = $scope.quality_points;                  
      console.log(" $scope.quality_points = "+$scope.quality_points);                    
        $rootScope.voteUpdater.quality_avg = $scope.quality_points;                       
                        });
                   });              
              });	          
        });
	//Bild aufnehmen
  $scope.capturePic = function(){
    
    navigator.camera.getPicture(function(imageData){
        $scope.vote_images.src = imageData;
    },function(err){
        alert("Ups, etwas ist schief gelaufen!" +err);
    },{sourceType: Camera.PictureSourceType.CAMERA,
       destinationType: Camera.DestinationType.DATA_URL});
    

  };
  
  
  
  //Bild aus Gallerie
  $scope.selectPic = function(){
        navigator.camera.getPicture(function(imageData){
        $scope.vote_images.src = imageData;
    },function(err){
      alert("Ups, etwas ist schief gelaufen!"+err);  
    },{sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: Camera.DestinationType.DATA_URL}); 
  }
  
  
  
      $scope.vote = function(){
    $scope.vote_points = ($scope.location.points + $scope.service.points + $scope.quality.points + $scope.best_value.points + $scope.ambiente.points)/5;
    
    //Leerer Text
    
    
    if($scope.description.text == undefined){
        
             
   $ionicPopup.alert({
     title: 'Text zu kurz',
     template: 'Ihre Bewertung muss mindestends 10 Zeichen enthalten!'
   });
        
    }
    else {
    
    var voteCounterRef = new Firebase("https://vote-x.firebaseio.com/users/"+$rootScope.userInfo.uid);
    
    voteCounterRef.update({votes: ($rootScope.user.amountVotes + 1)});
    $rootScope.user.amountVotes = $rootScope.user.amountVotes+1;
    
  // Push new vote         
	var votePusher = place_votes.push({
                  vote_nr: $scope.vote_nr,
                  voter_uid: $rootScope.userInfo.uid,
				  vote_time: hours+":"+minutes+" "+day+"/"+(month+1)+"/"+year, 
				  reports: 0, 
				  description: $scope.description.text,
				  vote_images: $scope.vote_images.src,
      		      vote_points: $scope.vote_points,
				  vote_location_points: $scope.location.points,	
                  vote_employees_points: $scope.service.points,
				  vote_quality_points: $scope.quality.points,
				  vote_best_value_points: $scope.best_value.points,
                  vote_ambience_points: $scope.ambiente.points
				            }) ;    

            
            
  var placeRef =  new Firebase("https://vote-x.firebaseio.com/places/"+$rootScope.placeObject.place_id);
  placeRef.update({avg_ambience_points: (($rootScope.voteUpdater.ambiente_avg+$scope.ambiente.points)/($scope.totalvotes+1))});             
  placeRef.update({avg_vote_points: (($rootScope.voteUpdater.avg_points+$scope.vote_points)/($scope.totalvotes+1))});                   
  placeRef.update({avg_best_value_points: (($rootScope.voteUpdater.best_value_avg+$scope.best_value.points)/($scope.totalvotes+1))});                    
  placeRef.update({avg_employee_points: (($rootScope.voteUpdater.service_avg+$scope.service.points)/($scope.totalvotes+1))});                    
  placeRef.update({avg_location_points: (($rootScope.voteUpdater.location_avg+$scope.location.points)/($scope.totalvotes+1))});                    
  placeRef.update({avg_quality_points:(($rootScope.voteUpdater.quality_avg+$scope.quality.points)/($scope.totalvotes+1))});   
  
  
  var voteHistoryRef = new Firebase("https://vote-x.firebaseio.com/users/"+$rootScope.userInfo.uid);
  
  voteHistoryRef.child("vote_history").child($rootScope.placeObject.place_id).set(votePusher.key());
  
                 
      
      
        $ionicPopup.alert({
     title: 'Erfolgreich gevotet',
     template: 'Ihre Bewertung wurde erfolgreich übermittelt!'
   });
   
        $rootScope.checkIfSecondSlide.is= false;
        $scope.myPopup.close();
      }}
      
      
      
      
      
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