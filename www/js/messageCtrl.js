      angular.module('starter.messageCtrl', ['firebase'])
.controller("messageCtrl", function ($scope,$rootScope,$ionicLoading, $timeout, $state) {
	
    
    if($rootScope.currentUserSignedIn){
     $rootScope.messageCounter = 0;
     $scope.messages= [100]; 
     $scope.messages[$rootScope.messageCounter] = {key: "", text: "", time:"", read: false, ownMessage: false};
     
       
        //lade einzelne chatverläufe
     var messageRef =  new Firebase("https://vote-x.firebaseio.com/users/"+$rootScope.userInfo.uid+"/messageBox/"+$rootScope.messageKey.key);
     messageRef.on("child_added", function(childSnapshot){
        
         var messageData= childSnapshot.val();
        
         console.info("nachricht = "+messageData.text);
         console.info("im array= "+$scope.messages);
         var messageID = childSnapshot.key();
         
        
          $scope.messages[$rootScope.messageCounter] = {key: messageID, text: messageData.text, time: messageData.time, read: messageData.read, ownMessage: messageData.ownMessage};   
          $rootScope.messageCounter++;   
         
         
     })


     
        };
        
     $scope.goBack = function(){
       $state.go('app.messageBox');  
     };   
        
        
     });

     
     
     
     
