/**
 * Created by Dad on 7/3/2017.
 */
/**
 * Created by Samuel on 6/25/2017.
 */
mcarApp.controller('bookingController',['$scope','$http','$log',function($scope,$http,$log) {
    console.log("hello");
    // load Bookings data
    $scope.loadBookings =function(){
        console.log("hello");
        $http.get('./php/loadBookings.php')

            .success(function(data){
                $scope.bookings=data;
                console.log(data);
            })
            .error(function(err){
                $log.error(err);
            });
        $scope.units = [
            {'id': 10, 'label': 'test1'},
            {'id': 27, 'label': 'test2'},
            {'id': 39, 'label': 'test3'},
        ]

        $scope.data = {
            'id': 1,
            'unit': 27
        }

        console.log(data.unit);
        console.log(item.id);
    }




}]);