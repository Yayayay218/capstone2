'use strict';

var bmcApp = angular.module('bmcApp', ['ui.router']);
bmcApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
    // HOME STATES AND NESTED VIEWS ========================================

        .state('home', {
            url: '/home',
            views: {
                'header@': {
                    templateUrl: 'scripts/components/header/header.html'
                },

                'footer@': {
                    templateUrl: 'scripts/components/footer/footer.html'
                }
            }
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about'
        });

});


