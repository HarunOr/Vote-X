var votex = angular
// Momentan keine Funktion
.module('starter.messageCtrl')
votex.factory('messageFactory', function(){
    
    var partnerData = null;

    return {
        setPartnerData : function(data){
         partnerData = {
                                id: data.pID,
                                text: data.text,
                                name: data.name,
                                ownProfileImage: data.ownProfileImage,
                                profileImage: data.profileImage
                               }
      
       },
       
       getPartnerData : function(){
           return partnerData;
       },
       
       createNewPartner : function(newPartnerData){
           newPartner = {
                            
                    
               
                        }
       }
       
    }
    
    
	
});

