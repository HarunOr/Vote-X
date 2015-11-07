angular
       .module('starter.businessCtrl', ['ngMap','ionicLazyLoad'])
       .controller("businessCtrl", function ($scope, $state, $ionicPopup ,$ionicScrollDelegate, $cordovaGeolocation, $http,$log, $ionicLoading, $ionicPlatform) {



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
  
// Collapse
     $scope.isCollapsed = false;
     
// Dynamic accordion bootstrap

  $scope.statusVotes = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  
   $scope.statusArticle = {
    open: true,   
    isFirstOpen: true,
    isFirstDisabled: false
  };
  
   $scope.statusMap = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  
     $scope.statusComments = { 
    isFirstOpen: true,
    isFirstDisabled: false
  };
  
  $scope.groups = [
    {
      title: 'Erweitere Votes',
      content: 'Dynamic Group Body - 1'
    },
  ];

  $scope.items = ['Item 1', 'Item 2', 'Item 3'];

  $scope.addItem = function() {
    var newItemNo = $scope.items.length + 1;
    $scope.items.push('Item ' + newItemNo);
  };

  
  
  
  //------------------------------TestImages------------------------------------

  $scope.testImages = [

  'http://www.ncr.com/wp-content/uploads/iStock_000016978975SmallMedium.jpg',
  'http://restaurantcoverings.com/wp-content/uploads/2014/09/Lemon-Water-Stock-Image.jpg',
  'http://www.blogrollcenter.com/news/gallery/searching-for-authentic-italian-restaurants/searching_for_authentic_italian_restaurants.jpg'
  
  ]; 



  // ------------------------------ ngMap -------------------------------------

    
  $scope.mapCenter = function(lat, lng) {
   return lat + "," + lng;

}    
 $scope.lat = "52.687484" ;     //dynamic google data, must be string z.B. "52.11341"
 $scope.lng = "13.567276" ; 

 // An alert dialog
 
var mapPop;
 
 $scope.showBusinessMap = function() {
   
 var mapPopup=$ionicPopup.show({
     template: '<div class="info"><div map-lazy-load="http://maps.googleapis.com/maps/api/js?libraries=places&amp;sensor=false&amp;language=de&amp;v=3.20" ><map draggable="false" center="{{mapCenter(lat,lng)}}" zoom="15"><marker position="{{mapCenter(lat,lng)}}"></marker><info-window id="1" position="{{mapCenter(lat,lng)}}" ><div ng-non-bindable>Chicago,IL<br/></div></info-window></map></div></div> ',
     scope: $scope,
     buttons: [
                {
                  title: 'Karte',
                  text: '<b>Schließen</b>',
                  type: 'button-positive',
                  style: 'margin-top: 100%',
                  onTap: function(e) {
                    return true;
                  }
                },
              ],
     cssClass: 'businessMap'
      }).then(function(res) {
      }, function(err) {
        console.log('Err:', err);
      }, function() {
        // If you need to access the popup directly, do it in the notify method
        // This is also where you can programatically close the popup:
        // popup.close();
          console.log('The popup');

        mapPop = mapPopup;
      });
      mapPop = mapPopup;    
 };
 
 
 // Vote-Popup
 
  $scope.vote = function() {
   
$ionicPopup.show({
     template: '<div class="info"><div map-lazy-load="http://maps.googleapis.com/maps/api/js?libraries=places&amp;sensor=false&amp;language=de&amp;v=3.20" ><map draggable="false" center="{{mapCenter(lat,lng)}}" zoom="15"><marker position="{{mapCenter(lat,lng)}}"></marker><info-window id="1" position="{{mapCenter(lat,lng)}}" ><div ng-non-bindable>Chicago, IL<br/></div></info-window></map></div></div> ',
     scope: $scope,
     buttons: [
                {
                  text: '<b>Schließen</b>',
                  type: 'button-positive',
                  style: 'margin-top: 100%',
                  onTap: function(e) {
                    return true;
                  }
                },
              ],
     cssClass: 'businessMap'
      })};
 

 
});