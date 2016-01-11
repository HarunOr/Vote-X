angular.module('starter.settingCtrl', ['firebase'])

.controller('settingCtrl', function ($scope, $rootScope, $firebaseArray) {

         
if($rootScope.currentUserSignedIn){
        
   
    var userBookmarkRef = new Firebase("https://vote-x.firebaseio.com/users/"+$rootScope.userInfo.uid+"/bookmarks");
    
    $scope.bookmarks = $firebaseArray(userBookmarkRef);
    
    
    
          
}
  });
