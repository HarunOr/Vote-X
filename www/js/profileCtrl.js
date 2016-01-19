angular.module('starter.profileCtrl', ['firebase','ionic','jrCrop'])

.controller('profileCtrl', function ($scope, $state,$firebaseAuth, $rootScope, $ionicPopup,$timeout, $ionicLoading, $ionicScrollDelegate, $jrCrop, $ionicSlideBoxDelegate) {
 
if($rootScope.currentUserSignedIn){
    
    
    
    
            $rootScope.userNr = {nr:"49",lang: false, de: false, unique: true, zero: false};
            $rootScope.sms = {code: null, tryCode: null};

             
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
             url:"data:image/jpeg;base64,"+imageData,
             width: 200,
             height: 200,
             cancelText: 'Abbrechen',
             chooseText: 'Fertig'
             }).then(function(canvas) {
            // success!
            var image = canvas.toDataURL("image/jpeg");
                   // amazon upload
                 
                 var params = { Bucket: $rootScope.creds.bucket, Key: "users/"+$rootScope.user.uid+"/profileImg.txt", ContentType: "text/plain",  Body: image	};
                 $rootScope.profileImgUrl = params.Key;

                $rootScope.bucket.upload(params, function(err, data){
                    if(err){
                                console.log(err);
                                console.log('Error uploading data: ', data); 
                    }
                    else {
                                     $rootScope.user.profileImage = image;
             var voteHistoryRef = new Firebase("https://vote-x.firebaseio.com/users/"+$rootScope.userInfo.uid);
             voteHistoryRef.update({'profileImage': $rootScope.profileImgUrl, ownProfileImg: true});
             
             $ionicPopup.alert({
             title: 'Bild ausgewählt',
             template: 'Sie haben erfolgreich ein neues Profilbild ausgewählt'
            });
                        console.log('succesfully uploaded the image!');
                       
                    }
                } )
             // Amazon upload end 
             
            }, function(err) {
                console.info("jrCrop ERROR = "+err);
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
    correctOrientation: true,
    quality : 75,
    saveToPhotoAlbum: false
    }); 
  }     
