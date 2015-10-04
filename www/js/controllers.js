 angular
 
  .module('starter.controllers', [ 'ui.bootstrap','ionicLazyLoad'])

  .controller('AppCtrl', function ($scope, $rootScope, $ionicLoading, $http,
                                   $state, $ionicModal, $timeout, $ionicPopup, $cordovaOauth,
                                     
                                   $ImageCacheFactory)    {

    //Preload ALL Images
    $ImageCacheFactory.Cache([
        
        'img/votex_title.png',
        'img/voteOn.png',
        'img/voteOff.png',
        'img/voteTitleOn.png',
        'img/voteTitleOff.png',
        'img/voteRateOn.png',
        'img/voteRateOff.png',
        'img/profile_harun-oral.jpg',
        ]); 

     //Vote-X Logo Titel Img
     
     $scope.votexTitle = 'img/votex_title.png';
     $scope.harunProfileImg = 'img/profile_harun-oral.jpg';
     


    // GeoLocation

 
      
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

// Business Name

$scope.businessName = "Marc's Restaurant";
$scope.businessName2 = "Harun's Bar";




//

 $scope.openBusiness = function() {
     if($rootScope.currentUserSignedIn == true) {
        $ionicPopup.alert({
            title: 'Oh nein!',
            template: 'Du musst dich einloggen, um das sehen zu können!'
        });
         return;
        }
        else {
   $state.go('app.business') }
  };
  
  //Business Name 2
 $scope.openBusiness2 = function() {
     if($rootScope.currentUserSignedIn == false) {
        $ionicPopup.alert({
            title: 'Oh nein!',
            template: 'Du musst dich einloggen, um das sehen zu können!'
        });
         return;
        }
        else {
   $state.go('app.business2') }
  };






// ----------------------------------------- Progressbar -----------------------------------------
    $scope.devProgress = 70;
    
 // ----------------------------------------- Progressbar End-----------------------------------------   

});
//-----------------------------------------END APPCTRL-----------------------------------------

