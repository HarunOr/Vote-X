 var votex = angular
 
 .module('starter.messageCtrl')
votex.controller("messageBoxCtrl", function ($scope,$rootScope,$ionicLoading, $timeout, $state,messageFactory, $ionicPopup, $firebaseArray) {
	
             $ionicLoading.show({
    template: '<ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner>'
  });
  
    if($rootScope.currentUserSignedIn){
   
    var mailboxRef = new Firebase("https://vote-x.firebaseio.com/users/"+$rootScope.userInfo.uid+"/messageBox");
        var userRef = new Firebase("https://vote-x.firebaseio.com/users/"+$rootScope.userInfo.uid+"/messageBox");
            userRef.on("value", function(countSnap){
            $rootScope.messageBoxCounter = countSnap.numChildren();
         
        });
      

    
    mailboxRef.on("child_added", function(snapshot){
      $scope.message = new Array($rootScope.messageBoxCounter);
  
      $scope.text = snapshot.val().text;
      var partnerKey = snapshot.key();
      
       // getting message partner Info, like profile image and name to show
       
       var partnerInfoRef = new Firebase("https://vote-x.firebaseio.com/users/"+partnerKey);
       
       partnerInfoRef.once("value", function(partnerData){
           $scope.$apply(function(){
           $timeout(function(){
               
           
           $scope.partnerInformation = partnerData.val();    
           $scope.partnerID = partnerData.key();
            
           if($rootScope.messageBoxIndex < $rootScope.messageBoxCounter){
           $scope.message[$rootScope.messageBoxIndex] = {
                                        pID:  $scope.partnerID,
                                        text: $scope.text,
                                        name: $scope.partnerInformation.username,
                                        ownProfileImage: $scope.partnerInformation.ownProfileImg,
                                        profileImage: $scope.partnerInformation.profileImage
                                    };
                                    
                                    $rootScope.messageBoxIndex++;
            }
              
          });
          })     
       
           
       });
       


        
    });
    
    $scope.openMessages = function(index){
      messageFactory.setPartnerData($scope.message[index]);
      $state.go('app.messages');  
    };

     
        };
        
        
          $timeout(function(){
     $ionicLoading.hide();      
    },500);  
     });
