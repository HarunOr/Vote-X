// Ionic Starter App

//LaunchmyApp - UrlSchemeNavigator
var handleOpenURL = function(url) {
    alert("RECEIVED URL: " + url);
    window.localStorage.setItem("external_load",url);
};


// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var votex = angular.module('starter', ['ionic','starter','starter.controllers','starter.loginCtrl','starter.menuCtrl','starter.profileCtrl', 
                                        'starter.voteCtrl','starter.messageBoxCtrl','starter.messageCtrl','starter.editVoteCtrl','starter.userCtrl','ngCordova','ionic.ion.imageCacheFactory', 'starter.agbCtrl',
                                        'starter.vote_historyCtrl','angular-progress-button-styles','ngMap',
                                        'google.places','starter.searchHistoryCtrl'])

votex.run(function($ionicPlatform, $cordovaSplashscreen, $cordovaStatusbar, $ImageCacheFactory, $rootScope, $location) {
  $ionicPlatform.ready(function() { 
    
    $rootScope.placeObject;
    $rootScope.votexObject;
    $rootScope.checkIfSecondSlide = {is: false };
    $rootScope.userInfo;
    $rootScope.user = {username: "", level: "", verified:"", ownProfie:"", ownProfileImage:"", memberSince:"", contacts:"", upvotePoints: ""};
    
    $rootScope.voteUpdater = {
        avg_points:null,
        ambiente_avg:null,
        best_value_avg:null,
        service_avg:null,
        location_avg:null,
        quality_avg:null
    };
    $rootScope.voteKey = {
        key : null
    }
    $rootScope.userImg;
    
    
    
           if(ionic.Platform.isWebView()){
           screen.lockOrientation('portrait'); 
            
        }
      
      
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
        'img/buttonRestaurant.png',
        'img/buttonBar.png',
        'img/buttonCoffee.png',
        'img/buttonClub.png',
        'img/profileBg.png',
        'img/modal1_opt-compressor.jpg',
        'img/background_opt-compressor.jpg',
        'img/noimage.jpg',
        'img/standard_profileImg.jpg'		
         ]).then(function(){

    },function(failed){
        
    });
		
		
     
    
  
    if (window.cordova && window.cordova.plugins && window.StatusBar) {
            if (window.cordova.plugins.Keyboard) {
			  $cordovaStatusbar.overlaysWebView(true);
      		  $cordovaStatusbar.styleHex('#DFDFDF');
              cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
              cordova.plugins.Keyboard.disableScroll(false)
              
            }
        }
        
        if(typeof window.localStorage.getItem("external_load") !== "undefined"){
            $location.path("/");
        }

	  // allow user rotate      
        if(ionic.Platform.isWebView()){
           screen.unlockOrientation();
            
        }

  });
})


.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
 
  if (!ionic.Platform.isIOS()) {
    $ionicConfigProvider.scrolling.jsScrolling(false);
  }

// ------------------------


	$ionicConfigProvider.views.maxCache(7);
	
	
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'

  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'AppCtrl',
      }
    }
  })

  .state('app.map', {
    url: '/map',
    views: {
      'menuContent': {
        templateUrl: 'templates/karte.html'
      }
    }
  })

  .state('app.login', {
    url: "/login",
    abstract: true,
    templateUrl: "templates/login.html",
    controller: 'loginCtrl'
  })

  .state('app.register', {
  url: "/register",
  views: {
    'menuContent': {
      templateUrl: "templates/register.html"
    }
  }
})


  .state('app.searchHistory', {
    url: "/searchHistory",
    cache: true,
    views: {
      'menuContent': {
        templateUrl: "templates/searchHistory.html",
        controller: "searchHistoryCtrl"
      }
    }
  })

  .state('app.forgot', {
    url: "/forgot",
    controller: 'loginCtrl',
    views: {
      'menuContent': {
        templateUrl: "templates/forgot.html"
      }
    }
  })

  .state('app.profile', {
    url: "/profile",
    cache: false,
    controller: "profileCtrl",
    views: {
      'menuContent': {
        templateUrl: "templates/profile.html"
      }
    }
  })
  
  .state('app.business', {
    url: "/business",
  views: {
      'menuContent': {
        templateUrl: "templates/business.html",
            controller: 'businessCtrl'
      }
    }
  })

  .state('app.trends', {
    url: '/trends',
    controller: 'AppCtrl',
    views: {
      'menuContent': {
        templateUrl: 'templates/trends.html'
      }
    }
  })
  


    .state('app.feedback', {
    url: '/feedback',
    views: {
      'menuContent': {
        templateUrl: 'templates/feedback.html'
      }
    }
  })
  
  .state('app.agb', {
    url: '/agb',
    views: {
      'menuContent': {
        templateUrl: 'templates/agb/agb.html',
        controller: 'agbCtrl'
      }
    }
  })
  
.state('app.rooms', {
    url: '/rooms',
    views: {
        'tab-rooms': {
            templateUrl: 'templates/rooms.html',
            controller: 'RoomsCtrl'
        }
    }
})

.state('app.chat', {
    url: '/chat',
    views: {
        'tab-chat': {
            templateUrl: 'templates/chat.html',
            controller: 'ChatCtrl'
        }
    }
})

  .state('app.vote', {
    url: "/vote",
    abstract: true,
    templateUrl: "templates/vote.html"
  })
  
   .state('app.editVote', {
    url: "/editVote",
    abstract: true,
    templateUrl: "templates/editVote.html"
  }) 
  
     .state('app.user', {
    url: "/user",
    templateUrl: "templates/user.html",
    controller: 'userCtrl'
  }) 

  .state('app.vote_history', {
    url: '/vote_history',
    views: {
      'menuContent': {
        templateUrl: 'templates/vote_history.html',
        controller: 'vote_historyCtrl'
      }
    }
  })
  
    .state('app.businessMap', {
    url: "/businessMap",
    abstract: true,
    templateUrl: "templates/businessMap.html",
    controller: 'businessCtrl'
  })

  .state('app.messages', {
    url: '/messages',
    views: {
      'menuContent': {
        templateUrl: 'templates/messages.html',
        controller: 'messageCtrl'
      }
    }
  })

  .state('app.messageBox', {
    url: '/messageBox',
    views: {
      'menuContent': {
        templateUrl: 'templates/messageBox.html',
        controller: 'messageBoxCtrl'
      }
    }
  })



  $urlRouterProvider.otherwise('/app/home');
  


})


;

