var votex = angular
// Momentan keine Funktion
  .module('starter.controllers');
votex.factory('userFactory', function($ionicModal) {

  var viewProfileData = null;

  return {
    setProfileViewer: function(data) {

      viewProfileData = {
                          id: data.voter_uid,
                          img: data.voterImg,
                          name: data.voterName,
                          amountVotes: data.amountVotes,
                          contact: data.contacts,
                          since: data.since,
                          upvotePoints: data.upvotePoints,
                          verified: data.verified
      };

    },

    giveProfileData: function () {
      return viewProfileData;
    },


    showProfile: function (scope) {
      $ionicModal.fromTemplateUrl('templates/user.html', {
        scope: scope,
        animation: 'animated '+'fadeIn',
        hideDelay:920
      }).then(function(modal2) {
        scope.profileViewer = modal2;
        scope.profileViewer.show();
      });
    },


    closeProfile: function (scope) {
      scope.profileViewer.close();
      scope.profileViewer.remove();
    }
  };



});