//-------------------------------------------------


         
          //---------------SMS VERIF--------------------- 
       $scope.sendSMSText = function() {
           
           $scope.sent = false;
          
           
               $scope.smsPopup = $ionicPopup.show({
                 templateUrl:'templates/smsVerify.html',
                 scope: $scope,
                 cssClass: 'businessMap'
                    })
                  
                $timeout(function(){
                  $ionicSlideBoxDelegate.$getByHandle('verifySMS').enableSlide(false);      
                });  
              
          
           
                $scope.senden = function(){
                    $ionicLoading.show({
                        template: '<ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner>'
                    });
                                         
                    var str = $rootScope.userNr.nr.substring(0,2);
                    var checkZero = $rootScope.userNr.nr.substring(0,1);
            
                    if(str == "49"){
                    $rootScope.userNr.de = true;
                    }

                    if($scope.userNr.nr.length >11 && $scope.userNr.nr.length < 14){
                    $rootScope.userNr.lang = true;
                    }             
                    
                    if(checkZero == 0){
                    $rootScope.userNr.zero = true;
                    }      
                    
                    
                    
                   var checkUniqueRef = new Firebase("https://vote-x.firebaseio.com/users/voters_list");
                   checkUniqueRef.once("value", function(checkData){
                   
                    checkData.forEach(function(childCheck){
                           if(childCheck.val() == $rootScope.userNr.nr){
                               $rootScope.userNr.unique = false;
                           }
                    });
                      
                       
                   }); 
                    
                    $timeout(function(){
                        
                   if(!$rootScope.userNr.unique){
                            
                            $ionicPopup.alert({
                                 title: 'Nummer vergeben',
                                 template: '<p style="margin:0 auto">Diese Nummer wird schon von einem anderen Nutzer genutzt!</p>'
                                        });
                            
                        }
                       
                    else{
                        
                    if($scope.userNr.de && $scope.userNr.lang && !$scope.userNr.zero &&$rootScope.user.verified== false){
                        

                            
                        
                        
                         var uCode = Math.floor(1000 + Math.random() * 9000);
                         var newSmsRef = new Firebase("https://vote-x.firebaseio.com/users/sms");
                         var personalizedText = "Hallo "+$rootScope.user.username+"! \n Dein Code lautet :"+uCode+"\n"+
                                "Wir wünschen Dir\nnoch viel Spaß!\n\nDein Vote-X Team :)";
                         
                        newSmsRef.update({
                            Code: uCode,
                            Text: personalizedText,
                            phone_number: $rootScope.userNr.nr
                        })
                        
                        if($rootScope.user.uid != undefined || $rootScope.user.uid != null){
                        var userPushSMS = new Firebase("https://vote-x.firebaseio.com/users/"+$rootScope.user.uid);
                        userPushSMS.update({
                         sms_code:    uCode
                        });                            
                        }
                        
                        else {
                               $ionicPopup.alert({
                                 title: 'Fehler',
                                 template: '<p style="margin:0 auto">Es fehlen notwendige Daten!</p>'+
                                        '<p style="margin:0 auto">Wiederholen Sie den Vorgang später nochmal, oder starten Sie die App neu.</p>'
                                        });
                                        
                                   $scope.closeSmsPop();                          
                        }

                        
                         $ionicSlideBoxDelegate.$getByHandle('verifySMS').next();
                        
                        $scope.codeVerification = function(){
                          
                          userPushSMS.once("value", function(codeSnap){
                             
                             $rootScope.sms.tryCode = codeSnap.val().sms_code;
                             
                             
                             
                              
                          });
                                               $ionicLoading.show({
                     
                            noBackdrop: true,
                            template: '<ion-spinner icon="lines" class="lines-assertive"/>'
                                         });
                          $timeout(function(){ 
                                                  
                        if( $rootScope.sms.code == $rootScope.sms.tryCode){
                           $rootScope.user.verified = true;
                            userPushSMS.update({
                              verified: true
                                
                            });
                            
                            var voterRef = new Firebase("https://vote-x.firebaseio.com/users/voters_list");
                            voterRef.child($rootScope.user.uid).set($rootScope.userNr.nr);
                            var voteHistoryRef = new Firebase("https://vote-x.firebaseio.com/users/"+$rootScope.userInfo.uid);
                            voteHistoryRef.update({phone: $rootScope.userNr.nr});
                            
                            $ionicPopup.alert({
                                 title: 'Verifizierung abgeschlossen',
                                 template: '<p style="margin:0 auto">Sie haben sich erfolgreich verifiziert!</p>'+
                                        '<p style="margin:0 auto">Viel Spaß beim Voten</p>'
                                        });
                                        
                                   $scope.closeSmsPop(); 
                             }
                               
                            else {
                                                        $ionicPopup.alert({
                        title: 'Fehler!',
                        template: '<p style="margin:0 auto">Ihr Code ist falsch!</p>'
                            });
                            }
                           },2000);
                           
                           
                           $ionicLoading.hide();
                        };
                        
                        
                        
                    }                   
                     else {
                        $ionicPopup.alert({
                        title: 'Fehler!',
                        template: '<p>Ihre Nummer muss alle Bedingungen erfüllen</p>'
                            });
                    }}
                     $ionicLoading.hide();
                     },1000)
                    };
                
                }
                
                
                $scope.closeSmsPop = function(){
                     $scope.smsPopup.close();
                };
                
          
        $scope.alreadyVerified = function(){
            $ionicPopup.alert({
     title: 'Erfolgreich Verifiziert!',
     template: 'Du bist schon verifiziert und kannst Beiträge verfassen. Viel Spaß !'
   });
        }  

        }    
        
   else {
       $state.go('app.home');
   }     
        
        
     
	 
  });
