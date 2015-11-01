 angular
 
  .module('starter.controllers', [ 'ui.bootstrap','ionicLazyLoad'])

  .controller('AppCtrl', function ($scope, $http,$ionicPlatform,
                                   $state, $ionicModal, $timeout, $ionicPopup, $cordovaOauth, $ionicLoading
                                    )    {

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

});