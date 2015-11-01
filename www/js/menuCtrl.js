   angular.module('starter.menuCtrl', ['firebase'])
      .controller("menuCtrl", function ($scope, $ionicModal, $state, $ionicPopup,$rootScope, $ionicScrollDelegate) {
            
	   
	        $scope.votexTitle = 'img/votex_title.png';
     $scope.harunProfileImg = 'img/profile_harun-oral.jpg';
	   
	   
               // Firebase reference
    var myRef = new Firebase("https://vote-x.firebaseio.com");
     $rootScope.currentUserSignedIn = false;
    $rootScope.notSignedIn =true;
   // Open the login modal----------------------------------------------------------

          // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        animation: 'slide-in-up',
        scope: $scope
    }).then(function (modal) {
        $scope.modal1 = modal;
    });

   $scope.openModal = function() {
      $scope.modal1.show();
    };

    $scope.closeModal = function(index) {
      if (index == 1) $scope.modal1.hide();
      else $scope.modal2.hide();
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
      },400);
  }
    
};

      });