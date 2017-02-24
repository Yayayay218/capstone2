'use strict';

angular.module('bmcApp')

    .controller('headerCtrl', function ($scope) {
        $scope.categories = ['Patio Furniture', 'Indoor', 'Dining Room', 'Outdoor Benches', 'Chair Lounges', 'Sofas and Loveseats'];

        $scope.currencies = ['VND', 'EUR'];
    });
