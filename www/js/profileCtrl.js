angular.module('starter.profileCtrl', ['firebase'])

.controller('profileCtrl', function ($scope, $firebaseAuth, $rootScope, $ionicPopup,$timeout, $ionicLoading, $ionicScrollDelegate) {
	    
        screen.lockOrientation('portrait');
        
        if(!$scope.ownProfile){
         $scope.profileImg = 'img/standard_profileImg.jpg';   
        }
        else {
            $scope.profileImg = $scope.ownProfileImage;
        }
             
                   $ionicLoading.show({
                     
      noBackdrop: true,
      template: '<ion-spinner icon="lines" class="lines-assertive"/>'
    });
         $timeout(function(){
                  var voteHistoryRef = new Firebase("https://vote-x.firebaseio.com/users/"+$rootScope.userInfo.uid);
         voteHistoryRef.child("vote_history").once("value", function(snapshot){
            var count = snapshot.numChildren();
            $scope.VotesCount = count; 
         });
         
         var userRef = new Firebase("https://vote-x.firebaseio.com/users/"+$rootScope.userInfo.uid);
         userRef.once("value", function(snapshot){
            $scope.$apply(function(){
            $scope.userData = snapshot.val();
            $scope.username = {name: $scope.userData.username};
            $scope.verified = {verified: $scope.userData.verified};
            $scope.ownProfile = $scope.userData.ownProfileImg;
            $scope.ownProfileImage = $scope.userData.profileImage;                
            });

         }); 

         $ionicLoading.hide(); 
         }, 250);
        

         

         
         
         
          //---------------SMS VERIF--------------------- 
       $scope.sendSMSText = function(recipient) {
       var newFb = new Firebase("https://vote-x.firebaseio.com/users/"+$scope.userID);
        var smsQueue = newFb.child("/sms/"+recipient.phone);
        
        var personalizedText = "Hallo "+ recipient.name+". Danke für's verifizieren !"+ "./n/n"
                                "Wir wünschen Dir noch viel Spaß, dein Vote-X Team :)";
        
        smsQueue.set({
                name: recipient.name,
                phone: recipient.phone,
                text: personalizedText
            
                }); 
                }
          
        $scope.alreadyVerified = function(){
            $ionicPopup.alert({
     title: 'Erfolgreich Verifiziert!',
     template: 'Du bist schon verifiziert und kannst Beiträge verfassen. Viel Spaß !'
   });
        }  
          
          
	 
  });
