 angular.module('starter.loginCtrl', ['firebase','ngMessages'])
.controller("loginCtrl", function ($scope, $ionicModal, $rootScope, $ionicPopup, $state, $firebaseAuth, $ionicLoading, $firebaseArray) {


   // Firebase reference
    var myRef = new Firebase("https://vote-x.firebaseio.com");
    var userRef ;
    // Login Status-----------------------------------
    
    $rootScope.currentUserSignedIn = false;
  
    //UserData after Registration-----------------------------
   
    $scope.username;
    $scope.userEmail;
    $scope.registerID;
    $scope.userID; //authData.uid nach Login gespeichert
    $scope.profilePic;
    var fid; // Firebade user ID firebaseio.com/users/*fid*/email etc
   var usernameList = new Firebase("https://vote-x.firebaseio.com/users/usernameList");  
    //Get initial userdata-----------------------------

    var d = new Date();
    
    var minutes = d.getMinutes();
    var hours = d.getHours();
    var day = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();
    
    $scope.getInitialData = function(userRef,username){
              var fbStr = new Firebase ("https://vote-x.firebaseio.com/users/");
               fbStr.child(userRef).set({
               email: $scope.userEmail,
               verified: false,
               ownProfileImg: false,
               profileImage: 'img/standard_profileImg.jpg',
               birthday: "",
               firstname: "",
               lastname: "",
               username: $scope.username,
               level: "Neuling",
               contacts: 0,
               upvote_points: 0,
               votes: 0,
               uploaded_images: 0,
               vote_avg: 0,
               location: "",
               country: "",
               phone: 0,
               last_login: "",
               registrationDate: hours+":"+minutes+" "+day+"/"+(month+1)+"/"+year
                });
                
     
              usernameList.child(username).set(username);
                
                
                
    };
     
     
     //----- ------- Go Home------------ ---- --
     $scope.goHome = function () {
     $state.go("app.home");     
     }
    


    //--------------------------------------------------------------------------------------------------

    // Login
    $scope.doLogin = function (email, password) {

        if (email !== undefined && password !== undefined) {
                    $ionicLoading.show({
            template: 'Anmeldung läuft<p><ion-spinner icon="dots" class="spinner-assertive"></ion-spinner></p>'
        });
            myRef.authWithPassword({
                email: email,
                password: password
            }, function (error, authData) {
                if (error) {
                    $ionicLoading.hide();
                    switch (error.code) {
                        case "INVALID_PASSWORD":
                            showAlertLogin(ErrorLoginTitle2, ErrorLoginText2);
                           // console.log("The specified user account password is incorrect.");
                            break;

                        case "INVALID_USER":
                            showAlertLogin(ErrorLoginTitle4, ErrorLoginText4);
                           // console.log("There is no user with this email registered.");
                            break;

                        default:
                            showAlertLogin(ErrorLoginTitle3, ErrorLoginText3);
                           // console.log("Error logging user in:", error);
                    }
                } else {
                    var d = new Date();
    
                    var minutes = d.getMinutes();
                    var hours = d.getHours();
                    var day = d.getDate();
                    var month = d.getMonth();
                    var year = d.getFullYear();
                    
                    var userFB = new Firebase("https://vote-x.firebaseio.com/users/"+authData.uid+"/last_login")
                    userFB.set(hours+":"+minutes+" "+day+"/"+(month+1)+"/"+year);
                    
                     $rootScope.currentUserSignedIn =true;
                     
                     //Get userdata to display
                     var userFB = new Firebase("https://vote-x.firebaseio.com/users/"+authData.uid);
                     userFB.once("value", function(snapshot){
                        $scope.$apply(function(){
                        $scope.userData = snapshot.val();
                        $rootScope.user.level = $scope.userData.level;
                        $rootScope.user.username =  $scope.userData.username;
                        $rootScope.user.verified =  $scope.userData.verified;
                        $rootScope.user.ownProfileImage = $scope.userData.ownProfileImg;
                        $rootScope.user.profileImage = $scope.userData.profileImage;
                        $rootScope.user.memberSince = $scope.userData.registrationDate.substring(5,16);
                        $rootScope.user.contacts = $scope.userData.contacts;     
                        $rootScope.user.upvotePoints = $scope.userData.upvote_points;
                     })});
                    $rootScope.userInfo = authData;
                     $scope.userID = authData.uid;
                   $ionicLoading.hide();
                    showAlertLoggedIn(authData);
                  $scope.modal1.hide();
                 $state.go("app.home");
                }
            },{
                remember: "default"
            })
        }
      };

//----------------------Register function ------------------------------
      $scope.doRegister = function (username,username1, password1, password2) {
           // check username if already exists
        usernameList.once("value", function(snapshot) {
               if(snapshot.hasChild(username)){
                                   $ionicPopup.alert({
            title: 'Fehler!',
            template: '<p style="text-align: center"> Diesen Benutzernamen gibt es schon!</p>'+
                      '<p style="text-align: center">Wähle bitte einen anderen Namen aus</p>'
                    });
                                       
               }
               
           else {
               
        
        if (password1 !== password2) {
          showAlertError("Fehler!", "Ihr Passwort stimmt nicht überein!");
          
        }

        else
        if (username !== undefined && username1 !== undefined && password1 !== undefined && password2 !== undefined) {
       
                $ionicLoading.show({
            template: 'Sie werden registriert...<p><ion-spinner icon="dots" class="spinner-assertive"></ion-spinner></p>'
        });
            myRef.createUser({
                username: username,
                email: username1,
                password: password1,
                verified: 0    
                     
            },

             function (error, authData,password) {
                if (error) {
                    $ionicLoading.hide();
                  switch (error.code) {
                     case "INVALID_EMAIL":
                         showAlertError(ErrorTitle1, ErrorText1);
                         
                         break;
                     case "INVALID_PASSWORD":
                         showAlertError(ErrorTitle2, ErrorText2);
                         
                         break;
                     case "INVALID_USER":
                         showAlertError(ErrorTitle3, ErrorText3);
                         
                         break;

                     case "EMAIL_TAKEN":
                         showAlertError(ErrorTitle4, ErrorText4);
                         
                         break;

                     case "UNKNOWN_ERROR":
                         showAlertError(ErrorTitle5, ErrorText5);
                         
                         break;

                     default:
                         showAlertError(ErrorTitle5, ErrorText5);
                        
                 }
                } else {
                  
                  $scope.userEmail = username1;
                    userRef = authData.uid;
                    $scope.getInitialData(userRef,$scope.username); 
                    showAlertCreated(username1,username);
                    $state.go("app.home");
                   $ionicLoading.hide();
                }
            })
        

      }             
              
              
              
              
               
               
               
               
               
               
           }    
                                                                 
        });        

     
    }
  

    
    
  
    //---------------------------------------------------------------------------------------------------------------

        // ERROR-HANDLING Registration
        var ErrorTitle1 = "Ungültige Email!";
        var ErrorText1 = "Die angegebene Email-Adresse ist leider ungültig ! :(";

        var ErrorTitle2 = "Ungültiges Passwort!"
        var ErrorText2 = "Das angegebene Passwort ist leider ungültig ! :(";

        var ErrorTitle3 = "Ungültiger Benutzername!"
        var ErrorText3 = "Der angegebene Benutzername ist leider ungültig oder vergeben ! :(";

        var ErrorTitle4 = "Diese Email-Adresse ist nicht verfügbar!"
        var ErrorText4 = "Die angegebene Email-Adresse ist leider schon vergeben! :(";

        var ErrorTitle5 = "Es gab einen Fehler!"
        var ErrorText5 = "Es ist leider ein Fehler aufgetreten! :(";

    //------------------------------------------------------------------------------------------------------------------
    // ERROR-HANDLING Login

    var ErrorLoginTitle2 = "Ungültiges Passwort!";
    var ErrorLoginText2 = "Das angegebene Passwort ist leider falsch! Haben Sie ihr Kennwort vergessen ?";

    var ErrorLoginTitle3 = "Login fehlgeschlagen!"
    var ErrorLoginText3 = "Beim Login ist ein Fehler aufgetreten! :( Bitte kontaktiere den Support!";

    var ErrorLoginTitle4 = "Login fehlgeschlagen!"
    var ErrorLoginText4 = "Es wurde kein Benutzer mit dieser Email-Adresse gefunden! Bitte registrieren Sie sich zuerst.";

    //------------------------------------------------------------------------------------------------------------------
    //Alert popup Error Registrierung
    var showAlertError = function (title, text) {
        $ionicPopup.alert({
            title: title,
            template: text
        })
    };


    //Alert popup Registrierung successful
    var showAlertCreated = function (username) {
       $ionicPopup.alert({
            title: 'Geschafft!',
            template: '<p style="text-align: center"> Dein Konto mit der Email: ' + username + ' wurde erfolgreich erstellt :)</p>'+
                      '<p style="text-align: center">Jetzt musst Du dich nur noch einloggen, viel Spaß!</p>'
        })
    };


    //Alert popup Error Login

    var showAlertLogin = function (title, text) {
        $ionicPopup.alert({
            title: title,
            template: text
        })
    };

    //Alert popup login success

    var showAlertLoggedIn = function (authData) {
        $ionicPopup.alert({
            title: 'Willkommen!',
            template: '<p style="text-align: center">Du hast dich erfolgreich eingeloggt :)</p>'
        })
    };

    

    //------------------------------------------------------------------------------------------------------------------
    // Forgot Password
    $scope.resetPW = function (username) {
    myRef.resetPassword({
      email: username
    }, function(error) {
      if (error) {
        switch (error.code) {
          case "INVALID_USER":
            
            $ionicPopup.alert({
                title: 'Fehler!',
                template: 'Konnten keinen Benutzer mit dieser Email finden! '
            })
            break;
          default:
            
        }
      } else {
        
         $ionicPopup.alert({
                title: 'Fertig!',
                template: 'Eine Email mit dem neuen Passwort wurde verschickt! '
            })
      }
    });
    }

//-----------------------------Facebook-Login------------------------------- 
 $scope.loginFB = function() {
      $scope.modal1.hide();
myRef.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
    } else {
        console.log("FB Authdata: "+JSON.stringify(authData.facebook.profileImageURL)); // noch andere Daten auslesen
        $ionicPopup.alert({
            title: 'Willkommen!',
            template: 'Du hast dich erfolgreich eingeloggt :)'
        });
      $rootScope.currentUserSignedIn=true;
    
                     console.log("current user signed in");
                       }
     },
     
      {
        scope: "email"   
          
      }
)

};
  
});