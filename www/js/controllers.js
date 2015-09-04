angular.module('starter.controllers', ['firebase'])

.controller('AppCtrl', function ($scope, $firebaseAuth, $rootScope, $ionicLoading,
 $state, $ionicModal, $timeout, $ionicPopup) {

    // Firebase reference
    var myRef = new Firebase("https://vote-x.firebaseio.com");


    //ion-refresher

    $scope.doRefresh = function () {


        $timeout(function () {

            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');

        }, 1000);
    };


    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal

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

    // Perform the login action when the user submits the login form
    $scope.doLogin = function (email, password) {

        if (email !== undefined && password !== undefined) {
            myRef.authWithPassword({
                email: email,
                password: password
            }, function (error, authData) {
                if (error) {
                    switch (error.code) {
                        case "INVALID_EMAIL":
                            showAlertLogin(ErrorLoginTitle1, ErrorLoginText1);
                            console.log("The specified user account email is invalid.");
                            break;
                        case "INVALID_PASSWORD":
                            showAlertLogin(ErrorLoginTitle2, ErrorLoginText2);
                            console.log("The specified user account password is incorrect.");
                            break;

                        case "INVALID_USER":
                            showAlertLogin(ErrorLoginTitle4, ErrorLoginText4);
                            console.log("There is no user with this email registered.");
                            break;

                        default:
                            showAlertLogin(ErrorLoginTitle3, ErrorLoginText3);
                            console.log("Error logging user in:", error);
                    }
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                    showAlertLoggedIn(authData);
                  $scope.modal1.hide();
                }
            })

remember: "sessionOnly"

            ;
        }
        else {
            showAlertEmpty();

        }
    };


      $scope.doRegister = function (username1, password1, password2) {

        if (password1 !== password2) {
          showAlertError("Fehler!", "Ihr Passwort stimmt nicht überein!");

        }

        else
        if (username1 !== undefined && password1 !== undefined && password2 !== undefined) {
            myRef.createUser({

                email: username1,
                password: password1,
                registered_in: Date()

            },

             function (error, authData) {
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
        var alertPopup = $ionicPopup.alert({
            title: title,
            template: text
        })
    };


    //Alert popup Registrierung successful
    var showAlertCreated = function (username) {
        var alertPopup = $ionicPopup.alert({
            title: 'Geschafft!',
            template: 'Dein Konto mit der Email: ' + username + ' wurde erfolgreich erstellt :)'
        })
    };


    //Alert popup Error Login

    var showAlertLogin = function (title, text) {
        var alertPopup = $ionicPopup.alert({
            title: title,
            template: text
        })
    };

    //Alert popup login success

    var showAlertLoggedIn = function (authData) {
        var alertPopup = $ionicPopup.alert({
            title: 'Willkommen!',
            template: 'Du hast dich erfolgreich mit der Email: ' + authData.password.email + ' eingeloggt :)'
        })
    };
    //------------------------------------------------------------------------------------------------------------------

    // Forgot Password

    myRef.resetpassword = function(user) {
        if(angular.isDefined(user)){
        Auth.resetpassword(user)
          .then(function() {
            console.log("Password reset email sent successfully!");
            $location.path('app.home');
          }, function(err) {
             console.error("Error: ", err);
          });
        }
      };

})
