var votex = angular
  .module('starter.controllers')
  .controller("businessCtrl", function($scope, $rootScope,
    $state, $ionicPopup, $ionicModal,
    $ionicScrollDelegate, $http, $log,
    $ionicLoading, $ionicPlatform, $ionicSlideBoxDelegate,
    viewFactory, $firebaseArray, $timeout, userFactory) {

    if ($rootScope.currentUserSignedIn) {

      var votedRef = new Firebase("https://vote-x.firebaseio.com/users/" + $rootScope.user.uid + "/vote_history/" + $rootScope.placeObject.place_id);
      var select = "";
      $rootScope.has = {
        ownImg: true
      };

      $rootScope.commentImg = 0;

      $scope.ordered = {
        by: "item.vote_upvotes"
      };
      $rootScope.voted = {
        is: false
      };
      $scope.point = {
        string: "Punkte"
      };
      votedRef.once("value", function(snapshot) {

        if (snapshot.exists()) {
          $scope.voted.is = true;
        }
      });

      if ($rootScope.placeObject !== undefined) {
        $scope.place = $rootScope.placeObject;



        //Anzahl der Votes


        $scope.rate = $rootScope.votexObject.avg_points;
        $scope.totalRatings = $rootScope.votexObject.amountRatings;

        if ($scope.totalRatings == 1) {
          $scope.voteString = "Vote";
        } else {
          $scope.voteString = "Votes";
        }


        // ---------------------- Vote-X RATING ----------------------
        var placeRef = new Firebase("https://vote-x.firebaseio.com/places/" + $scope.place.place_id);

        //Durchschnittspunktzahl


        //Durchschnitt Preis/Leistung
        placeRef.child('avg_best_value_points').once("value", function(snapshot) {
          $scope.avg_best_value_points = snapshot.val();
          $scope.groups[0].scores[3] = $scope.avg_best_value_points;
        });

        //Durchschnitt Service
        placeRef.child('avg_employee_points').once("value", function(snapshot) {
          $scope.avg_service_points = snapshot.val();
          $scope.groups[0].scores[0] = $scope.avg_service_points;
        });

        //Durchschnitt Location
        placeRef.child('avg_location_points').once("value", function(snapshot) {
          $scope.avg_location_points = snapshot.val();
          $scope.groups[0].scores[1] = $scope.avg_location_points;
        });

        //Durchschnitt Quality
        placeRef.child('avg_quality_points').once("value", function(snapshot) {
          $scope.avg_quality_points = snapshot.val();
          $scope.groups[0].scores[2] = $scope.avg_quality_points;
        });

        //Durchschnitt Ambiente
        placeRef.child('avg_ambience_points').once("value", function(snapshot) {
          $scope.avg_ambience_points = snapshot.val();
          $scope.groups[0].scores[4] = $scope.avg_ambience_points;
        });
        // // Business Name
        $rootScope.businessName = $scope.place.name;


        // ---------------------- End RATING ----------------------
        $scope.goHome = function() {
          $state.go("app.home");
        };

        //-----------------------------Ionic-Accordion-------------------------------

        $scope.groups = [2];

        $scope.groups[0] = {
          id: 0,
          active: 0,
          name: "Detaillierte Votes",
          items: [("Service"), ("Location"), ("Qualität"), ("Preis/Leistung"), ("Ambiente")],
          scores: []
        };
        $scope.groups[1] = {
          id: 1,
          active: 0,
          name: "Bewertungen",
          items: []
        };
        $scope.groups[2] = {
          id: 2,
          active: 0,
          name: "Öffnungszeiten",
          items: [("Montag:"), ("Dienstag:"), ("Mittwoch:"), ("Donnerstag:"), ("Freitag:"), ("Samstag:"), ("Sonntag:")],
          weekdaysOpenH: [],
          weekdaysOpenM: [],
          weekdaysClosedH: [],
          weekdaysClosedM: []
        };
        $scope.groups[3] = {
          id: 3,
          active: 0,
          name: "Beschreibung",
        };



        $scope.toggleGroup = function(group) {

          if (group.active === 1) {
            group.active = 0;
          } else {
            group.active = 1;
          }


        };

        $scope.isGroupShown = function(group) {
          if (group.active === 1) {
            return true;
          } else {
            return false;
          }
        };


        $scope.showSort = function(group) {
          if (group.id == 1) {
            return true;
          } else {
            return false;
          }
        };

        // ------------------- Select -------------------------

        $scope.select = function(select) {

          if (select == "Beste") {
            alert("BESTE !");
            $scope.ordered = 'item.vote_upvotes';
          } else if (select == "Neueste") {
            alert("Neueste !");
            $scope.ordered = 'item.vote_upvotes';
          }
        };

        //---------------------- Check if bookmarked -----------------

        var bookmarkRef = new Firebase("https://vote-x.firebaseio.com/users/" + $rootScope.user.uid);
        bookmarkRef.child("bookmarks").child($rootScope.placeObject.place_id).once("value", function(bookmarkData) {
          if (bookmarkData.exists()) {
            $rootScope.bookmarked = {
              is: true
            };
          } else {
            $rootScope.bookmarked = {
              is: false
            };
          }
        });


        // ---------------------- Get Comments --------------------

        $rootScope.commentRef = new Firebase("https://vote-x.firebaseio.com/places/" + $scope.place.place_id + "/votes");
        var getComments = function() {
          $rootScope.commentArray = $firebaseArray($rootScope.commentRef);


          $rootScope.commentArray.$loaded().then(function() {
            for (var i = 0; i < $rootScope.commentArray.length; i++) {

              $scope.groups[1].items.push($rootScope.commentArray[i]);
              $scope.groups[1].items[i].wholeText = false;
              $scope.groups[1].items[i].aID = i;
              $scope.groups[1].items[i].loaded_img = "";


              if ($scope.groups[1].items[i].vote_upvotes == 1) {
                $scope.point.string = "Punkt";
              } else {
                $scope.point.string = "Punkte";
              }

              $scope.getVoterInfo($scope.groups[1].items[i], i);
            }
          });
        };

        getComments();

        $scope.getVoterInfo = function(array, f) {
          var voterInfoRef = new Firebase("https://vote-x.firebaseio.com/users/" + array.voter_uid);
          voterInfoRef.once("value", function(voterData) {
            var data = voterData.val();
            $scope.groups[1].items[f].voterName = data.username;
            $scope.groups[1].items[f].voterOwnProfileImg = data.ownProfileImg;
            $scope.groups[1].items[f].voterImg = data.profileImage;
            $scope.groups[1].items[f].contacts = data.contacts;
            $scope.groups[1].items[f].since = data.registrationDate;
            $scope.groups[1].items[f].amountVotes = data.votes;
            $scope.groups[1].items[f].upvotePoints = data.upvote_points;
            $scope.groups[1].items[f].location = data.location;
            $scope.groups[1].items[f].verified = data.verified;
            $scope.groups[1].items[f].age = data.age;

            if (!data.ownProfileImg) {
              $scope.groups[1].items[f].voterImg = data.profileImage;
            } else {
              $scope.getImage(array.voter_uid);

              $rootScope.commenterImg.on("success", function(resp) {
                $scope.groups[1].items[f].voterImg = resp.data.Body.toString();
                $ionicLoading.hide();
              });
            }
          });
        };

        //-----------------------------Öffnungszeiten---------------------------
        $scope.gotOpeningHours = {
          hours: false
        };

        if ($scope.place.opening_hours !== undefined) {
          $scope.gotOpeningHours.hours = true;
          for (var i = 0; i < $scope.place.opening_hours.periods.length; i++) {

            //öffnung Stunde
            if ($scope.place.opening_hours.periods[i].open.hours > 9)
              $scope.groups[2].weekdaysOpenH[i] = $scope.place.opening_hours.periods[i].open.hours;
            else {
              $scope.groups[2].weekdaysOpenH[i] = "0" + $scope.place.opening_hours.periods[i].open.hours;
            }
            //öffnung Minute
            if ($scope.place.opening_hours.periods[i].open.minutes > 9)
              $scope.groups[2].weekdaysOpenM[i] = $scope.place.opening_hours.periods[i].open.minutes;
            else {
              $scope.groups[2].weekdaysOpenM[i] = "0" + $scope.place.opening_hours.periods[i].open.minutes;
            }
            //schließung Stunde
            if ($scope.place.opening_hours.periods[i].close.hours > 9)
              $scope.groups[2].weekdaysClosedH[i] = $scope.place.opening_hours.periods[i].close.hours;
            else {
              $scope.groups[2].weekdaysClosedH[i] = "0" + $scope.place.opening_hours.periods[i].close.hours;
            }
            //schließung Stunde
            if ($scope.place.opening_hours.periods[i].close.minutes > 9)
              $scope.groups[2].weekdaysClosedM[i] = $scope.place.opening_hours.periods[i].close.minutes + " Uhr";
            else {
              $scope.groups[2].weekdaysClosedM[i] = "0" + $scope.place.opening_hours.periods[i].close.minutes + " Uhr";
            }
          }
        } else {
          $scope.gotOpeningHours.hours = false;
          $scope.groups[2].items = [("Keine Öffnungszeiten gefunden")];
        }

        //------------------------------Photos------------------------------------
        $rootScope.testImages = [];


        var placeImageRef = new Firebase("https://vote-x.firebaseio.com/places/" + $rootScope.placeObject.place_id + "/images");
        $scope.images = $firebaseArray(placeImageRef);
        $scope.images.$loaded(function() {

          if ($scope.images[0] !== undefined && $scope.images[0] !== null && $scope.images[0] !== "") {
            $rootScope.has = {
              ownImg: true
            };
            for (var i = 0; i < $scope.images.length && i < 5; i++) {
              var key = $scope.images[i].placeImg;
              var imgParams = {
                Bucket: $rootScope.creds.bucket,
                Key: key
              };
              $rootScope.bucket.getObject(imgParams, function(err, data) {
                if (err) {
                  console.info(err, err.stack);
                } else {
                  $scope.$apply(function() {
                    $rootScope.testImages.push("data:image/jpeg;base64," + data.Body.toString('ascii'));
                    $ionicSlideBoxDelegate.update();

                  });
                }

              });
            }
          } else {
            if ($scope.place.photos !== undefined) {
              for (var j = 0; $scope.place.photos[j] !== undefined && j < 5; j++) {
                $rootScope.testImages.push($scope.place.photos[j].getUrl({
                  'maxWidth': 750,
                  'maxHeight': 400
                }));
                $ionicSlideBoxDelegate.update();
              }
            } else {
              $rootScope.testImages.push('img/noimage.jpg');
              $ionicSlideBoxDelegate.update();
            }

          }
        });




        // ------------------------------ ngMap -------------------------------------


        $scope.mapCenter = function(lat, lng) {
          return lat + "," + lng;

        };
        $scope.lat = $rootScope.placeObject.geometry.location.lat(); //dynamic google data, must be string z.B. "52.11341"
        $scope.lng = $rootScope.placeObject.geometry.location.lng();


        $scope.openBusinessMap = function() {

          $scope.myBusinessPopup = $ionicPopup.show({
            templateUrl: 'templates/businessMap.html',
            scope: $scope,
            cssClass: 'businessMap'
          });
        };

        $scope.closeBusiness = function() {
          $scope.myBusinessPopup.close();
        };



        // Vote-Popup

        $scope.openVote = function() {
          if ($rootScope.user.verified) {

            $scope.myPopup = $ionicPopup.show({
              templateUrl: 'templates/vote.html',
              scope: $scope,
              cssClass: 'businessMap'
            });
          } else {
            $ionicPopup.alert({
              title: "Nicht verifiziert!",
              template: 'Du musst dich verifizieren um voten zu können!'
            });
          }
        };


        $scope.closeVote = function() {
          $rootScope.checkIfSecondSlide.is = false;
          $scope.myPopup.close();
        };
        $scope.goBackVoting = function() {
          $rootScope.checkIfSecondSlide.is = false;
          $ionicSlideBoxDelegate.$getByHandle('vote').previous();
          $ionicSlideBoxDelegate.$getByHandle('vote').update();
        };
        $scope.goBackVoting2 = function() {
          $rootScope.checkIfSecondSlide.is = false;
          $ionicSlideBoxDelegate.$getByHandle('editVote').previous();
          $ionicSlideBoxDelegate.$getByHandle('editVote').update();
        };
      } else {
        $state.go('app.home');
      }

      //51.2027511
      //6.692436100000009

      //----------- Native Navigation Phonegap-Launch-Navigator -------------------
      // Launches native navigation app
      $scope.getRoute = function() {
        var scheme;

        if (ionic.Platform.isAndroid()) {
          launchnavigator.navigate(
            [$rootScope.placeObject.geometry.location.lat(), $rootScope.placeObject.geometry.location.lng()],
            null,
            function() {
            },
            function(error) {
              console.log("Launchnavigator failed " + error);
            });
        } else {
          window.open('https://maps.google.de/?saddr=&daddr=' + $rootScope.placeObject.geometry.location.lat() + '+' + $rootScope.placeObject.geometry.location.lng(), '_system', 'location=yes');
        }

      };

      //--------------------- Call Vote from Home ------------------------

      if (viewFactory.callVote == "true") {
        viewFactory.callVote = "false";
        $scope.myPopup = $ionicPopup.show({
          templateUrl: 'templates/vote.html',
          scope: $scope,
          cssClass: 'businessMap'
        });
      }



      //-------------------- Edit Vote --------------------
      if (viewFactory.editVote == "true") {
        viewFactory.editVote = "false";
        $scope.myPopup = $ionicPopup.show({
          templateUrl: 'templates/editVote.html',
          scope: $scope,
          cssClass: 'businessMap'
        });
      }



      $scope.editVote = function() {

        $scope.myPopup = $ionicPopup.show({
          templateUrl: 'templates/editVote.html',
          scope: $scope,
          cssClass: 'businessMap'
        });
      };


      // Get Image from Amazon

      $scope.getImage = function(index) {

        var key = "users/" + index + '/profileImg.txt';
        var imgParams = {
          Bucket: $rootScope.creds.bucket,
          Key: key
        };

        $rootScope.commenterImg = $rootScope.bucket.getObject(imgParams);
        $rootScope.commenterImg.send();
      };

      $scope.addBookmark = function() {
        var bookmarkRef = new Firebase("https://vote-x.firebaseio.com/users/" + $rootScope.userInfo.uid);

        bookmarkRef.child("bookmarks").child($rootScope.placeObject.place_id).update({
          'name': $scope.businessName
        });
        $rootScope.bookmarked.is = true;
      };

      $scope.removeBookmark = function() {
        var bookmarkRef = new Firebase("https://vote-x.firebaseio.com/users/" + $rootScope.userInfo.uid);
        bookmarkRef.child("bookmarks").child($rootScope.placeObject.place_id).remove();
        $rootScope.bookmarked.is = false;
      };


    } else {
      var fbRef = new Firebase("https://vote-x.firebaseio.com/");
      var authData = fbRef.getAuth();

      if (authData) {
        $rootScope.userInfo = authData;
        $rootScope.userInfo.uid = authData.uid;
        $rootScope.currentUserSignedIn = true;
      }
    }

    $scope.uFshow = function (item) {

      userFactory.setProfileViewer(item);
      userFactory.showProfile($scope);
    };

    //----------------------- businessCtrl END ------------------------
  })


.filter('cut', function() {
  return function(value, wordwise, max, tail) {
    if (!value) return '';

    max = parseInt(max, 10);
    if (!max) return value;
    if (value.length <= max) return value;

    value = value.substr(0, max);
    if (wordwise) {
      var lastspace = value.lastIndexOf(' ');
      if (lastspace != -1) {
        value = value.substr(0, lastspace);
      }
    }

    return value + (tail || ' …');
  };
});
