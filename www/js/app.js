// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var votex = angular.module('starter', ['ionic','firebase','starter.controllers', 'starter.profileCtrl','ui.bootstrap', 'ngCordova','ngMessages','ionic.ion.imageCacheFactory'])

votex.run(function($ionicPlatform, $cordovaSplashscreen, $cordovaStatusbar) {
  $ionicPlatform.ready(function() {
    
    

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
      
    }
    if(window.Statusbar) {
      if ($ionicPlatform.isAndroid()) {
      StatusBar.overlaysWebView(false);
      Statusbar.backgroundColorByHexString("#A93028") 
      }
      else {
        StatusBar.styleLightContent();
              }
    }
  });
})


votex.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.views.maxCache(5);


  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',

  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',

      }
    },
    reload: true
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
    controller: 'AppCtrl'
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
    abstract: true,
    templateUrl: "templates/business.html",
    controller: 'AppCtrl'
  })
  

  $urlRouterProvider.otherwise('/app/home');
  


});