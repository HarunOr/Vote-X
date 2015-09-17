angular.module('starter.profileCtrl', ['firebase'])

.controller('profileCtrl', function ($scope, $firebaseAuth) {
	 
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
