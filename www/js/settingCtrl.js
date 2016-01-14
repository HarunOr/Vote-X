angular.module('starter.settingCtrl', ['firebase'])

.controller('settingCtrl', function ($scope, $rootScope, $firebaseArray) {

         
if($rootScope.currentUserSignedIn){
        
   
        $scope.getImage = function(){
            
            
                          var key ="/users/"+$rootScope.user.uid+'/profileImg.txt';
                          console.info(key)
                var imgParams = {
                    Bucket: '01vtxfra',
                    Key: key
                }
                $rootScope.bucket.getObject(imgParams, function(err,data){
                if(err){
                    console.info(err, err.stack);
                }
                else {

                    $scope.$apply(function(){
                    $rootScope.user.profileImage = data.Body.toString('ascii');     
                    })
   
       
                }  
        });
    
    
    
          
            }
  }
  });
