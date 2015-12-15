var votex = angular
       .module('starter.controllers')
       .controller("businessCtrl", function ($scope,$rootScope, $state, $ionicPopup, $ionicModal ,
                                             $ionicScrollDelegate, $http,$log,
                                             $ionicLoading, $ionicPlatform) {

 var ref = new Firebase("https://vote-x.firebaseio.com/");

var place ;
if($rootScope.placeObject != undefined){
  
$scope.place = $rootScope.placeObject;

var place_votes = new Firebase("https://vote-x.firebaseio.com/places/"+$scope.place.place_id+"/votes");
place_votes.once("value",function(snapshot){

                    
  if(snapshot.numChildren() != null || snapshot.numChildren() != undefined){  
  $scope.totalRatings = snapshot.numChildren();
  }
         });  

// ---------------------- Vote-X RATING ----------------------   
  $scope.rate = 5;
  $scope.rateBiz= 4;
 
  $scope.oneVote = 1;
  $scope.twoVote = 2;
  $scope.threeVote = 3;
  $scope.fourVote = 4;
  $scope.fiveVote = 5;

// // Business Name

$scope.businessName = $scope.place.name;


// ---------------------- End RATING ----------------------
$scope.goHome = function() {
$state.go("app.home");
}
  
  //-----------------------------Ionic-Accordion-------------------------------
  
  $scope.groups = [2];
  
  $scope.groups[0] = { active: 0, name: "Detaillierte Votes",items: [("Test"), ("Test2")]  };
  $scope.groups[1] = { active: 0, name: "Bewertungen",items: ("Test")  };
  $scope.groups[2] = { active: 0, name: "Beschreibung",items: ("Test")  };
  

    $scope.toggleGroup = function (group) {
    
    if (group.active === 1) {
        group.active = 0;
    }
    else {
      group.active = 1;
    }
  
    
    };
    
     $scope.isGroupShown = function (group) {
        if(group.active === 1){
          return true;
        }
        
        else {
          return false;
        }
    };
    
  
  //------------------------------TestImages------------------------------------
  if($scope.place.photos != undefined){
    $scope.testImages = [];   
    
    for(var i = 0; $scope.place.photos[i] != undefined && i < 5; i++){
     $scope.testImages.push($scope.place.photos[i].getUrl({'maxWidth':750, 'maxHeight':400})); 
     
    }
     $scope.isGoogle = "true";
     
                    }
  



  // ------------------------------ ngMap -------------------------------------
$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
    
  $scope.mapCenter = function(lat, lng) {
   return lat + "," + lng;

}    
 $scope.lat = $rootScope.placeObject.geometry.location.lat() ;     //dynamic google data, must be string z.B. "52.11341"
 $scope.lng = $rootScope.placeObject.geometry.location.lng() ; 


  $scope.openBusinessMap = function() {
   
$scope.myBusinessPopup = $ionicPopup.show({
     templateUrl:'templates/businessMap.html',
     scope: $scope,
     cssClass: 'businessMap'
      })}; 

      $scope.closeBusiness = function(){
        $scope.myBusinessPopup.close();
      }
 
 

 // Vote-Popup

  $scope.openVote = function() {
   
$scope.myPopup = $ionicPopup.show({
     templateUrl:'templates/vote.html',
     scope: $scope,
     cssClass: 'businessMap'
      })}; 
      
 
       $scope.closeVote = function(){
        $scope.myPopup.close();
      }
 
}

else {
  $state.go('app.home');
}
 
});