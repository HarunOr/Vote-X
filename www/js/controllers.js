var votex = angular.module('starter.controllers', ['firebase', 'ui.bootstrap'])

.controller('AppCtrl', function ($scope, $firebaseAuth, $rootScope, $ionicLoading,
 $state, $ionicModal, $timeout, $ionicPopup, $cordovaOauth, $ionicSlideBoxDelegate, $cordovaGeolocation, $ImageCacheFactory) {

    //Preload ALL Images
    $ImageCacheFactory.Cache([
        
        'img/votex_title.png',
        'http://www.ncr.com/wp-content/uploads/iStock_000016978975SmallMedium.jpg',
        'http://www.komu.com/images/news/restaurant.jpg',
        'http://www.blogrollcenter.com/news/gallery/searching-for-authentic-italian-restaurants/searching_for_authentic_italian_restaurants.jpg'
    ]); 

     //Vote-X Logo Titel Img
     
     $scope.votexTitle = 'img/votex_title.png';


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
  'http://www.komu.com/images/news/restaurant.jpg',
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

 $scope.openBusiness = function(animation) {
    console.log(animation);
    $ionicModal.fromTemplateUrl('templates/business.html', {
      scope: $scope,
      animation: 'animated ' + animation,
      hideDelay:920
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
      $scope.hideModal = function(){
        $scope.modal.hide();
        // Note that $scope.$on('destroy') isn't called in new ionic builds where cache is used
        // It is important to remove the modal to avoid memory leaks
        $scope.modal.remove();
      }
    });
  };
  
  //Business Name 2
 $scope.openBusiness2 = function(animation) {
    console.log(animation);
    $ionicModal.fromTemplateUrl('templates/business2.html', {
      scope: $scope,
      animation: 'animated ' + animation,
      hideDelay:920
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
      $scope.hideModal = function(){
        $scope.modal.hide();
        // Note that $scope.$on('destroy') isn't called in new ionic builds where cache is used
        // It is important to remove the modal to avoid memory leaks
        $scope.modal.remove();
      }
    });
  };



// ---------------------- Vote-X RATING ----------------------

  function ionicRatings () {
    return {
      restrict: 'AE',
      replace: true,
      template: '<div class="text-center ionic_ratings">' +
        '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(1)" ng-show="rating < 1" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(1)" ng-show="rating > 0" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(2)" ng-show="rating < 2" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(2)" ng-show="rating > 1" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(3)" ng-show="rating < 3" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(3)" ng-show="rating > 2" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(4)" ng-show="rating < 4" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(4)" ng-show="rating > 3" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(5)" ng-show="rating < 5" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(5)" ng-show="rating > 4" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '</div>',
      scope: {
        ratingsObj: '=ratingsobj'
      },
      link: function(scope, element, attrs) {

        //Setting the default values, if they are not passed
        scope.iconOn = scope.ratingsObj.iconOn || 'ion-ios-star';
        scope.iconOff = scope.ratingsObj.iconOff || 'ion-ios-star-outline';
        scope.iconOnColor = scope.ratingsObj.iconOnColor || 'rgb(200, 200, 100)';
        scope.iconOffColor = scope.ratingsObj.iconOffColor || 'rgb(200, 100, 100)';
        scope.rating = scope.ratingsObj.rating || 1;
        scope.minRating = scope.ratingsObj.minRating || 1;
        scope.readOnly = scope.ratingsObj.readOnly || false;

        //Setting the color for the icon, when it is active
        scope.iconOnColor = {
          color: scope.iconOnColor
        };

        //Setting the color for the icon, when it is not active
        scope.iconOffColor = {
          color: scope.iconOffColor
        };

        //Setting the rating
        scope.rating = (scope.rating > scope.minRating) ? scope.rating : scope.minRating;

        //Setting the previously selected rating
        scope.prevRating = 0;

        //Called when he user clicks on the rating
        scope.ratingsClicked = function(val) {
          if (scope.minRating !== 0 && val < scope.minRating) {
            scope.rating = scope.minRating;
          } else {
            scope.rating = val;
          }
          scope.prevRating = val;
          scope.ratingsObj.callback(scope.rating);
        };

        //Called when he user un clicks on the rating
        scope.ratingsUnClicked = function(val) {
          if (scope.minRating !== 0 && val < scope.minRating) {
            scope.rating = scope.minRating;
          } else {
            scope.rating = val;
          }
          if (scope.prevRating == val) {
            if (scope.minRating !== 0) {
              scope.rating = scope.minRating;
            } else {
              scope.rating = 0;
            }
          }
          scope.prevRating = val;
          scope.ratingsObj.callback(scope.rating);
        };
      }
    }
  }
  


  $scope.myTitle = 'IONIC RATINGS DEMO';

  $scope.ratingsObject = {
    iconOn: 'ion-ios-star',
    iconOff: 'ion-ios-star-outline',
    iconOnColor: 'rgb(200, 200, 100)',
    iconOffColor: 'rgb(200, 100, 100)',
    rating: 3,
    minRating: 1,
    readOnly:false,
    callback: function(rating) {
      $scope.ratingsCallback(rating);
    }
  };

  $scope.ratingsCallback = function(rating) {
    console.log('Selected rating is : ', rating);
  };












// ---------------------- End RATING ----------------------




// ----------------------------------------- Progressbar -----------------------------------------
    $scope.devProgress = 70;
    
    

// Collapse
     $scope.isCollapsed = false;
// Dynamic accordion bootstrap
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

// ----------------------------------------------------------------------------------
});
//-----------------------------------------END APPCTRL-----------------------------------------

