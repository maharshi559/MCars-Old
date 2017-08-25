/**
 * Created by SamuelKomera on 7/13/2017.
 */

mcarApp.controller('billingController',['$scope','$http','$log','$location',function($scope,$http,$log) {

    // load Billings data
    $scope.loadBillings =function(){
        $http.get('./php/loadBillings.php')

            .success(function(data){
                $scope.billings=data;
            })
            .error(function(err){
                $log.error(err);
            });

    }
    $scope.statusModal =function(booking_id,billing_status){
        $scope.booking_id=booking_id;
        $scope.status=billing_status;
        console.log($scope.status);
        console.log($scope.booking_id);

    }
    $scope.changeStatus =function(){

        console.log($scope.status);
        console.log($scope.booking_id);

        if(confirm("Are you sure you want to change status to "+ $scope.status  + "?")){
            $http.post('./php/changeStatus.php',{'status':$scope.status,'booking_id':$scope.booking_id })

                .success(function(data){
                    console.log($scope.status);
                    console.log($scope.booking_id);
                    $scope.loadBillings();
                             })
                .error(function(err){
                    $log.error(err);
                });
        }

    }

}]);