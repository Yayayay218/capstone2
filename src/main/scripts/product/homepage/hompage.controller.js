'use strict';

angular.module('bmcApp')

    .controller('homePageCtrl', function ($scope) {
        /*Declare Banner Object*/
        $scope.banner = {
            title: 'best furniture source in vietnam',
            description: 'pay local prices. ship anywhere',
            img: '',
            button: 'request a quote'
        };
    });
