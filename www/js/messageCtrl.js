/* global Firebase */
var votex = angular

      
      .module('starter.messageCtrl',['firebase','monospaced.elastic','ionic','ionicLazyLoad'])
      votex.controller("messageCtrl", function (messageFactory,$ionicScrollDelegate,$scope,$rootScope,$ionicLoading, $timeout, $state, $firebaseArray) {
	

    if($rootScope.currentUserSignedIn){
   $rootScope.input = {message:""};     
        
        
        
   //get messagepartner information
    

      $scope.partner = {
                        id: messageFactory.getPartnerData().id,
                        name: messageFactory.getPartnerData().name,
                        text: messageFactory.getPartnerData().text,
                        ownProfileImage: messageFactory.getPartnerData().ownProfileImage,
                        profileImage: messageFactory.getPartnerData().profileImage
                        };




       
   var messageRef = new Firebase("https://vote-x.firebaseio.com/users/"+$rootScope.userInfo.uid+"/messageBox/"+$scope.partner.id);
 
    //Get messages
    $scope.messages = $firebaseArray(messageRef);

         $timeout(function() {
        $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(false);
    });

  
  // Post message

$scope.postMessage = function(message){
   

    var ownMailboxRef = new Firebase("https://vote-x.firebaseio.com/users/"+$rootScope.userInfo.uid+"/messageBox/"+$scope.partner.id);
    var partnerMailboxRef = new Firebase("https://vote-x.firebaseio.com/users/"+$scope.partner.id+"/messageBox/"+$rootScope.userInfo.uid);
    
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
  
    ownMailboxRef.push({
        ownMessage: true,
        read: true,
        text: message,
        time: hours+":"+minutes+" "+day+"/"+zero+(month+1)+"/"+year,
        utime: Firebase.ServerValue.TIMESTAMP
        
    })
       partnerMailboxRef.push({
         ownMessage: false,
        read: false,
        text: message,
        time: hours+":"+minutes+" "+day+"/"+(month+1)+"/"+year ,
        utime: Firebase.ServerValue.TIMESTAMP      
    }) 
    
        $timeout(function() {
        $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
    }, 300);
    $rootScope.input.message = null;

}

        };
        
        

           
window.addEventListener('native.keyboardshow', keyboardShowHandler);

function keyboardShowHandler(e){
     if(ionic.Platform.isIOS()){
    console.info("keyboard height = "+e.keyboardHeight);
  
    $scope.keyboardFix = {
                          position: 'relative',
                          footerHeight: e.keyboardHeight-44,
                          contentHeight: e.keyboardHeight,
                          keyboardOpen: true
                         } 
    $scope.keyboardOpened = true;
   
       $scope.keyboardFix.footerHeight =   $scope.keyboardFix.footerHeight+20;
         
     
    
    
    console.info("footer height = "+$scope.keyboardFix.footerHeight);
    $timeout(function(){
        $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(false);
        $ionicScrollDelegate.$getByHandle('chatScroll').resize();
    });
 
    
        }
        
      else {
              $scope.keyboardFix = {
                          position: 'relative',
                          footerHeight: 20,
                          contentHeight: 0,
                          keyboardOpen: true
                         } 
    $scope.keyboardOpened = true;
          $timeout(function(){
        $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
        $ionicScrollDelegate.$getByHandle('chatScroll').resize();
    });
 
      }  
         
    };


window.addEventListener('native.keyboardhide', keyboardHideHandler);

function keyboardHideHandler(e){
   $scope.keyboardOpened = false;
   $scope.keyboardFix.keyboardOpen = false;
       $timeout(function(){
        $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(false);
        $ionicScrollDelegate.$getByHandle('chatScroll').resize();
    });
   
    }
       
        
        
        if(ionic.Platform.isIOS()){
         $scope.isApple = {yes: true};     
        };
       
        
        
     $scope.goBack = function(){
         
        
         $rootScope.messageCounter = 0;
       $state.go('app.messageBox');  
     };   
     
     
     
       
        
     });

     
     
     
     
