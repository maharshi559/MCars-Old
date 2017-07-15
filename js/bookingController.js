/**
 * Created by Dad on 7/3/2017.
 */
/**
 * Created by Samuel on 6/25/2017.
 */
mcarApp.controller('bookingController',['$scope','$http','$log',function($scope,$http,$log) {
    $scope.billing=true;
    $scope.btnName="Confirm";

    $scope.current_time = Date();
    console.log($scope.current_time);


    // load Bookings data
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
    $scope.statusModal =function(booking_id,status,number,car_id,customer_id,pickup_date,dropoff_date,price_day,extra_hr){
        $scope.booking_id=booking_id;
        $scope.status=status;
        $scope.number=number;
        $scope.car_id=car_id;
        $scope.customer_id =customer_id;
        $scope.pickup_date=pickup_date;
        $scope.dropoff_date=dropoff_date;
        $scope.price_day=price_day;
        $scope.extra_hr=extra_hr;

    }
    $scope.changeStatus =function(){
        if(confirm("Are you sure you want to change status to "+ $scope.status  + "?")){
        $http.post('./php/changeStatus.php',{'status':$scope.status,'booking_id':$scope.booking_id,'number':$scope.number,'car_id': $scope.car_id,'customer_id': $scope.customer_id,
            'pickup_date':$scope.pickup_date,'dropoff_date':$scope.dropoff_date,'price_day':$scope.price_day,'extra_hr': $scope.extra_hr, 'current_time': $scope.current_time
        })

            .success(function(data){
                 if($scope.status =='Billing'){
                     $scope.billing=false;
                     $http.post('./php/loadBillingsPin.php', {'booking_id': $scope.booking_id})

                         .success(function(data){
                             $scope.billings=data;
                             $scope.pick_drop = $scope.billings[0].pick_drop;
                             $scope.return_drop = $scope.billings[0].return_drop;

                             if($scope.return_drop < 0){
                                $scope.extra_hours =  0;
                             }
                             else {
                                 $scope.extra_hours = Math.ceil($scope.return_drop - $scope.pick_drop);
                             }

                         })
                         .error(function(err){
                             $log.error(err);
                         });
                 }
                $scope.loadBookings();
            })
            .error(function(err){
                $log.error(err);
            });
        }

    }

       // return to bookings list data

    $scope.returnBookings =function(){

        $scope.billing=true;

    }
    // confirmBooking

    $scope.confirmBooking =function(booking_id){


        $scope.booking_id=booking_id;
        $http.post('./php/changeStatus.php', {'book_id': $scope.booking_id,'btnName':$scope.btnName})

            .success(function(data){
                $scope.billings=data;

            })
            .error(function(err){
                $log.error(err);
            });


    }


}]);