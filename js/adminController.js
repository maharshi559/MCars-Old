/**
 * Created by Maharshi on 7/16/2017.
 */
mcarApp.controller('adminController',['$scope','$http','$log',function($scope,$http,$log) {

    $scope.loadBookings =function(){
        $http.get('./php/loadBookings.php')

            .success(function(data){
                $scope.bookings=data;
                // console.log($scope.bookings);
            })
            .error(function(err){
                $log.error(err);
            });

    }


}]);

mcarApp.filter('reverse', function() {
    return function(items) {
        return items.slice().reverse();
    };
});