 angular.module('starter.editVoteCtrl', ['firebase', 'ui.bootstrap'])
   .controller("editVoteCtrl", function($scope, $http, $rootScope, $firebaseArray, $state, $ionicLoading, $ionicSlideBoxDelegate, $ionicPopup, $timeout) {

     // Kommentar Funktion

     var getVoteRef = new Firebase("https://vote-x.firebaseio.com/users/" + $rootScope.userInfo.uid + "/vote_history/" + $rootScope.placeObject.place_id);

     var changeAmountVoteRef = new Firebase("https://vote-x.firebaseio.com/users/" + $rootScope.userInfo.uid + "/votes");

     $scope.removeVote = function() {

       //change number of votes of user

       changeAmountVoteRef.once("value", function(voteSnap) {
         var amountVotes = voteSnap.val();
         amountVotes = amountVotes - 1;
         var userRef = new Firebase("https://vote-x.firebaseio.com/users/" + $rootScope.userInfo.uid);
         userRef.update({
           'votes': amountVotes
         });

       });



       getVoteRef.once("value", function(snapshot) {
         var votedPlaceRef = new Firebase("https://vote-x.firebaseio.com/places/" + snapshot.key() + "/votes/" + snapshot.val());
         votedPlaceRef.remove();
         getVoteRef.remove();
         $state.go('app.home');

       });

       var place_votes = new Firebase("https://vote-x.firebaseio.com/places/" + $rootScope.placeObject.place_id + "/votes");
       place_votes.once("value", function(snapshot) {

         $scope.totalvotes = snapshot.numChildren();
         if ($scope.totalvotes === undefined || $scope.totalvotes === 0) {
           $scope.totalvotes = 0;
           var placeRef = new Firebase("https://vote-x.firebaseio.com/places/" + $rootScope.placeObject.place_id);
           placeRef.update({
             avg_ambience_points: 0,
             avg_best_value_points: 0,
             avg_employee_points: 0,
             avg_location_points: 0,
             avg_quality_points: 0,
             avg_vote_points: 0
           });

           $scope.myPopup.close();
           $ionicPopup.alert({
             title: 'Entfernt!',
             template: 'Ihre Bewertung wurde erfolgreich entfernt'
           });
         } else {
           snapshot.forEach(function(childSnapshot) {

             $scope.votexRatingCalc = null;
             $scope.temp = 0;
             $scope.ambiente_temp = 0;
             $scope.best_value_temp = 0;
             $scope.avgService_temp = 0;
             $scope.location_temp = 0;
             $scope.quality_temp = 0;

             //Nochmal die Votes berechnen
             //1. Gesamtdurchschnittswertung
             var avgPointRef = place_votes.child(childSnapshot.key()).child('vote_points');

             avgPointRef.once("value", function(data) {
               $scope.avg_points = data.val() + $scope.temp;
               $scope.temp = $scope.avg_points;

               $rootScope.voteUpdater.avg_points = $scope.avg_points;
             });

             //2. Gesamtdurchschnitt Ambiente Wertung
             var avgAmbienteRef = place_votes.child(childSnapshot.key()).child('vote_ambience_points');

             avgAmbienteRef.once("value", function(data) {

               $scope.avg_ambience_points = data.val() + $scope.ambiente_temp;
               $scope.ambiente_temp = $scope.avg_ambience_points;
               $rootScope.voteUpdater.ambiente_avg = $scope.avg_ambience_points;
             });

             //3. Gesamtdurchschnitt Preis/Leistung Wertung

             var avgBestValueRef = place_votes.child(childSnapshot.key()).child('vote_best_value_points');

             avgBestValueRef.once("value", function(data) {

               $scope.best_value_points = data.val() + $scope.best_value_temp;
               $scope.best_value_temp = $scope.best_value_points;
               $rootScope.voteUpdater.best_value_avg = $scope.best_value_points;
             });

             //4. Gesamtdurchschnitt Service Wertung
             var avgServiceRef = place_votes.child(childSnapshot.key()).child('vote_employees_points');

             avgServiceRef.once("value", function(data) {

               $scope.avgService_points = data.val() + $scope.avgService_temp;
               $scope.avgService_temp = $scope.avgService_points;
               $rootScope.voteUpdater.service_avg = $scope.avgService_points;

             });
             //5. Gesamtdurchschnitt Location Wertung
             var avgLocationRef = place_votes.child(childSnapshot.key()).child('vote_location_points');

             avgLocationRef.once("value", function(data) {

               $scope.location_points = data.val() + $scope.location_temp;
               $scope.location_temp = $scope.location_points;
               $rootScope.voteUpdater.location_avg = $scope.location_points;

             });

             //6. Gesamtdurchschnitt Quality Wertung
             var avgQualityRef = place_votes.child(childSnapshot.key()).child('vote_quality_points');

             avgQualityRef.once("value", function(data) {

               $scope.quality_points = data.val() + $scope.quality_temp;
               $scope.quality_temp = $scope.quality_points;
               $rootScope.voteUpdater.quality_avg = $scope.quality_points;
             });
           });

           $timeout(function() {
             var placeRef2 = new Firebase("https://vote-x.firebaseio.com/places/" + $rootScope.placeObject.place_id);
             placeRef2.update({
               'avg_ambience_points': ($rootScope.voteUpdater.ambiente_avg) / ($scope.totalvotes),
               'avg_vote_points': ($rootScope.voteUpdater.avg_points) / ($scope.totalvotes),
               'avg_best_value_points': ($rootScope.voteUpdater.best_value_avg) / ($scope.totalvotes),
               'avg_employee_points': ($rootScope.voteUpdater.service_avg) / ($scope.totalvotes),
               'avg_location_points': ($rootScope.voteUpdater.location_avg) / ($scope.totalvotes),
               'avg_quality_points': ($rootScope.voteUpdater.quality_avg) / ($scope.totalvotes)
             });


             $scope.myPopup.close();
             $ionicPopup.alert({
               title: 'Entfernt!',
               template: 'Ihre Bewertung wurde erfolgreich entfernt'
             });
           });
         }
       });


     };


     getVoteRef.once("value", function(snapshot) {
       $rootScope.voteKey.key = snapshot.val();

     });

     $timeout(function() {
       //Bild aufnehmen
       $rootScope.capturePic = function() {

         navigator.camera.getPicture(function(imageData) {
           $rootScope.vote_images.src = imageData;
           $ionicPopup.alert({
             title: 'Bild ausgewählt',
             template: 'Sie haben erfolgreich ein Bild ausgewählt'
           });
         }, function(err) {
           alert("Ups, etwas ist schief gelaufen!" + err);
         }, {
           sourceType: Camera.PictureSourceType.CAMERA,
           correctOrientation: true,
           destinationType: Camera.DestinationType.DATA_URL,
           saveToPhotoAlbum: true
         });


       };

       //Bild aus Gallerie
       $rootScope.selectPic = function() {
         navigator.camera.getPicture(function(imageData) {
           $rootScope.vote_images.src = imageData;
           $ionicPopup.alert({
             title: 'Bild ausgewählt',
             template: 'Sie haben erfolgreich ein Bild ausgewählt'
           });
         }, function(err) {
           alert("Ups, etwas ist schief gelaufen!" + err);
         }, {
           sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
           correctOrientation: true,
           destinationType: Camera.DestinationType.DATA_URL
         });
       };


       var myVoteRef = new Firebase("https://vote-x.firebaseio.com/places/" + $rootScope.placeObject.place_id + "/votes/" + $rootScope.voteKey.key);
       myVoteRef.once("value", function(snapshot) {
         $ionicLoading.show({
           template: '<ion-spinner icon="dots" class="spinner-assertive"></ion-spinner>'
         });
         var data = snapshot.val();
         if(data === null){
           $timeout(function () {


           },1000);
         }
         else{


         $scope.service = {
           points: data.vote_employees_points
         };
         $scope.location = {
           points: data.vote_location_points
         };
         $scope.quality = {
           points: data.vote_quality_points
         };
         $scope.best_value = {
           points: data.vote_best_value_points
         };
         $scope.ambiente = {
           points: data.vote_ambience_points
         };
         $scope.vote_images = {
           src: data.vote_images
         };
         $scope.description = {
           text: data.description
         };

         $scope.total = {
           points: ($scope.service.points + $scope.location.points + $scope.quality.points + $scope.best_value.points + $scope.ambiente.points) / 5
         };
         $ionicSlideBoxDelegate.$getByHandle('editVote').enableSlide(false);
         $ionicLoading.hide();
         }
       });
     }, 1000);



     $scope.showInfo = function() {

       $scope.total = {
         points: ($scope.service.points + $scope.location.points + $scope.quality.points + $scope.best_value.points + $scope.ambiente.points) / 5
       };
       $rootScope.checkIfSecondSlide.is = true;
       $ionicSlideBoxDelegate.$getByHandle('editVote').next();
       $ionicSlideBoxDelegate.$getByHandle('editVote').update();
     };



     $scope.showInfo2 = function() {

       $scope.total = {
         points: ($scope.service.points + $scope.location.points + $scope.quality.points + $scope.best_value.points + $scope.ambiente.points) / 5
       };
       $rootScope.checkIfSecondSlide.is = true;
       $ionicSlideBoxDelegate.$getByHandle('editVote').next();
       $ionicSlideBoxDelegate.$getByHandle('editVote').update();
     };




     //------------ TextArea functions ---------------


     $scope.vote = function() {


       //Leerer Text


       if ($scope.description.text === undefined || $scope.description.text.length < 10 ) {


         $ionicPopup.alert({
           title: 'Text zu kurz',
           template: 'Ihre Bewertung muss mindestends 10 Zeichen enthalten!'
         });

       } else {
         if ($scope.vote_images.src === undefined) {
           $scope.vote_images.src = null;

         }


         // Push new vote
         var myVoteRef = new Firebase("https://vote-x.firebaseio.com/places/" + $rootScope.placeObject.place_id + "/votes/" + $rootScope.voteKey.key);
         var votePusher = myVoteRef.update({
           description: $scope.description.text,
           vote_images: $scope.vote_images.src,
           vote_points: $scope.total.points,
           vote_location_points: $scope.location.points,
           vote_employees_points: $scope.service.points,
           vote_quality_points: $scope.quality.points,
           vote_best_value_points: $scope.best_value.points,
           vote_ambience_points: $scope.ambiente.points
         });




         var place_votes = new Firebase("https://vote-x.firebaseio.com/places/" + $rootScope.placeObject.place_id + "/votes");
         place_votes.once("value", function(snapshot) {

           $scope.totalvotes = snapshot.numChildren();

           snapshot.forEach(function(childSnapshot) {

             $scope.votexRatingCalc = null;
             $scope.temp = 0;
             $scope.ambiente_temp = 0;
             $scope.best_value_temp = 0;
             $scope.avgService_temp = 0;
             $scope.location_temp = 0;
             $scope.quality_temp = 0;

             //Nochmal die Votes berechnen
             //1. Gesamtdurchschnittswertung
             var avgPointRef = place_votes.child(childSnapshot.key()).child('vote_points');

             avgPointRef.once("value", function(data) {
               $scope.avg_points = data.val() + $scope.temp;
               $scope.temp = $scope.avg_points;

               $rootScope.voteUpdater.avg_points = $scope.avg_points;
             });

             //2. Gesamtdurchschnitt Ambiente Wertung
             var avgAmbienteRef = place_votes.child(childSnapshot.key()).child('vote_ambience_points');

             avgAmbienteRef.once("value", function(data) {

               $scope.avg_ambience_points = data.val() + $scope.ambiente_temp;
               $scope.ambiente_temp = $scope.avg_ambience_points;
               $rootScope.voteUpdater.ambiente_avg = $scope.avg_ambience_points;
             });

             //3. Gesamtdurchschnitt Preis/Leistung Wertung

             var avgBestValueRef = place_votes.child(childSnapshot.key()).child('vote_best_value_points');

             avgBestValueRef.once("value", function(data) {

               $scope.best_value_points = data.val() + $scope.best_value_temp;
               $scope.best_value_temp = $scope.best_value_points;

               $rootScope.voteUpdater.best_value_avg = $scope.best_value_points;
             });

             //4. Gesamtdurchschnitt Service Wertung
             var avgServiceRef = place_votes.child(childSnapshot.key()).child('vote_employees_points');

             avgServiceRef.once("value", function(data) {

               $scope.avgService_points = data.val() + $scope.avgService_temp;
               $scope.avgService_temp = $scope.avgService_points;

               $rootScope.voteUpdater.service_avg = $scope.avgService_points;

             });
             //5. Gesamtdurchschnitt Location Wertung
             var avgLocationRef = place_votes.child(childSnapshot.key()).child('vote_location_points');

             avgLocationRef.once("value", function(data) {

               $scope.location_points = data.val() + $scope.location_temp;
               $scope.location_temp = $scope.location_points;

               $rootScope.voteUpdater.location_avg = $scope.location_points;

             });

             //6. Gesamtdurchschnitt Quality Wertung
             var avgQualityRef = place_votes.child(childSnapshot.key()).child('vote_quality_points');

             avgQualityRef.once("value", function(data) {

               $scope.quality_points = data.val() + $scope.quality_temp;
               $scope.quality_temp = $scope.quality_points;

               $rootScope.voteUpdater.quality_avg = $scope.quality_points;
             });
           });
         });
         $timeout(function() {

           var placeRef2 = new Firebase("https://vote-x.firebaseio.com/places/" + $rootScope.placeObject.place_id);

           placeRef2.update({
             'avg_ambience_points': ($rootScope.voteUpdater.ambiente_avg) / ($scope.totalvotes),
             'avg_vote_points': ($rootScope.voteUpdater.avg_points) / ($scope.totalvotes),
             'avg_best_value_points': ($rootScope.voteUpdater.best_value_avg) / ($scope.totalvotes),
             'avg_employee_points': ($rootScope.voteUpdater.service_avg) / ($scope.totalvotes),
             'avg_location_points': ($rootScope.voteUpdater.location_avg) / ($scope.totalvotes),
             'avg_quality_points': ($rootScope.voteUpdater.quality_avg) / ($scope.totalvotes)
           });

           $ionicPopup.alert({
             title: 'Erfolgreich gevotet',
             template: 'Ihre Bewertung wurde erfolgreich übermittelt!'
           });

           $rootScope.checkIfSecondSlide.is = false;
           $scope.myPopup.close();
         }, 1000);
       }


     };
   });
