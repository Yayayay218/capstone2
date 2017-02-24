'use strict';

var bmcApp = angular.module('bmcApp', ['ui.router']);
bmcApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            views: {
                'header': {
                    templateUrl: 'scripts/components/header/header.html'
                },

                'footer': {
                    templateUrl: 'scripts/components/footer/footer.html'
                }
            }
        });
});


