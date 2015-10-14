// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var votex = angular.module('starter', ['ionic','starter.controllers','starter.loginCtrl','starter.menuCtrl','starter.profileCtrl','starter.premiumCtrl',
                                        'starter.businessCtrl', 'ngCordova','ionic.ion.imageCacheFactory', 'starter.agbCtrl', 'pascalprecht.translate'])

votex.run(function($ionicPlatform, $cordovaSplashscreen, $cordovaStatusbar) {
  $ionicPlatform.ready(function() { 
  
    if (window.cordova && window.cordova.plugins) {
            if (window.cordova.plugins.Keyboard) {
              cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
              cordova.plugins.Keyboard.disableScroll(true);
            }
        }
  if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      $cordovaStatusbar.overlaysWebView(true);
      $cordovaStatusbar.styleHex('#DFDFDF');
       
    }
  
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)


  });
})


.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.scrolling.jsScrolling(false);
  $ionicConfigProvider.views.maxCache(10);


  $stateProvider

  .state('app', {
    url: '/votex',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'

  })

  .state('app.home', {
    url: '/home',
    controller: 'AppCtrl',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',

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

  .state('app.premium', {
    url: '/premium',
    controller: 'premiumCtrl',
    views: {
      'menuContent': {
        templateUrl: 'templates/premium.html'
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


  $urlRouterProvider.otherwise('/votex/home');
  


});
