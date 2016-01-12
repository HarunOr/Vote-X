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
    destinationType: Camera.DestinationType.DATA_URL,
    quality : 75,
    encodingType: Camera.EncodingType.JPEG,
    popoverOptions: CameraPopoverOptions,
    saveToPhotoAlbum: false
    }); 
  }     

         
         
         
          //---------------SMS VERIF--------------------- 
       $scope.sendSMSText = function() {
       var newSmsRef = new Firebase("https://vote-x.firebaseio.com/users");
        
        
        $scope.userNr = {nr: ""};
        
          $ionicPopup.show({
         template: '<input type="text" ng-required ng-model="userNr.nr" placeholder=" z.B. 4915212345678">',
         title: 'Geben Sie ihre Handynummer ein',
         subTitle:"Sie erhalten einen Code per SMS, mit dem Sie sich verifizieren können",
         scope: $scope,
         buttons: [
         { text: 'Abbrechen' },
         {
         text: '<b>Senden</b>',
         type: 'button-positive',
         onTap: function(e) {
               
                var uCode = Math.floor(1000 + Math.random() * 9000);
                var smsQueue = newSmsRef.child("/sms/"+$rootScope.userInfo.uid);
              var personalizedText = "Hallo "+$rootScope.user.username+"! /n/n. Dein Code lautet :"+uCode+"/n/n"
                                "Wir wünschen Dir noch viel Spaß! /n/n Dein Vote-X Team :)";
              
        
        smsQueue.update({ 
            Nr: $scope.userNr.nr, 
            Code:uCode,
            text: personalizedText 
            });
                
        }
      }
    ]
  });

                }
          
        $scope.alreadyVerified = function(){
            $ionicPopup.alert({
     title: 'Erfolgreich Verifiziert!',
     template: 'Du bist schon verifiziert und kannst Beiträge verfassen. Viel Spaß !'
   });
        }  
          
          
	 
  });
