// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var votex = angular.module('starter', ['ionic','starter.controllers','starter.loginCtrl','starter.menuCtrl','starter.profileCtrl', 
                                        'starter.businessCtrl', 'ngCordova','ionic.ion.imageCacheFactory', 'starter.agbCtrl','angular-progress-button-styles',
                                        'starter.searchFactory','ngMap','google.places'])

votex.run(function($ionicPlatform, $cordovaSplashscreen, $cordovaStatusbar, $ImageCacheFactory) {
  $ionicPlatform.ready(function() { 
    
   
      
      
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
        'img/background_opt-compressor.jpg'		
         ]).then(function(){
        console.log("Images done loading!");
    },function(failed){
        console.log("An image filed: "+failed);
    });
		
		
     console.log('VoteX started');   
    
  
    if (window.cordova && window.cordova.plugins && window.StatusBar) {
            if (window.cordova.plugins.Keyboard) {
			  $cordovaStatusbar.overlaysWebView(true);
      		  $cordovaStatusbar.styleHex('#DFDFDF');
              cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
              cordova.plugins.Keyboard.disableScroll(true);
            }
        }

	  
  });
})


.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, progressButtonConfigProvider) {

      //Codrops Button
  progressButtonConfigProvider.profile('testProfile', {
    style: 'shrink',
    direction: 'vertical'
  });
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


  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
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
    templateUrl: "templates/vote.html",
    controller: 'businessCtrl'
  })
  
    .state('app.businessMap', {
    url: "/businessMap",
    abstract: true,
    templateUrl: "templates/businessMap.html",
    controller: 'businessCtrl'
  })



  $urlRouterProvider.otherwise('/app/home');
  


})
;

