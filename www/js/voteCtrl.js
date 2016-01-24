 angular.module('starter.voteCtrl', ['firebase', 'ionicLazyLoad', 'ui.bootstrap', 'monospaced.elastic'])
   .controller("voteCtrl", function($scope, $rootScope, $http, $firebaseArray, $ionicLoading, $ionicSlideBoxDelegate, $ionicPopup, $timeout) {

     // Kommentar Funktion


     var d = new Date();
     $rootScope.imgUrl = null;
     var minutes = d.getMinutes();
     var hours = d.getHours();
     var day = d.getDate();
     var month = d.getMonth();
     var year = d.getFullYear();


     var place_votes = new Firebase("https://vote-x.firebaseio.com/places/" + $rootScope.placeObject.place_id);

     $rootScope.vote_images = {
       src: null
     };

     $rootScope.description = {
       text: " "
     };
     $rootScope.service = {
       points: 3
     };
     $rootScope.location = {
       points: 3
     };
     $rootScope.quality = {
       points: 3
     };
     $rootScope.best_value = {
       points: 3
     };
     $rootScope.ambiente = {
       points: 3
     };

     // Get Vote info

     place_votes.once("value", function(placeData) {
       var placeInfo = placeData.val();
       if (placeInfo !== null) {
         $rootScope.total_ambience_points = placeInfo.total_ambience_points;
         $rootScope.total_best_value_points = placeInfo.total_best_value_points;
         $rootScope.total_employee_points = placeInfo.total_employee_points;
         $rootScope.total_location_points = placeInfo.total_location_points;
         $rootScope.total_quality_points = placeInfo.total_quality_points;
         $rootScope.total_votes = placeInfo.total_votes;
       } else {
         $rootScope.total_ambience_points = 0;
         $rootScope.total_best_value_points = 0;
         $rootScope.total_employee_points = 0;
         $rootScope.total_location_points = 0;
         $rootScope.total_quality_points = 0;
         $rootScope.total_votes = 0;
       }
     });


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




     $scope.vote = function() {

       //calculate new figures
       $rootScope.total_ambience_points = $rootScope.total_ambience_points + $rootScope.ambiente.points;
       $rootScope.total_best_value_points = $rootScope.total_best_value_points + $rootScope.best_value.points;
       $rootScope.total_employee_points = $rootScope.total_employee_points + $rootScope.service.points;
       $rootScope.total_location_points = $rootScope.total_location_points + $rootScope.location.points;
       $rootScope.total_quality_points = $rootScope.total_quality_points + $rootScope.quality.points;
       $rootScope.total_votes = $rootScope.total_votes + 1;

       $rootScope.avg_ambience_points = $rootScope.total_ambience_points / $rootScope.total_votes;
       $rootScope.avg_best_value_points = $rootScope.total_best_value_points / $rootScope.total_votes;
       $rootScope.avg_employee_points = $rootScope.total_employee_points / $rootScope.total_votes;
       $rootScope.avg_location_points = $rootScope.total_location_points / $rootScope.total_votes;
       $rootScope.avg_quality_points = $rootScope.total_quality_points / $rootScope.total_votes;


       $rootScope.avg_vote_points = ($rootScope.avg_ambience_points + $rootScope.avg_best_value_points + $rootScope.avg_employee_points + $rootScope.avg_location_points + $rootScope.avg_quality_points) / 5;



       if ($rootScope.description.text === undefined) {


         $ionicPopup.alert({
           title: 'Text zu kurz',
           template: 'Ihre Bewertung muss mindestens 10 Zeichen enthalten!'
         });

       } else {


         // push vote
         // push Total points each categorie + voteNumber
         place_votes.update({
           'total_ambience_points': $rootScope.total_ambience_points,
           'total_best_value_points': $rootScope.total_best_value_points,
           'total_employee_points': $rootScope.total_employee_points,
           'total_location_points': $rootScope.total_location_points,
           'total_quality_points': $rootScope.total_quality_points,
           'total_votes': $rootScope.total_votes,
           'avg_ambience_points': $rootScope.avg_ambience_points,
           'avg_best_value_points': $rootScope.avg_best_value_points,
           'avg_employee_points': $rootScope.avg_employee_points,
           'avg_location_points': $rootScope.avg_location_points,
           'avg_quality_points': $rootScope.avg_quality_points,
           'avg_vote_points': $rootScope.avg_vote_points
         });

         if ($rootScope.vote_images.src !== undefined && $rootScope.vote_images.src !== null) {
           $ionicLoading.show({
             template: '<ion-spinner icon="dots" class="spinner-assertive"></ion-spinner>'
           });

           // amazon upload

           var params = {
             Bucket: $rootScope.creds.bucket,
             Key: "places/" + $rootScope.placeObject.place_id + "/" + $rootScope.user.uid + ".txt",
             ContentType: "text/plain",
             Body: $rootScope.vote_images.src
           };
           $rootScope.imgUrl = params.Key;

           $rootScope.bucket.upload(params, function(err, data) {
             if (err) {
               console.log(err);
               console.log('Error uploading data: ', data);
             } else {

               var imageRef = new Firebase("https://vote-x.firebaseio.com/places/" + $rootScope.placeObject.place_id);
               imageRef.child('images').child($rootScope.user.uid).update({
                 'placeImg': $rootScope.imgUrl
               });


               console.log('succesfully uploaded the image!');

             }
           });
           // Amazon upload end

           // Push new vote
           var votePusher = place_votes.child("votes").push({
             vote_nr: $rootScope.total_votes,
             voter_uid: $rootScope.userInfo.uid,
             vote_time: hours + ":" + minutes + " " + day + "/" + (month + 1) + "/" + year,
             vote_utime: Firebase.ServerValue.TIMESTAMP,
             reports: 0,
             description: $rootScope.description.text,
             vote_images: $rootScope.placeObject.place_id,
             vote_points: ($rootScope.location.points + $rootScope.service.points + $rootScope.quality.points + $rootScope.best_value.points + $rootScope.ambiente.points) / 5,
             vote_location_points: $rootScope.location.points,
             vote_employees_points: $rootScope.service.points,
             vote_img: $rootScope.imgUrl,
             vote_quality_points: $rootScope.quality.points,
             vote_best_value_points: $rootScope.best_value.points,
             vote_ambience_points: $rootScope.ambiente.points,
             vote_upvotes: 0
           });
           var voteHistoryRef = new Firebase("https://vote-x.firebaseio.com/users/" + $rootScope.userInfo.uid);

           voteHistoryRef.child("vote_history").child($rootScope.placeObject.place_id).set(votePusher.key());
           $rootScope.voted.is = true;

           var voteCounterRef = new Firebase("https://vote-x.firebaseio.com/users/" + $rootScope.userInfo.uid);

           voteCounterRef.update({
             votes: ($rootScope.user.amountVotes + 1)
           });
           $rootScope.user.amountVotes = $rootScope.user.amountVotes + 1;


           $ionicLoading.hide();
           $ionicPopup.alert({
             title: 'Erfolgreich gevotet',
             template: 'Ihre Bewertung wurde erfolgreich übermittelt!'
           });


           $rootScope.checkIfSecondSlide.is = false;
           $scope.myPopup.close();


         } else {
           $ionicLoading.show({
             template: '<ion-spinner icon="dots" class="spinner-assertive"></ion-spinner>'
           });

           // Push new vote
           var votePusher = place_votes.child("votes").push({
             vote_nr: $rootScope.total_votes,
             voter_uid: $rootScope.userInfo.uid,
             vote_time: hours + ":" + minutes + " " + day + "/" + (month + 1) + "/" + year,
             vote_utime: Firebase.ServerValue.TIMESTAMP,
             reports: 0,
             description: $rootScope.description.text,
             vote_points: ($rootScope.location.points + $rootScope.service.points + $rootScope.quality.points + $rootScope.best_value.points + $rootScope.ambiente.points) / 5,
             vote_location_points: $rootScope.location.points,
             vote_employees_points: $rootScope.service.points,
             vote_img: $rootScope.imgUrl,
             vote_quality_points: $rootScope.quality.points,
             vote_best_value_points: $rootScope.best_value.points,
             vote_ambience_points: $rootScope.ambiente.points,
             vote_upvotes: 0
           });
           var voteCounterRef = new Firebase("https://vote-x.firebaseio.com/users/" + $rootScope.userInfo.uid);

           voteCounterRef.update({
             votes: ($rootScope.user.amountVotes + 1)
           });
           $rootScope.user.amountVotes = $rootScope.user.amountVotes + 1;

           var voteHistoryRef = new Firebase("https://vote-x.firebaseio.com/users/" + $rootScope.userInfo.uid);

           voteHistoryRef.child("vote_history").child($rootScope.placeObject.place_id).set(votePusher.key());



           $rootScope.voted.is = true;

           $ionicLoading.hide();

           $ionicPopup.alert({
             title: 'Erfolgreich gevotet',
             template: 'Ihre Bewertung wurde erfolgreich übermittelt!'
           });
           $rootScope.checkIfSecondSlide.is = false;
           $scope.myPopup.close();
         }
       }

       //------------------------ VOTE END ------------------------
     };
     $timeout(function() {
       $ionicSlideBoxDelegate.$getByHandle('vote').enableSlide(false);
     });





     $rootScope.showInfo = function() {

       $rootScope.total = ($rootScope.best_value.points + $rootScope.service.points + $rootScope.quality.points + $rootScope.location.points + $rootScope.ambiente.points) / 5;
       $rootScope.checkIfSecondSlide.is = true;
       $ionicSlideBoxDelegate.$getByHandle('vote').next();
       $ionicSlideBoxDelegate.$getByHandle('vote').update();
     };




   });
