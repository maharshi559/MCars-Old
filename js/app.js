var mcarApp= angular.module('mcarApp',['ngRoute']);

// configure our routes
mcarApp.config(function($routeProvider) {
    $routeProvider

    // route for the home page
        .when('/', {
            templateUrl : 'template/home.html',
            controller  : 'mainController'
        })

        // route for the booking page
        .when('/booking', {
            templateUrl : 'template/booking.html',
            controller  : 'bookingController'
        })
        // route for the Rent page
        .when('/rent', {
            templateUrl : 'template/rent.html',
            controller  : 'rentController'
        })

        // route for the billing page
        .when('/billing', {
        templateUrl : 'template/billing.html',
        controller  : 'billingController'
         })
        .when('/vendor', {
            templateUrl : 'template/vendor.html',
            controller  : 'vendorController'
        })
        .when('/customer', {
            templateUrl : 'template/customer.html',
            controller  : 'customerController'
        })
        .when('/car', {
            templateUrl : 'template/car.html',
            controller  : 'carController'
        })
        .when('/addcar', {
            templateUrl : 'template/addcar.html',
            controller  : 'addcarController'
        })
        .when('/reports', {
            templateUrl : 'template/reports.html',
            controller  : 'reportController'
        })
        .when('/manage', {
            templateUrl : 'template/manage.html',
            controller  : 'manageController'
        })
        .when('/confirm', {
            templateUrl : 'template/confirm.html',
            controller  : 'confirmController'
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


mcarApp.controller('reportsController', function($scope) {
    $scope.message = '';
});
mcarApp.controller('manageController', function($scope) {
    $scope.message = '';
});