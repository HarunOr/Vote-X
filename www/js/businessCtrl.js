angular
       .module('starter.businessCtrl', ['ionicLazyLoad','ion-place-tools'])
       .controller("businessCtrl", function ($scope, $state, $ionicPopup, $ionicModal ,$ionicScrollDelegate, $cordovaGeolocation, $http,$log, $ionicLoading, $ionicPlatform) {


  
  $scope.myCallback = function(place) {
     $scope.place = this.getPlace()
     console.log('callback');
     console.log(
       $scope.place.geometry.location.lat(),
      $scope.place.geometry.location.lng()
     );
     $scope.map.setCenter($scope.place.geometry.location);
   }
// ---------------------- Vote-X RATING ----------------------   
  $scope.rate = 5;
  $scope.rateBiz= 4;
 
  $scope.oneVote = 1;
  $scope.twoVote = 2;
  $scope.threeVote = 3;
  $scope.fourVote = 4;
  $scope.fiveVote = 5;

// // Business Name

$scope.businessName = "Marc's Restaurant";
$scope.businessName2 = "Harun's Bar";

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

  $scope.testImages = [

  'http://www.ncr.com/wp-content/uploads/iStock_000016978975SmallMedium.jpg',
  'http://restaurantcoverings.com/wp-content/uploads/2014/09/Lemon-Water-Stock-Image.jpg',
  'http://www.blogrollcenter.com/news/gallery/searching-for-authentic-italian-restaurants/searching_for_authentic_italian_restaurants.jpg'
  
  ]; 



  // ------------------------------ ngMap -------------------------------------
$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
    
  $scope.mapCenter = function(lat, lng) {
   return lat + "," + lng;

}    
 $scope.lat = "52.687484" ;     //dynamic google data, must be string z.B. "52.11341"
 $scope.lng = "13.567276" ; 


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
 
 
});