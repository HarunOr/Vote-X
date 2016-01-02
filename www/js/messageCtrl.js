      angular.module('starter.messageCtrl', ['firebase','monospaced.elastic','ionic'])
.controller("messageCtrl", function ($ionicScrollDelegate,$scope,$rootScope,$ionicLoading, $timeout, $state) {
	
    
    if($rootScope.currentUserSignedIn){
     $rootScope.messageCounter = 0;
     $scope.messages= [100]; 
     $scope.messages[$rootScope.messageCounter] = {key: "", text: "", time:"", read: false, ownMessage: false};
     $scope.ownMessage = false ;
      $scope.doneLoading = false;
      $scope.input = {message: ""};
      
 //lade einzelne chatverläufe
     var messageRef =  new Firebase("https://vote-x.firebaseio.com/users/"+$rootScope.userInfo.uid+"/messageBox/"+$rootScope.messageKey.key);

     messageRef.on("child_added", function(childSnapshot){
        
              
       
       
            
        
         var messageData= childSnapshot.val();
        
         console.info("nachricht = "+messageData.text);
         console.info("im array= "+$scope.messages);
         var messageID = childSnapshot.key();
         
        
            
       
          $scope.messages[$rootScope.messageCounter] = {key: messageID, text: messageData.text, time: messageData.time, read: messageData.read, ownMessage: messageData.ownMessage};   
          $rootScope.messageCounter++;   
         
        $scope.doneLoading = true;

     })




  $scope.inputUp = function() {
    if (ionic.Platform.isIOS()) $scope.data.keyboardHeight = 216;
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom(true);
    }, 300);

  };

  $scope.inputDown = function() {
    if (ionic.Platform.isIOS()) $scope.data.keyboardHeight = 0;
    $ionicScrollDelegate.resize();
  };

  $scope.closeKeyboard = function() {
                if(ionic.Platform.isWebView()){
            cordova.plugins.Keyboard.close();
            
        }
    
  };
// Post message

$scope.postMessage = function(message){

    var ownMailboxRef = new Firebase("https://vote-x.firebaseio.com/users/"+$rootScope.userInfo.uid+"/messageBox/"+$rootScope.messageKey.key);
    var partnerMailboxRef = new Firebase("https://vote-x.firebaseio.com/users/"+$rootScope.messageKey.key+"/messageBox/"+$rootScope.userInfo.uid);
    
      var d = new Date();
    
    var minutes = d.getMinutes();
    var hours = d.getHours();
    var day = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();
    
    
    ownMailboxRef.push({
        ownMessage: true,
        read: true,
        text: message,
        time: hours+":"+minutes+" "+day+"/"+(month+1)+"/"+year
        
        
    })
    
       partnerMailboxRef.push({
         ownMessage: false,
        read: false,
        text: message,
        time: hours+":"+minutes+" "+day+"/"+(month+1)+"/"+year       
    }) 
    
    
}
     
     
     
        };
        
     $scope.goBack = function(){
       $state.go('app.messageBox');  
     };   
        
        
     });

     
     
     
     
