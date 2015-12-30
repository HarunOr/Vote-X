angular.module('starter.profileCtrl', ['firebase','ionic'])

.controller('profileCtrl', function ($scope, $firebaseAuth, $rootScope, $ionicPopup,$timeout, $ionicLoading, $ionicScrollDelegate) {


        if(ionic.Platform.isWebView()){
           screen.lockOrientation('portrait'); 
            
        }
             
                   $ionicLoading.show({
                     
      noBackdrop: true,
      template: '<ion-spinner icon="lines" class="lines-assertive"/>'
    });
         $timeout(function(){
                  var voteHistoryRef = new Firebase("https://vote-x.firebaseio.com/users/"+$rootScope.userInfo.uid);
         voteHistoryRef.child("vote_history").once("value", function(snapshot){
           

            
         });


         $ionicLoading.hide(); 
         }, 250);
        

      //Bild aus Gallerie
  $scope.selectPic = function(){
        navigator.camera.getPicture(function(imageData){
        $rootScope.user.profileImage = imageData;
        var voteHistoryRef = new Firebase("https://vote-x.firebaseio.com/users/"+$rootScope.userInfo.uid);
        voteHistoryRef.update({'profileImage': imageData, ownProfileImg: true});
        
        
           $ionicPopup.alert({
     title: 'Bild ausgewählt',
     template: 'Sie haben erfolgreich ein neues Profilbild ausgewählt'
   });
        
    },function(err){
        if(err == "Selection cancelled"){
            
        }
        else {
      alert("Ups, etwas ist schief gelaufen!"+err);        
        }
      
    },{sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: Camera.DestinationType.DATA_URL}); 
  }     

         
         
         
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
