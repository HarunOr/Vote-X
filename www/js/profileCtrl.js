angular.module('starter.profileCtrl', ['firebase','ionic','jrCrop'])

.controller('profileCtrl', function ($scope, $firebaseAuth, $rootScope, $ionicPopup,$timeout, $ionicLoading, $ionicScrollDelegate, $jrCrop) {

             
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
            
        $jrCrop.crop({
             url: "data:image/jpeg;base64," + imageData,
             width: 200,
             height: 200,
             cancelText: 'Abbrechen',
             chooseText: 'Fertig'
             }).then(function(canvas) {
            // success!
            var image = canvas.toDataURL();
            console.info("image = "+image);
             $rootScope.user.profileImage = image;
             var voteHistoryRef = new Firebase("https://vote-x.firebaseio.com/users/"+$rootScope.userInfo.uid);
             voteHistoryRef.update({'profileImage': image, ownProfileImg: true});
             
             $ionicPopup.alert({
             title: 'Bild ausgewählt',
             template: 'Sie haben erfolgreich ein neues Profilbild ausgewählt'
            });
            }, function() {
            // User canceled or couldn't load image.
            });    
            
            
       
        
        
        
    },function(err){
        if(err == "Selection cancelled"){
            alert("Bildauswahl abgebrochen!"); 
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
