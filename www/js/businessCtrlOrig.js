angular
       .module('starter.businessCtrl', ['uiGmapgoogle-maps','ionicLazyLoad'])
       .controller("businessCtrl", function ($scope, $state, $ionicScrollDelegate, $cordovaGeolocation, $http,$log) {





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
     
     $scope.resize = function() {
         
          setTimeout(function () {
    $ionicScrollDelegate.resize();
    },150);
        
     }
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

// Refresh
$scope.itemsR = [1,2,3];
  $scope.doRefresh = function() {
    $http.get('/new-itemsR')
     .success(function(newItems) {
       $scope.itemsR = newItems;
     })
     .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
  };
  
  
  
  //------------------------------TestImages------------------------------------

  $scope.testImages = [

  'http://www.ncr.com/wp-content/uploads/iStock_000016978975SmallMedium.jpg',
  'http://restaurantcoverings.com/wp-content/uploads/2014/09/Lemon-Water-Stock-Image.jpg',
  'http://www.blogrollcenter.com/news/gallery/searching-for-authentic-italian-restaurants/searching_for_authentic_italian_restaurants.jpg'
  
  ]; 

  $scope.testImages2 = [
  'http://blogs.independent.co.uk/wp-content/uploads/2013/02/pub.jpg',
  'http://www.saexplorers.org/sites/default/files/images/clubhouse/event/cusco/2013/pub1.jpg',
  'http://i.telegraph.co.uk/multimedia/archive/02328/harp_2328698b.jpg'
  
  ]; 

  
  // ------------------------------- Angular Google Map -----------------------
  $scope.map = { 
    center: { 
                latitude: 52.476020, 
                longitude: 13.290786 },
             zoom: 15
             };
 
     var events = {
          places_changed: function (searchBox) {}
        }
        
        $scope.searchbox = {  events:events};
        
         $scope.marker = {
      id: 0,
      coords: {
        latitude: 52.476020,
        longitude: 13.290786
      },
      options: { draggable: false },
      events: {
        dragend: function (marker, eventName, args) {
          $log.log('marker dragend');
          var lat = marker.getPosition().lat();
          var lon = marker.getPosition().lng();
          $log.log(lat);
          $log.log(lon);

          $scope.marker.options = {
            draggable: true,
            labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
            labelAnchor: "100 0",
            labelClass: "marker-labels"
          };
        }
      }
    };
    
 $scope.map2 = { 
    center: { 
                latitude: 51.227175, 
                longitude: 6.775432 },
             zoom: 15
             };


         $scope.marker2 = {
      id: 1,
      coords: {
        latitude: 51.227175,
        longitude: 6.775432
      },
      options: { draggable: false },
      events: {
        dragend: function (marker, eventName, args) {
          $log.log('marker dragend');
          var lat = marker.getPosition().lat();
          var lon = marker.getPosition().lng();
          $log.log(lat);
          $log.log(lon);

          $scope.marker.options = {
            draggable: true,
            labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
            labelAnchor: "100 0",
            labelClass: "marker-labels"
          };
        }
      }
    };

// -----------------------------------Google Maps END----------------------------------------------
});