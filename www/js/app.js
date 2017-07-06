// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic-material', 'ionic-native-transitions'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider, $ionicNativeTransitionsProvider, $ionicConfigProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        cache: false,
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })

      .state('login', {
        url: '/login',
        cache: false,
        abstract: false,
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      })
      .state('register', {
        url: '/register',
        cache: false,
        abstract: false,
        templateUrl: 'templates/register.html',
        controller: 'RegisterCtrl'
      })

      .state('app.adventureinfo', {
        url: '/adventureinfo',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/adventureinfo.html',
            controller: 'AdventureInfoCtrl'
          }
        }
      })
      .state('app.adventures', {
        url: '/adventures',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/adventures.html',
            controller: 'AdventuresCtrl'
          }
        }
      })
      .state('app.add_adventure', {
        url: '/add_adventure',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/add_adventure.html',
            controller: 'AddAdventureCtrl'
          }
        }
      })
      .state('app.add_section', {
        url: '/add_section',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/add_section.html',
            controller: 'AddSectionCtrl'
          }
        }
      })
      .state('app.add_players', {
        url: '/add_players',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/add_players.html',
            controller: 'AddPlayersCtrl'
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
    //$urlRouterProvider.otherwise('/app/adventures');
    $ionicConfigProvider.scrolling.jsScrolling(false);
    $ionicConfigProvider.views.maxCache(3);
  });
