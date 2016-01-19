   angular.module('starter.menuCtrl', ['firebase'])
      .controller("menuCtrl", function ($scope, $ionicModal,$firebaseArray ,$state, $timeout ,$ionicPopup,$rootScope, $ionicScrollDelegate) {
            
	   
	        $scope.votexTitle = 'img/votex_title.png';
     $scope.profileImg = 'img/standard_profileImg.jpg';

	   
               // Firebase reference
    var myRef = new Firebase("https://vote-x.firebaseio.com");

    
   // Open the login modal----------------------------------------------------------
   
    $ionicModal.fromTemplateUrl('templates/login.html', {
        animation: 'slide-in-up',
        scope: $scope
    }).then(function (modal) {
        $scope.modal1 = modal;
    });

   $scope.openModal = function() {
      $scope.modal1.show();
    };

    $scope.closeModal = function() {
    $scope.modal1.hide();    
    };

//-------------------------Log Out------------------------------------------

$scope.logout = function() {
      myRef.unauth();
      $rootScope.currentUserSignedIn =false;
      
     console.log("user signed out");
     
    
     $ionicPopup.alert({
            title: 'Ciao!',
            template: 'Du hast dich erfolgreich ausgeloggt'
        });
        $scope.loggedOut();
    $ionicScrollDelegate.resize();  
};
//----------------------Logged out -----------------------------------------

$scope.loggedOut = function(){
  if($rootScope.currentUserSignedIn == false) {
      setTimeout(function() {
        $state.go('app.home', {});
      },500);
  }
    
};


      });