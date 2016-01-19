var votex = angular
// Momentan keine Funktion
.module('starter.messageCtrl')
votex.factory('messageFactory', function(){
    
    var partnerData = null;

    return {
        setPartnerData : function(data){
         partnerData = {
                                id: data.pID,
                                name: data.name,
                                profileImage: data.profileImg
                               }
      
       },
       
       getPartnerData : function(){
           return partnerData;
       }       
    }
    
    
	
});

