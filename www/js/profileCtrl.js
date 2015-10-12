angular.module('starter.profileCtrl', ['firebase'])

.controller('profileCtrl', function ($scope, $firebaseAuth) {
	 
         
         
         $scope.VotesCount= 9001;
         $scope.username = 'Harun Oral';
         $scope.lastDate = '06.10.2015';
         $scope.level = 'Admin & Experte';
         
         
         
          //---------------SMS VERIF--------------------- 
       var sendSMSText = function(recipient) {
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
          
	 
  });
