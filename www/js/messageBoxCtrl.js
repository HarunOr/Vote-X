 var votex = angular
 
 .module('starter.messageCtrl')
votex.controller("messageBoxCtrl", function ($scope,$rootScope, $firebaseObject,$ionicLoading, $timeout, $state,messageFactory, $ionicPopup, $firebaseArray,$window) {
	
    $scope.doRefresh = function(){
       $state.reload();

         $scope.$broadcast('scroll.refreshComplete');
    };
    
       // LOAD MESSAGES
    
    
   
        
     var userRef = new Firebase("https://vote-x.firebaseio.com/users/");
     var mailboxRef = new Firebase("https://vote-x.firebaseio.com/users/"+$rootScope.userInfo.uid+"/messageBox/");
    if($rootScope.currentUserSignedIn){
        
        
        
     $scope.getMessages = function(){
    
        $ionicLoading.show({
            template: '<ion-spinner icon="crescent" class="spinner-assertive"></ion-spinner>'
        });
        
        
    $scope.show ={delete: false};    
    $scope.loaded = {is: false};  
  
    $scope.tempArray = [];
   
    

    var messageRef = mailboxRef.orderByChild("last_message_time");
  
     //loading messages
     var message = $firebaseArray(messageRef);    
     
     message.$loaded().then(function(){
         if(message.length > 0){
      
         $scope.tempArray = [message.length];             

         $rootScope.messageArray = [message.length];
        for(var i = 0; i < message.length; i++){
            $scope.getUserInfo(message[i].$id, i);
       
            }

            
            
         }


        
        
        
     });
    
    
    
    $scope.getUserInfo = function(id, index){
      userRef.child(id).once("value", function(user){
          var userData = user.val();
   
        
              $scope.tempArray[index] = {
              pID: id,
              name: userData.username,
              ownProfileImg: userData.ownProfileImg,
              profileImg: "",
              read: ""
          };
          
         mailboxRef.child(id).child("read").once("value", function(readData){
          var read = readData.val();
          $scope.tempArray[index].read = read;
         });       
         
    

          if( $scope.tempArray[index] != undefined && $scope.tempArray[index].ownProfileImg){
      
           $scope.getImage(id);
             $timeout(function(){
           $rootScope.requestImg.on("success", function(resp){
           $scope.tempArray[index].profileImg = resp.data.Body.toString();
    
            $rootScope.messageArray[index]= $scope.tempArray[index];
            $ionicLoading.hide();
                 });
             });
            }
          
          else if($scope.tempArray[index] != undefined && !$scope.tempArray[index].ownProfileImg){
                $timeout(function(){
              
               $scope.tempArray[index].profileImg= userData.profileImage;
               $rootScope.messageArray[index]= $scope.tempArray[index];
                 $ionicLoading.hide();
                });
          }
          
          else {
              $timeout(function(){
                  $scope.getUserInfo(id, index); 
              },2000);
             
          }
      });
        
    };
    
  
    
    
    }
   // -------------- On Start --------------------
   $scope.doRefresh = function(){
   mailboxRef.on("child_added", function(snappy){
      $scope.getMessages(); 
   });
          
   }

      mailboxRef.on("child_added", function(snappy){
      $scope.getMessages(); 
   });
   

    // -------------ON END -----------------------
    
    
    
    
    
    
    
    
    $scope.openMessages = function(index){ 
      var readRef = new Firebase("https://vote-x.firebaseio.com/users/"+$rootScope.userInfo.uid+"/messageBox/"+$rootScope.messageArray[index].pID);
      readRef.update({read: true}); 
      userRef.child($rootScope.userInfo.uid).update({newMail: false});
      $rootScope.newMail = false;
      messageFactory.setPartnerData($rootScope.messageArray[index]);
      $state.go('app.messages');  
   
    };




    $scope.createMail = function(){
        
        $scope.findUser = {name: undefined};
        
        
        
          $ionicPopup.show({
         template: '<input type="text" ng-model="findUser.name" placeholder=" Geben Sie einen Namen ein">',
         title: 'Wem wollen Sie schreiben ?',
         subTitle:"Achten Sie auf Groß- und Kleinschreibung",
         scope: $scope,
         buttons: [
         { text: 'Abbrechen' },
         {
         text: '<b>Suchen</b>',
         type: 'button-positive',
         onTap: function(e) {
          if ($scope.findUser.name == undefined) {

            e.preventDefault();
          } else {
              var findUserRef = new Firebase("https://vote-x.firebaseio.com/users/usernameList");
              findUserRef.once("value", function(findSnap){
                  var findUserChild = findSnap.child($scope.findUser.name).exists();
                  if(findUserChild){
                     $scope.findUserKey = findSnap.child($scope.findUser.name).val();
                     var newPartnerRef = new Firebase("https://vote-x.firebaseio.com/users/"+$scope.findUserKey);
                     newPartnerRef.once("value", function(partnerDataSnap){
                        var partnerDatas = partnerDataSnap.val(); 
                         
                         if(partnerDatas.ownProfileImg){
               var key ="users/"+$scope.findUserKey+'/profileImg.txt';
                var imgParams = {
                    Bucket: $rootScope.creds.bucket,
                    Key: key
                }
          $rootScope.bucket.getObject(imgParams, function(err,data){
                if(err){
                    console.info(err, err.stack);
                }
                else {
            
                    $scope.$apply(function(){

                       $scope.newPartnerArray = { 
                                pID: $scope.findUserKey,
                                text: null,
                                name: partnerDatas.username,
                                profileImage:data.Body.toString('ascii')                                     
                                                }    
                                       
                      messageFactory.setPartnerData($scope.newPartnerArray);
                      $state.go('app.messages');      
                 
                    })
                 }  

                 });     
                         }
                         
                         else{
                    $scope.$apply(function(){         
                             
                      $scope.newPartnerArray = { 
                                pID: $scope.findUserKey,
                                text: null,
                                name: partnerDatas.username,
                                 profileImage: partnerDatas.profileImage                                        
                                                }    
                                                
                      messageFactory.setPartnerData($scope.newPartnerArray);
                      $state.go('app.messages');
                      })            
                     }
                         
                         
             
                                              
                     });


                      
                      
                      
                  }
                  else{
                                                  
                            $ionicPopup.alert({
                                 title: 'Niemanden gefunden',
                                 template: '<p style="margin:0 auto">Wir konnten niemanden mit diesem Namen finden!</p>'
                                        });

                  }
                  
                  
                  
                  
                  
              });  
          }
        }
      }
    ]
  });
        
        
        
        
    }
        // Get Image from Amazon
        
        $scope.getImage = function(index){
       
                 var key ="users/"+index+'/profileImg.txt';
                var imgParams = {
                    Bucket: $rootScope.creds.bucket,
                    Key: key
                }
                
            $rootScope.requestImg = $rootScope.bucket.getObject(imgParams);
            $rootScope.requestImg.send();
            };
        
        
        
        $scope.deleteMessage = function(index){

             // A confirm dialog

   var deletePopup = $ionicPopup.confirm({
     title: '<div style="background-color: red"> Wollen Sie diese Person wirklich löschen ?</div>',
     template: 'Dann können Sie keine Nachrichten mehr von dieser Person erhalten',
     cancelText: 'Abbrechen',
     okText: 'Blockieren !'
   });

   deletePopup.then(function(res) {
     if(res) {
       console.log('You are sure');
     } else {
       console.log('You are not sure');
     }
   });
 };
        
        
        
        
        
        //--------------------------
     
        };
        
        
  
     });
