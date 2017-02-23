'use strict';

var bmcApp = angular.module('bmcApp', ['ui.router']);
bmcApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
    // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            views: {
                'header': {
                    templateUrl: 'scripts/components/header/header.html'
                },

                'content': {
                    templateUrl: 'scripts/product/home-page.html'
                },

                'footer': {
                    templateUrl: 'scripts/components/footer/footer.html'
                }
            }
        })

        // COLLECTIONS PAGE
        .state('home.collections', {
            url: '/collections',
            views: {
                'content@': {
                    templateUrl: 'scripts/product/collections.html'
                }
            }

        })

        // COLLECTION-DETAILS PAGE
        .state('home.collections.collection-details', {
            url: '/collection-details',
            views: {
                'content@': {
                    templateUrl: 'scripts/product/collection-details.html'
                }
            }
        })

        //  PRODUCT-DETAILS PAGE
        .state('home.collections.collection-details.product-details', {
            url: '/product-details',
            views: {
                'content@': {
                    templateUrl: 'scripts/product/product-details.html'
                }
            }
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about'
        });

});


