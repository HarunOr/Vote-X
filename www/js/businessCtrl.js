angular
       .module('starter.businessCtrl', ['ngMap','ionicLazyLoad'])
       .controller("businessCtrl", function ($scope, $state, $ionicPopup, $ionicModal ,$ionicScrollDelegate, $cordovaGeolocation, $http,$log, $ionicLoading, $ionicPlatform) {



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
  
  
  /*
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

  */
  
  //-----------------------------Ionic-Accordion-------------------------------
  
  $scope.groups = [2];
  
  $scope.groups[0] = {  name: "Detaillierte Votes",items: [("Test"), ("Test2")]};
  $scope.groups[1] = {  name: "Bewertungen",items: ("Test")};
  $scope.groups[2] = {  name: "Beschreibung",items: ("Test")};
  
  /*
    for (var i = 0; i < 3; i++) {
        $scope.groups[i] = {
            name: i,
            items: []
        };
        for (var j = 0; j < 3; j++) {
            $scope.groups[i].items.push(i + '-' + j);
        }
    } */

    /*
     * if given group is the selected group, deselect it
     * else, select the given group
     */
    $scope.toggleGroup = function (group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;
        }
    };
    $scope.isGroupShown = function (group) {
        return $scope.shownGroup === group;
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
     template: ('<ion-header-bar align-title="center" class="bar-stable">'+
                '<h1 class="title">{{businessName}}</h1>'+
                '</div></ion-header-bar>'+
     '<div class="info"><div map-lazy-load="http://maps.googleapis.com/maps/api/js?libraries=places&amp;sensor=false&amp;language=de&amp;v=3.20" ><map draggable="false" center="{{mapCenter(lat,lng)}}" zoom="15"><marker position="{{mapCenter(lat,lng)}}"></marker><info-window id="1" position="{{mapCenter(lat,lng)}}" ><div ng-non-bindable>Chicago,IL<br/></div></info-window></map></div></div>'),
     scope: $scope,
     buttons: [
                {
                  text: '<b>Schließen</b>',
                  type: 'button-positive',
                  style: 'max-width: 350px',
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