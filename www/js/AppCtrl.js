 var votex = angular

   .module('starter.controllers', ['ui.bootstrap', 'ionicLazyLoad', 'ngMap', 'firebase', 'ngCordova']);

 votex.controller('AppCtrl', function($scope, viewFactory, $http, $ionicPlatform,
   $state, $ionicModal, $timeout, $firebaseObject,
   $ionicPopup, $cordovaOauth, $rootScope,
   $ionicLoading, $ionicScrollDelegate, $firebaseArray, $window
 ) {

   var ref = new Firebase("https://vote-x.firebaseio.com/");
   $scope.searched = false;

   $rootScope.test = {
     Image: ""
   };


   //------------------------ Refresher ----------------------------



   $scope.doRefresh = function() {
     $state.reload();
     $scope.$broadcast('scroll.refreshComplete');
   };

   //----------------------------- Search ------------------------------------

   $scope.se = function() {
     $scope.images = null;
     if ($scope.input !== null && $scope.input.place_id !== undefined) {

       $scope.searched = true;
       $rootScope.from = {
         bookmark: false
       };

       $ionicLoading.show({

         template: '<ion-spinner icon="lines" class="lines-assertive"/>'
       });


       $scope.place = $scope.input;
       $rootScope.placeObject = $scope.place;
       $scope.icon = $scope.place.icon;

       $timeout(function() {
         $scope.dynamicName = $scope.place.name;

         $scope.icon = $scope.place.icon;
         $scope.img = $scope.place.photos;
         if ($scope.place.types !== undefined)
           $scope.type = $scope.place.types[0];
         $scope.place_id = $scope.place.place_id;
         if ($scope.place.opening_hours !== undefined)
           $scope.place_open = $scope.place.opening_hours.open_now;
         if ($scope.place.geometry.viewport !== null)
         //Translate Type


         // search list
           ref.child('places').child('searchList').child($scope.place_id).once("value", function(SearchData) {
           if (SearchData.val() === null) {
             ref.child('places').child('searchList').child($scope.place_id).update({
               'searched': 1,
               'time': Firebase.ServerValue.TIMESTAMP
             });
           } else {
             var searchData = SearchData.val().searched;
             searchData = searchData + 1;
             ref.child('places').child('searchList').child($scope.place_id).update({
               'searched': searchData,
               'time': Firebase.ServerValue.TIMESTAMP
             });
           }



         });


         $scope.openWindow = function() {
           $window.open($scope.place.website, '_system', 'location=yes');
         };





         switch ($scope.type) {

           case "street_address":
             $scope.type = "Straße";
             break;

           case "country":
             $scope.type = "Land";
             break;

           case "point_of_interest":
             $scope.type = "Sehenswürdigkeit";
             break;

           case "accounting":
             $scope.type = "Verwaltung";
             break;
           case "airport":
             $scope.type = "Flughafen";
             break;
           case "amusement_park":
             $scope.type = "Vergnügungspark";
             break;
           case "aquarium":
             $scope.type = "Aquarienhaus";
             break;
           case "art_gallery":
             $scope.type = "Kunstgallerie";
             break;
           case "atm":
             $scope.type = "Bankautomat";
             break;
           case "bakery":
             $scope.type = "Bäckerei";
             break;
           case "bank":
             $scope.type = "Bank";
             break;
           case "bar":
             $scope.type = "Bar";
             break;
           case "beauty_salon":
             $scope.type = "Schönheitssalon";
             break;
           case "bicycle_store":
             $scope.type = "Fahrradgeschäft";
             break;
           case "book_store":
             $scope.type = "Buchhandlung";
             break;
           case "bowling_alley":
             $scope.type = "Kegelbahn";
             break;
           case "bus_station":
             $scope.type = "Bushaltestation";
             break;
           case "cafe":
             $scope.type = "Café";
             break;
           case "campground":
             $scope.type = "Campingplatz";
             break;
           case "car_dealer":
             $scope.type = "Autohändler";
             break;
           case "car_rental":
             $scope.type = "Autoverleih";
             break;
           case "car_repair":
             $scope.type = "Autowerkstatt";
             break;
           case "car_wash":
             $scope.type = "Autowäsche";
             break;
           case "casino":
             $scope.type = "Kasino";
             break;
           case "cemetery":
             $scope.type = "Friedhof";
             break;
           case "church":
             $scope.type = "Kirche";
             break;
           case "city_hall":
             $scope.type = "Rathaus";
             break;
           case "clothing_store":
             $scope.type = "Kleidungsgeschäft";
             break;
           case "convenience_store":
             $scope.type = "Geschmistwarenladen";
             break;
           case "courthouse":
             $scope.type = "Gerichtsgebäude";
             break;
           case "dentist":
             $scope.type = "Zahnarzt";
             break;
           case "department_store":
             $scope.type = "Kaufhaus";
             break;
           case "doctor":
             $scope.type = "Arzt";
             break;
           case "electrician":
             $scope.type = "Elektriker";
             break;
           case "electronics_store":
             $scope.type = "Elektronikladen";
             break;
           case "embassy":
             $scope.type = "Botschaft";
             break;
           case "establishment":
             $scope.type = "Geschäft";
             break;
           case "finance":
             $scope.type = "Finanzen";
             break;
           case "fire_station":
             $scope.type = "Feuerwehrstation";
             break;
           case "florist":
             $scope.type = "Blumenladen";
             break;
           case "food":
             $scope.type = "Lebensmittel";
             break;
           case "funeral_home":
             $scope.type = "Beerdigungsinstitut";
             break;
           case "furniture_store":
             $scope.type = "Möbelgeschäft";
             break;
           case "gas_station":
             $scope.type = "Tankstelle";
             break;
           case "general_contractor":
             $scope.type = "Generalunternehmer";
             break;
           case "grocery_or_supermarket":
             $scope.type = "Supermarkt";
             break;
           case "gym":
             $scope.type = "Fitnessstudio";
             break;
           case "hair_care":
             $scope.type = "Haarpflege";
             break;
           case "hardware_store":
             $scope.type = "Baumarkt";
             break;
           case "health":
             $scope.type = "Gesundheit";
             break;
           case "hindu_temple":
             $scope.type = "Hindutempel";
             break;
           case "home_goods_store":
             $scope.type = "Hauswarengeschäft";
             break;
           case "hospital":
             $scope.type = "Krankenhaus";
             break;
           case "insurance_agency":
             $scope.type = "Versicherungsunternehmen";
             break;
           case "jewelry_store":
             $scope.type = "Juwelier";
             break;
           case "laundry":
             $scope.type = "Waschsalon";
             break;
           case "lawyer":
             $scope.type = "Anwaltskanzlei";
             break;
           case "library":
             $scope.type = "Bibliothek";
             break;
           case "liquor_store":
             $scope.type = "Spirituosengeschäft";
             break;
           case "local_government_office":
             $scope.type = "Örtliche Polizei";
             break;
           case "locksmith":
             $scope.type = "Schlüsseldienst";
             break;
           case "lodging":
             $scope.type = "Unterkunft";
             break;
           case "meal_delivery":
             $scope.type = "Lieferdienst";
             break;
           case "meal_takeaway":
             $scope.type = "Abholrestaurant";
             break;
           case "movie_rental":
             $scope.type = "Videothek";
             break;
           case "movie_theater":
             $scope.type = "Kino";
             break;
           case "moving_company":
             $scope.type = "Umzugsfirma";
             break;
           case "museum":
             $scope.type = "Museum";
             break;
           case "night_club":
             $scope.type = "Discothek";
             break;
           case "painter":
             $scope.type = "Maler";
             break;
           case "park":
             $scope.type = "Park";
             break;
           case "parking":
             $scope.type = "Parkplatz";
             break;
           case "pet_store":
             $scope.type = "Tierhandlung";
             break;
           case "pharmacy":
             $scope.type = "Apotheke";
             break;
           case "physiotherapist":
             $scope.type = "Physiotherapeut";
             break;
           case "place_of_worship":
             $scope.type = "Andachtsstätte";
             break;
           case "plumber":
             $scope.type = "Klempner";
             break;
           case "police":
             $scope.type = "Polizei";
             break;
           case "post_office":
             $scope.type = "Poststelle";
             break;
           case "real_estate_agency":
             $scope.type = "Immobilienbüro";
             break;
           case "restaurant":
             $scope.type = "Restaurant";
             break;
           case "roofing_contractor":
             $scope.type = "Dachdecker";
             break;
           case "rv_park":
             $scope.type = "Reisemobil-Stellplatz";
             break;
           case "school":
             $scope.type = "Schule";
             break;
           case "shoe_store":
             $scope.type = "Schuhgeschäft";
             break;
           case "shopping_mall":
             $scope.type = "Einkaufszentrum";
             break;
           case "spa":
             $scope.type = "Spa";
             break;
           case "stadium":
             $scope.type = "Stadium";
             break;
           case "storage":
             $scope.type = "Lager";
             break;
           case "store":
             $scope.type = "Geschäft";
             break;
           case "subway_station":
             $scope.type = "U-Bahn-Station";
             break;
           case "synagogue":
             $scope.type = "Synagoge";
             break;
           case "taxi_stand":
             $scope.type = "Taxistand";
             break;
           case "train_station":
             $scope.type = "Bahnstation";
             break;
           case "travel_agency":
             $scope.type = "Reiseagentur";
             break;
           case "university":
             $scope.type = "Universität";
             break;
           case "veterinary_care":
             $scope.type = "Tierarzt";
             break;
           case "zoo":
             $scope.type = "Zoo";
             break;
           case "route":
             $scope.type = "Straße";
             break;
           case "locality":
             $scope.type = "Ort";
             break;
         }
         //-------------------------------------Translate END--------------------------------------------------------------------------


         // User Suchverlauf --------------------------
         if (ref.getAuth() !== null && $rootScope.currentUserSignedIn) {
           $scope.user_uid = ref.getAuth().uid;
           var searchRef = ref.child('users').child($scope.user_uid).child('search_history').child($scope.place_id);

           var countChildrenRef = new Firebase("https://vote-x.firebaseio.com/users/" + $scope.user_uid + "/search_history");

           searchID(countChildrenRef, searchRef, $scope.place_id, $scope.dynamicName, $scope.type, $scope.place.formatted_address, $scope.icon);

         }


         //Votes berechnen

         var place_votes = new Firebase("https://vote-x.firebaseio.com/places/" + $scope.place_id);
         place_votes.once("value", function(snapshot) {

           if (snapshot.val() !== null) {

             $timeout(function() {
               $scope.$apply(function() {
                 $scope.totalRatings = snapshot.val().total_votes;
                 $scope.votexRating = snapshot.val().avg_vote_points;
                 $scope.getVoteString($scope.totalRatings);
                 $rootScope.votexObject = {
                   avg_points: $scope.votexRating,
                   amountRatings: $scope.totalRatings
                 };
               });
             });
           } else {
             $scope.totalRatings = 0;
             $scope.votexRating = 0;
             $scope.getVoteString($scope.totalRatings);
             $rootScope.votexObject = {
               avg_points: $scope.votexRating,
               amountRatings: $scope.totalRatings
             };
           }




         });

         var placeImageRef = new Firebase("https://vote-x.firebaseio.com/places/" + $scope.place_id + "/images");
         $scope.images = $firebaseArray(placeImageRef);
         $scope.images.$loaded(function() {

           if ($scope.images[0] !== undefined && $scope.images[0] !== null && $scope.images[0] !== "") {

             var key = $scope.images[0].placeImg;
             var imgParams = {
               Bucket: $rootScope.creds.bucket,
               Key: key
             };
             $rootScope.bucket.getObject(imgParams, function(err, data) {
               if (err) {
                 console.info(err, err.stack);
               } else {

                 $scope.$apply(function() {
                   $rootScope.test.Image = "data:image/jpeg;base64," + data.Body.toString('ascii');

                 });
               }

             });

           } else {
             if ($scope.place.photos !== undefined) {
               $scope.isGoogle = "true";
               $scope.test.Image = $scope.place.photos[0].getUrl({
                 'maxWidth': 750,
                 'maxHeight': 500
               });
             } else {
               $scope.test.Image = 'img/noimage.jpg';
             }
           }
         });




         $ionicScrollDelegate.scrollTop();
         $scope.input = "";


       }, 0);


       $ionicLoading.hide();
     } else {
       searchNull();
     }



     if ($scope.currentUserSignedIn && $rootScope.placeObject !== undefined) {
       var votedRef = new Firebase("https://vote-x.firebaseio.com/users/" + $rootScope.user.uid + "/vote_history/" + $rootScope.placeObject.place_id);

       $scope.voted = {
         is: false
       };

       votedRef.once("value", function(snapshot) {

         if (snapshot.exists()) {
           $scope.voted.is = true;
         }
       });




       $ionicLoading.hide();
     }


     $rootScope.adMobCounter++;


     if ($rootScope.adMobCounter !== 0 && $rootScope.adMobCounter % 3 === 0 && ionic.Platform.isWebView()) {
       AdMob.showInterstitial();

     }

   };




   // -------------------- Suche Index erzeugen ---------------------

   var searchID = function(data, searchRef, place_id, place_name1, type, address, icon) {
     data.once("value", function(snapshot) {
       var a = snapshot.numChildren();

       if (place_id === undefined)
         place_id = null;

       if (place_name1 === undefined)
         place_name1 = null;

       if (type === undefined)
         type = null;

       if (address === undefined)
         address = null;

       if (icon === undefined)
         icon = null;

       var searchArray = $firebaseArray(data);

       searchArray.$add({
         place_uid: a,
         place_id: place_id,
         place_name: place_name1,
         place_type: type,
         place_address: address,
         place_icon: icon
       });


     });
   };
   // -----------------------------------------------------------------



   var searchNull = function() {
     $ionicPopup.alert({
       title: 'Wählen Sie einen Vorschlag aus!'
     });
   };

   $scope.closeSearch = function() {
     $scope.place = null;

   };

   // Search END ------------------------

   //------------------- Vote String ----------------------

   $scope.getVoteString = function(rating) {
     var erg = "";
     if (rating == 1) {
       erg = "Vote";
     } else {
       erg = "Votes";
     }

     $scope.voteString = erg;
     return $scope.voteString;
   };


   //------------------------------Business Modal---------------------------------

   $scope.openBusiness = function() {
     if ($scope.currentUserSignedIn === false) {
       $ionicPopup.alert({
         title: 'Oh nein!',
         template: 'Du musst dich einloggen, um das sehen zu können!'
       });
       return;
     } else {
       $scope.show = function() {
         $scope.input = "";
         $ionicLoading.show({
           template: 'Wird geladen..',
           hideOnStateChange: true
         });
       };

       $state.go('app.business');

     }
   };



   $scope.openVote = function() {
     if ($scope.currentUserSignedIn === false) {
       $ionicPopup.alert({
         title: 'Oh nein!',
         template: 'Du musst dich einloggen, um das sehen zu können!'
       });
       return;
     } else {

       if ($rootScope.user.verified) {
         $scope.show = function() {
           $ionicLoading.show({
             template: 'Wird geladen..',
             hideOnStateChange: true
           });
         };

         viewFactory.callVote = "true";
         $state.go('app.business');
       } else {
         $ionicPopup.alert({
           title: 'Oh nein!',
           template: 'Du musst dich erst verifizieren, um voten zu können!'
         });

       }

     }
   };


   $scope.editVote = function() {
     if ($scope.currentUserSignedIn === false) {
       $ionicPopup.alert({
         title: 'Oh nein!',
         template: 'Du musst dich einloggen, um das sehen zu können!'
       });
       return;
     } else {
       $scope.show = function() {
         $ionicLoading.show({
           template: 'Wird geladen..',
           hideOnStateChange: true
         });
       };

       viewFactory.editVote = "true";
       $state.go('app.business');
     }
   };

   //-----------------------------------------END APPCTRL-----------------------------------------

 });

 votex.filter('iif', function() {

   return function(input, trueValue, falseValue) {
     return input ? trueValue : falseValue;
   };

 })



 ;
