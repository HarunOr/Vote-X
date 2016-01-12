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
                                        profileImage: $scope.partnerInformation.profileImage
                                    };
                                    
                                    $rootScope.messageBoxIndex++;
            }
          });
          })     

           $ionicLoading.hide();   
       });
       


        
    });
    
    $scope.openMessages = function(index){  
      messageFactory.setPartnerData($scope.message[index]);
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
                         
                        $scope.newPartnerArray = { pID: $scope.findUserKey,
                                                   text: null,
                                                   name: partnerDatas.username,
                                                   profileImage: partnerDatas.profileImage                                        
                                                }    
                      messageFactory.setPartnerData($scope.newPartnerArray);
                      $state.go('app.messages');                          
                                              
                     });


                      
                      
                      
                  }
                  
                  
                  
                  
                  
              });  
          }
        }
      }
    ]
  });
        
        
        
        
    }


     
        };
        
        
  
     });
