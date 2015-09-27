var votex = angular.module('starter.controllers', ['firebase', 'ui.bootstrap','uiGmapgoogle-maps'])

.controller('AppCtrl', function ($scope, $firebaseAuth, $rootScope, $ionicLoading, $http,
 $state, $ionicModal, $timeout, $ionicPopup, $cordovaOauth, $ionicSlideBoxDelegate, $cordovaGeolocation, $ImageCacheFactory, $ionicScrollDelegate) {

    //Preload ALL Images
    $ImageCacheFactory.Cache([
        
        'img/votex_title.png',
        'img/voteOn.png',
        'img/voteOff.png',
        'img/voteTitleOn.png',
        'img/voteTitleOff.png',
        'img/voteRateOn.png',
        'img/voteRateOff.png',
        'img/profile_harun-oral.jpg',
        'http://www.ncr.com/wp-content/uploads/iStock_000016978975SmallMedium.jpg',
        'http://www.blogrollcenter.com/news/gallery/searching-for-authentic-italian-restaurants/searching_for_authentic_italian_restaurants.jpg'
    ]); 

     //Vote-X Logo Titel Img
     
     $scope.votexTitle = 'img/votex_title.png';
     $scope.harunProfileImg = 'img/profile_harun-oral.jpg';
     


    // GeoLocation

    // Firebase reference
    var myRef = new Firebase("https://vote-x.firebaseio.com");
    var userRef ;
    // Login Status-----------------------------------
    
    $rootScope.currentUserSignedIn = false;

    //UserData after Registration-----------------------------
   
 
    $scope.userEmail;
    $scope.registerID;
    $scope.userID; //authData.uid nach Login gespeichert
    $scope.profilePic;
    var fid; // Firebade user ID firebaseio.com/users/*fid*/email etc

    //Get initial userdata-----------------------------

            
    
    $scope.getInitialData = function(userRef){
              var fbStr = new Firebase ("https://vote-x.firebaseio.com/users/");
              var usersRef = fbStr.push({
               email: $scope.userEmail    
                });
    
      fid = usersRef.key();
       console.log("Firebase ID: "+fid);
    };
     
      
    //------------Get profile Url---------------- 
    /*
        $scope.getProfilePic = function(authData) {
              $scope.userID = authData.uid;
              
              var fbStr = "https://vote-x.firebaseio.com/users/"+$scope.userID;
              var testRef = new Firebase (fbStr);
              console.log(testRef);
            if($rootScope.currentUserSignedIn) {
                console.log("scope.userID = "+$scope.userID);
              
                userRef.child($scope.userID);
                userDetailRef.update({
                   
                   ProfileImage: authData.password.profileImageURL
                    
                });
                
                console.log("ProfileImg updated"); 
            }
           
            
        };
   */
    //ion-refresher----------------------------------------------------------
    

    $scope.doRefresh = function () {


        $timeout(function () {

            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');

        }, 1000);
    };



    // Open the login modal----------------------------------------------------------

          // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        id: '1',
        animation: 'slide-in-up',
        scope: $scope
    }).then(function (modal) {
        $scope.modal1 = modal;
    });

   $scope.openModal = function(index) {
      if (index == 1) $scope.modal1.show();
      else $scope.modal2.show();
    };

    $scope.closeModal = function(index) {
      if (index == 1) $scope.modal1.hide();
      else $scope.modal2.hide();
    };



    //--------------------------------------------------------------------------------------------------

    // Login
    $scope.doLogin = function (email, password) {

        if (email !== undefined && password !== undefined) {
            myRef.authWithPassword({
                email: email,
                password: password
            }, function (error, authData) {
                if (error) {
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
                     $rootScope.currentUserSignedIn =true;
                     console.log("current user signed in");
            //    $scope.getProfilePic(authData);
                     $scope.userID = authData.uid;
                    showAlertLoggedIn(authData);
                  $scope.modal1.hide();
                 $state.go("app.profile");
                }
            },{remember: "sessionOnly"
            })
        }
      };

//----------------------Register function ------------------------------
      $scope.doRegister = function (username1, password1, password2) {

        if (password1 !== password2) {
          showAlertError("Fehler!", "Ihr Passwort stimmt nicht überein!");

        }

        else
        if (username1 !== undefined && password1 !== undefined && password2 !== undefined) {
            myRef.createUser({

                email: username1,
                password: password1,
                verified: 0    
                     
            },

             function (error, authData,password) {
                if (error) {

                  switch (error.code) {
                     case "INVALID_EMAIL":
                         showAlertError(ErrorTitle1, ErrorText1);
                         console.log("The specified user account email is invalid.");
                         break;
                     case "INVALID_PASSWORD":
                         showAlertError(ErrorTitle2, ErrorText2);
                         console.log("The specified user account password is incorrect.");
                         break;
                     case "INVALID_USER":
                         showAlertError(ErrorTitle3, ErrorText3);
                         console.log("The specified user account does not exist.");
                         break;

                     case "EMAIL_TAKEN":
                         showAlertError(ErrorTitle4, ErrorText4);
                         console.log("The specified user account email is already in use.");
                         break;

                     case "UNKNOWN_ERROR":
                         showAlertError(ErrorTitle5, ErrorText5);
                         console.log("An unknown error occurred.");
                         break;

                     default:
                         showAlertError(ErrorTitle5, ErrorText5);
                         console.log("Error logging user in:", error);
                 }
                } else {
                  $scope.userEmail = username1;
                    console.log(authData.uid);
                    userRef = authData.uid;
                    $scope.getInitialData(userRef); 
                    showAlertCreated(username1);
                    $state.go("app.home");
                   
                }
            })
        }
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
            template: 'Dein Konto mit der Email: ' + username + ' wurde erfolgreich erstellt :)'
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
            template: 'Du hast dich erfolgreich mit der Email: ' + authData.password.email + ' eingeloggt :)'
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
            console.log("The specified user account does not exist.");
            $ionicPopup.alert({
                title: 'Fehler!',
                template: 'Konnten keinen Benutzer mit dieser Email finden! '
            })
            break;
          default:
            console.log("Error resetting password:", error);
        }
      } else {
        console.log("Password reset email sent successfully!");
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
      $rootScope.currentUserSignedIn =true;
                     console.log("current user signed in");
                       }
     },
     
      {
        remember:"sessionOnly",
        scope: "email"   
          
      }
)

};

