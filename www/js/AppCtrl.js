 angular
 
  .module('starter.controllers', [ 'ui.bootstrap','ionicLazyLoad','google.places','ngMap'])

  .controller('AppCtrl', function ($scope, $http,$ionicPlatform,
                                   $state, $ionicModal, $timeout, 
                                   $ionicPopup, $cordovaOauth, 
                                   $ionicLoading, $ionicScrollDelegate
                                    )    {

// Search
   
$scope.testImage = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key=AIzaSyAPiSQRMf0-ZVJzrLwU9o56pm3Q_0fb6Hw";






 $scope.se = function() {
                
                if($scope.place != null) {  
                
                   $ionicLoading.show({
                     
      noBackdrop: true,
      template: '<p class="item-icon-left">Loading stuff...<ion-spinner icon="lines"/></p>'
    });
                
                
                $scope.place = $scope.place;
        console.log("Before"+JSON.stringify($scope.place.formatted_address));   
        $scope.icon = $scope.place.icon;
        
            $timeout(function(){
                
                   $scope.dynamicName = $scope.place.name; 
                   console.log(JSON.stringify($scope.place.icon));
                   $scope.icon = $scope.place.icon;
                   $scope.iconUrl = JSON.stringify($scope.place.icon);
                   console.log($scope.icon);
                   $scope.img = $scope.place.photos;
                   
                   if($scope.place.user_ratings_total >= 0){
                        $scope.totalRatings = $scope.place.user_ratings_total;
                        }
                    else {
                        $scope.totalRatings = 0;
                    }    
                        
                   console.log("ngMAP = "+$scope.place.geometry.location.lat());
                   console.log("ICON = "+$scope.icon);
                   
                   console.log("IMG URL "+JSON.stringify($scope.place));
                   $ionicLoading.hide();
                   
                   $ionicScrollDelegate.scrollTop();            
            },1500);
               
        
                }   
                
             else {
                 searchNull();
             }
}


 var searchNull = function() {
  $ionicPopup.alert({
     title: 'Leeres Suchfeld'
   });
 };

$scope.closeSearch = function() {
     $scope.place = null;
 }

// Search END ------------------------










  $scope.rate = 4;


    // GeoLocation

 $scope.businessName = "Marc's Restaurant";
$scope.businessName2 = "Harun's Bar";
   
   
    //------------- Google Search Box ------------------
    $scope.filter = [
        // ['establishment'] etc für input in home.html
    ]
    
    //------------Get profile Url---------------- 
    /*
        $scope.getProfilePic = function(authData) {
              $scope.userID = authData.uid;
              
              var fbStr = "https://vote-x.firebaseio.com/users/"+$scope.userID;
              var testRef = new Firebase (fbStr);
              console.log(testRef);
            if($rootScope.currentUserSignedIn) {
                console.log("scope.userID = "+$scope.userID);
              
                userRef.child($scope.userID);
                userDetailRef.update({
                   
                   ProfileImage: authData.password.profileImageURL
                    
                });
                
                console.log("ProfileImg updated"); 
            }
           
            
        };
   */
  

  
    //ion-refresher----------------------------------------------------------
    

    $scope.doRefresh = function () {


        $timeout(function () {

            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');

        }, 1000);
    };
//------------------------------Business Modal---------------------------------

 $scope.openBusiness = function() {
     if($scope.currentUserSignedIn == true) {
        $ionicPopup.alert({
            title: 'Oh nein!',
            template: 'Du musst dich einloggen, um das sehen zu können!'
        });
         return;
        }
        else {
  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
  };
   $state.go('app.business')
  
    }
  };
  
  //Business Name 2
 $scope.openBusiness2 = function() {
     if($scope.currentUserSignedIn == false) {
        $ionicPopup.alert({
            title: 'Oh nein!',
            template: 'Du musst dich einloggen, um das sehen zu können!'
        });
         return;
        }
        else {
   $state.go('app.business2') }
  };


//-----------------------------------------END APPCTRL-----------------------------------------

})

.filter('iif', function(){
    
    return function(input, trueValue, falseValue){
        return input ? trueValue : falseValue;
    };
    
})





;