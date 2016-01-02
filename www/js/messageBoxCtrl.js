 angular.module('starter.messageBoxCtrl', ['firebase'])
.controller("messageBoxCtrl", function ($scope,$rootScope,$ionicLoading, $timeout, $state) {
	
    $scope.doneLoading = false;
    if($rootScope.currentUserSignedIn){
    $rootScope.messageBoxCounter = 0;

    $scope.messagePartner = [100];
    $scope.messagePartner[$rootScope.messageBoxCounter] = {username: "", profileImg: "", ownImage: false};
     
     
    //lade übersicht über unterhaltungen 
    var userMailboxRef = new Firebase("https://vote-x.firebaseio.com/users/"+$rootScope.userInfo.uid+"/messageBox");

    userMailboxRef.on("child_added", function(snapshot){
         
         
        
             
         
         $rootScope.messageKey = snapshot.key();
         
     // your messaging partner    
     var messagePartnerRef = new Firebase("https://vote-x.firebaseio.com/users/"+snapshot.key());
     
     messagePartnerRef.once("value", function(partnerSnap){
         var partnerData = partnerSnap.val();
         $scope.$apply(function(){
         $scope.messagePartner[$rootScope.messageBoxCounter] = {username: partnerData.username, profileImg: partnerData.profileImage, ownImage: partnerData.ownProfileImg, uid:snapshot.key()}     
         });
 
         $rootScope.messageBoxCounter++;
         $scope.doneLoading = true;
     });
     
     
     });
         




     $scope.openMessages = function(name,key, ownImage, profileImg){

         $rootScope.messageKey = {name:name ,key: key, ownImage: ownImage, profileImg: profileImg};
         $state.go('app.messages');
         
     }




     
        };
     });
