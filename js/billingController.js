/**
 * Created by SamuelKomera on 7/13/2017.
 */

mcarApp.controller('billingController',['$scope','$http','$log','$location',function($scope,$http,$log,$location) {

    // load Billings data
    $scope.loadBillings =function(){
        $http.get('./php/loadBillings.php')

            .success(function(data){
                $scope.billings=data;
            })
            .error(function(err){
                $log.error(err);
            });
        $scope.total_amount = function () {

        }
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

}]);