//-------------------------Log Out------------------------------------------

$scope.logout = function() {
      myRef.unauth();
      $rootScope.currentUserSignedIn =false;
     console.log("user signed out");
     $scope.loggedOut();
     $ionicPopup.alert({
            title: 'Ciao!',
            template: 'Du hast dich erfolgreich ausgeloggt'
        });
    
};

//----------------------Logged out -----------------------------------------

$scope.loggedOut = function(){
  if($rootScope.currentUserSignedIn == false) {
       $state.go("app.home");
  }
    
};


//------------------------------TestImages------------------------------------
$scope.$on("$ionicView.enter",function(){
   $ionicSlideBoxDelegate.update();
});
  $scope.testImages = [
  'http://www.ncr.com/wp-content/uploads/iStock_000016978975SmallMedium.jpg',
  'http://restaurantcoverings.com/wp-content/uploads/2014/09/Lemon-Water-Stock-Image.jpg',
  'http://www.blogrollcenter.com/news/gallery/searching-for-authentic-italian-restaurants/searching_for_authentic_italian_restaurants.jpg'
  
  ]; 

  $scope.testImages2 = [
  'http://blogs.independent.co.uk/wp-content/uploads/2013/02/pub.jpg',
  'http://www.saexplorers.org/sites/default/files/images/clubhouse/event/cusco/2013/pub1.jpg',
  'http://i.telegraph.co.uk/multimedia/archive/02328/harp_2328698b.jpg'
  
  ]; 



//------------------------------Business Modal---------------------------------

// Business Name

$scope.businessName = "Marc's Restaurant";
$scope.businessName2 = "Harun's Bar";




//

 $scope.openBusiness = function() {
   $state.go('app.business')
  };
  
  //Business Name 2
 $scope.openBusiness2 = function() {
      $state.go('app.business2')
  };



// ---------------------- Vote-X RATING ----------------------

  $scope.rate = 5;
  $scope.rateBiz= 4;
 
  $scope.oneVote = 1;
  $scope.twoVote = 2;
  $scope.threeVote = 3;
  $scope.fourVote = 4;
  $scope.fiveVote = 5;


// ---------------------- End RATING ----------------------
$scope.goHome = function() {
$state.go("app.home");
}


// ----------------------------------------- Progressbar -----------------------------------------
    $scope.devProgress = 70;
    
 // ----------------------------------------- Progressbar End-----------------------------------------   

// Collapse
     $scope.isCollapsed = false;
     
     $scope.resize = function() {
         
          setTimeout(function () {
    $ionicScrollDelegate.resize();
    },150);
        
     }
// Dynamic accordion bootstrap

  $scope.statusVotes = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  
   $scope.statusArticle = {
    open: true,   
    isFirstOpen: true,
    isFirstDisabled: false
  };
  
   $scope.statusMap = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  
     $scope.statusComments = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  
  $scope.groups = [
    {
      title: 'Erweitere Votes',
      content: 'Dynamic Group Body - 1'
    },
  ];

  $scope.items = ['Item 1', 'Item 2', 'Item 3'];

  $scope.addItem = function() {
    var newItemNo = $scope.items.length + 1;
    $scope.items.push('Item ' + newItemNo);
  };

// Refresh
$scope.itemsR = [1,2,3];
  $scope.doRefresh = function() {
    $http.get('/new-itemsR')
     .success(function(newItems) {
       $scope.itemsR = newItems;
     })
     .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
  };
  
  // ------------------------------- Angular Google Map -----------------------
  $scope.map = { 
    center: { 
                latitude: 52.476020, 
                longitude: 13.290786 },
             zoom: 15
             };
 
     var events = {
          places_changed: function (searchBox) {}
        }
        $scope.searchbox = {  events:events};
        
         $scope.marker = {
      id: 0,
      coords: {
        latitude: 52.476020,
        longitude: 13.290786
      },
      options: { draggable: false },
      events: {
        dragend: function (marker, eventName, args) {
          $log.log('marker dragend');
          var lat = marker.getPosition().lat();
          var lon = marker.getPosition().lng();
          $log.log(lat);
          $log.log(lon);

          $scope.marker.options = {
            draggable: true,
            labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
            labelAnchor: "100 0",
            labelClass: "marker-labels"
          };
        }
      }
    };


// ----------------------------------------------------------------------------------
});
//-----------------------------------------END APPCTRL-----------------------------------------

