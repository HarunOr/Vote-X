   angular.module('starter.menuCtrl', ['firebase'])
      .controller("menuCtrl", function ($scope, $ionicModal, $state, $ionicPopup,$rootScope) {
            
               // Firebase reference
    var myRef = new Firebase("https://vote-x.firebaseio.com");
     $rootScope.currentUserSignedIn = false;
    $rootScope.notSignedIn =true;
   // Open the login modal----------------------------------------------------------

          // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        id: '1',
        animation: 'slide-in-up',
        scope: $scope
    }).then(function (modal) {
        $scope.modal1 = modal;
    });

   $scope.openModal = function(index) {
      if (index == 1) $scope.modal1.show();
      else $scope.modal2.show();
    };

    $scope.closeModal = function(index) {
      if (index == 1) $scope.modal1.hide();
      else $scope.modal2.hide();
    };

//-------------------------Log Out------------------------------------------

$scope.logout = function() {
      myRef.unauth();
      $scope.currentUserSignedIn =false;
      
     console.log("user signed out");
     $scope.loggedOut();
     $state.go("app.home");
     $ionicPopup.alert({
            title: 'Ciao!',
            template: 'Du hast dich erfolgreich ausgeloggt'
        });
    
};
//----------------------Logged out -----------------------------------------

$scope.loggedOut = function(){
  if($rootScope.currentUserSignedIn == false) {
       $state.go("app.home");
  }
    
};
    
      });