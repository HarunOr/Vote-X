 angular.module('starter.messageBoxCtrl', ['firebase'])
.controller("messageBoxCtrl", function ($scope,$rootScope,$ionicLoading, $timeout, $state, $ionicPopup) {
	
    $scope.doneLoading = false;
    if($rootScope.currentUserSignedIn){
    $rootScope.messageBoxCounter = 0;

    $scope.messagePartner = [100];
    $scope.messagePartner[$rootScope.messageBoxCounter] = {username: "", profileImg: "", ownImage: false};
    
             $ionicLoading.show({
    template: '<ion-spinner icon="spiral" class="spinner-assertive"></ion-spinner>'
  });
    //lade übersicht über unterhaltungen 
    var userMailboxRef = new Firebase("https://vote-x.firebaseio.com/users/"+$rootScope.userInfo.uid+"/messageBox");

    userMailboxRef.orderByChild("utime").on("child_added", function(snapshot){
         
         $rootScope.messageKey = snapshot.key();
         
     // your messaging partner    
     var messagePartnerRef = new Firebase("https://vote-x.firebaseio.com/users/"+snapshot.key());
     
     messagePartnerRef.once("value", function(partnerSnap){
         var partnerData = partnerSnap.val();
         $scope.$apply(function(){
         $scope.messagePartner[$rootScope.messageBoxCounter] = {username: partnerData.username, profileImg: partnerData.profileImage, ownImage: partnerData.ownProfileImg, uid:snapshot.key()}     
         });
 
         $rootScope.messageBoxCounter++;
      
     });
     
     
     });
         

     $scope.openMessages = function(name,key, ownImage, profileImg){

         $rootScope.messageKey = {name:name ,key: key, ownImage: ownImage, profileImg: profileImg};
         $state.go('app.messages');
         
     }


        // An elaborate, custom popup
        
   $scope.createMail = function(){
       $scope.toUser = {name: ""};
    $ionicPopup.show({
     template: '<input type="text" ng-model="toUser.name">',
     title: 'Wem wollen Sie schreiben?',
     scope: $scope,
     buttons: [
       { text: 'Abbrechen' },
       {
         text: '<b>Suchen</b>',
         type: 'button-positive',
         onTap: function(e) {
           if ($scope.toUser.name =="") {
             //don't allow the user to close unless he enters something
             e.preventDefault();
           } else {
               
             var usernameRef = new Firebase("https://vote-x.firebaseio.com/users/usernameList/");  
               
             usernameRef.once("value", function(usernameListSnap){

             if(usernameListSnap.child($scope.toUser.name).exists()){

               var newMessagePartnerID = usernameListSnap.child($scope.toUser.name).val();
               var newMessagePartnerRef = new Firebase("https://vote-x.firebaseio.com/users/"+newMessagePartnerID);
               
               newMessagePartnerRef.once("value", function(finalSnap){
                  var newMessagePartnerData =finalSnap.val();
                  $rootScope.partnerUid = newMessagePartnerID;
                  $scope.openMessages($scope.toUser.name, newMessagePartnerID, newMessagePartnerData.ownProfileImg, newMessagePartnerData.profileImage);
                   
               });
                 
             }
             else {
                 $ionicPopup.alert({
                 title: 'Fehler!',
                 template: '<p>Es konnte kein Benutzer mit diesem Namen gefunden werden</p>'+
                            '<p>Versuchen Sie es erneut!</p>'
                     });
             }
             

                 
             }); 
               
               
             return $scope.toUser.name;
           }
         }
       },
     ]
   });
    } 

        $timeout(function(){
     $ionicLoading.hide();      
    },500);
   


     
        };
     });
