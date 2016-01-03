/* global Firebase */
      angular.module('starter.messageCtrl', ['firebase','monospaced.elastic','ionic'])
.controller("messageCtrl", function ($ionicScrollDelegate,$scope,$rootScope,$ionicLoading, $timeout, $state) {
	
    
    if($rootScope.currentUserSignedIn){
     $rootScope.messageCounter = 0;
     $scope.messages= [100]; 
     $scope.messages[$rootScope.messageCounter] = {key: "", text: "", time:"", read: false, ownMessage: false};
     $scope.ownMessage = false ;
      $scope.doneLoading = false;
      $rootScope.input = {message: ""};
      
 //lade einzelne chatverläufe
     var messageRef =  new Firebase("https://vote-x.firebaseio.com/users/"+$rootScope.userInfo.uid+"/messageBox/"+$rootScope.messageKey.key);

     messageRef.on("child_added", function(childSnapshot){
        
         var messageData= childSnapshot.val();
         var messageID = childSnapshot.key();
           
          $scope.messages[$rootScope.messageCounter] = {key: messageID, text: messageData.text, time: messageData.time, read: messageData.read, ownMessage: messageData.ownMessage};   
          $rootScope.messageCounter++;   
         
         $timeout(function() {
        $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom();
    }, 300);

     })




  $scope.inputUp = function() {
    if (ionic.Platform.isIOS()) $scope.data.keyboardHeight = 216;
    $timeout(function() {
        $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
    }, 300);

  };

  $scope.inputDown = function() {
    if (ionic.Platform.isIOS()) $scope.data.keyboardHeight = 0;
     $ionicScrollDelegate.$getByHandle('chatScroll').resize();
  };

  $scope.closeKeyboard = function() {
                if(ionic.Platform.isWebView()){
            cordova.plugins.Keyboard.close();
            
        }
    
  };
// Post message

$scope.postMessage = function(message){
   
    if ($rootScope.messageKey.key == undefined){
        $rootScope.messageKey = {key: $rootScope.partnerUid};
    }

    var ownMailboxRef = new Firebase("https://vote-x.firebaseio.com/users/"+$rootScope.userInfo.uid+"/messageBox/"+$rootScope.messageKey.key);
var partnerMailboxRef = new Firebase("https://vote-x.firebaseio.com/users/"+$rootScope.messageKey.key+"/messageBox/"+$rootScope.userInfo.uid);
    
      var d = new Date();
    
    
    
    var minutes = d.getMinutes();
    var hours = d.getHours();
    var day = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();
    
    
    if(minutes < 10){
        minutes = "0"+minutes;
    }
    if(hours < 10){
        hours = "0"+hours;
    }
    if(day < 10){
        day = "0"+day;
    }
    if(month < 10){
        var zero = "0";
    }
    else{
        zero = "";
    }        
    ownMailboxRef.update({utime: Firebase.ServerValue.TIMESTAMP});
    ownMailboxRef.push({
        ownMessage: true,
        read: true,
        text: message,
        time: hours+":"+minutes+" "+day+"/"+zero+(month+1)+"/"+year
        
        
    })
       partnerMailboxRef.update({utime: Firebase.ServerValue.TIMESTAMP});
       partnerMailboxRef.push({
         ownMessage: false,
        read: false,
        text: message,
        time: hours+":"+minutes+" "+day+"/"+(month+1)+"/"+year       
    }) 
    
        $timeout(function() {
        $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
    }, 300);
    $rootScope.input.message = null;
    
}

        };
        
     $scope.goBack = function(){
         $rootScope.messageCounter = 0;
       $state.go('app.messageBox');  
     };   
        
        
     });

     
     
     
     
