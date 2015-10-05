 angular
 			.module('starter.feedbackCtrl', ['ngCordova'])
			.controller("feedbackCtrl", function ($cordovaEmailComposer,$ionicPlatform) {

   $ionicPlatform.ready(function() {
    cordova.plugins.email.open({
    to: 'admin@vote-x.net',
    subject: 'Hier können Sie einen Betreff eingeben ',
    body: 'Ich freue mich von Ihnen zu hören =)',
    isHtml: true
});   
     });

  $cordovaEmailComposer.isAvailable().then(function() {
     console.log('email is available')
   // is available
 }, function () {
    console.log('email is NOT available')
   // not available
 });

  var email = {
    to: 'admin@vote-x.net',
    subject: 'Hier können Sie einen Betreff eingeben ',
    body: 'Ich freue mich von Ihnen zu hören =)',
    isHtml: true
  };

 $cordovaEmailComposer.open(email).then(null, function () {
   console.log('user cancelled email')
   // user cancelled email
 });
});