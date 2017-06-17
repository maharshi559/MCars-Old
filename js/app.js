var mcarApp= angular.module('mcarApp',['ngRoute']);

// configure our routes
mcarApp.config(function($routeProvider) {
    $routeProvider

    // route for the home page
        .when('/', {
            templateUrl : 'home.html',
            controller  : 'mainController'
        })

        // route for the booking page
        .when('/booking', {
            templateUrl : 'booking.html',
            controller  : 'bookingController'
        })

        // route for the billing page
        .when('/billing', {
        templateUrl : 'billing.html',
        controller  : 'billingController'
         })
        .when('/customer', {
            templateUrl : 'customer.html',
            controller  : 'customerController'
        })
        .when('/car', {
            templateUrl : 'car.html',
            controller  : 'carController'
        })
        .when('/addcar', {
            templateUrl : 'addcar.html',
            controller  : 'addcarController'
        })
        .when('/reports', {
            templateUrl : 'reports.html',
            controller  : 'reportController'
        })
        .when('/manage', {
            templateUrl : 'manage.html',
            controller  : 'manageController'
        })


    ;


});

mcarApp.controller('mainController',function($scope){

});

mcarApp.controller('bookingController', function($scope) {
    $scope.message = '';
});

mcarApp.controller('billingController', function($scope) {
    $scope.message = '.';
});
mcarApp.controller('carController', function($scope) {
    $scope.message = '';
});
mcarApp.controller('addcarController', function($scope) {
    $scope.message = '';
});

mcarApp.controller('customerController', function($scope) {
    $scope.message = '';
});
mcarApp.controller('reportsController', function($scope) {
    $scope.message = '';
});
mcarApp.controller('manageController', function($scope) {
    $scope.message = '';
});