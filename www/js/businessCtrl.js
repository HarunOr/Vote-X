angular
       .module('starter.businessCtrl', ['ngMap','ionicLazyLoad'])
       .controller("businessCtrl", function ($scope, $state, $ionicScrollDelegate, $cordovaGeolocation, $http,$log, $ionicLoading, $ionicPlatform) {





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

  // ------------------------------ ngMap -------------------------------------
  $scope.loading = $ionicLoading.show({
      content: 'Wir suchen für dich gerade einen coolen Laden...',
      showBackdrop: false
    });    
    
  $scope.mapCenter = function(lat, lng) {
   return lat + "," + lng;

}    
 $scope.lat = "52.687484" ;     //dynamic google data, must be string z.B. "52.11341"
 $scope.lng = "13.567276" ; 



   $ionicPlatform.ready(function() {
     $scope.resize();
     console.log('resized ionic');
          $ionicLoading.hide();         
     });
});