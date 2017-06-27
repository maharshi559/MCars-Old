/**
 * Created by Samuel on 6/25/2017.
 */
mcarApp.controller('rentController', ['$scope','$filter','$http','$log',function($scope,$filter,$http,$log) {
    $scope.btnName="SEARCH";
    $scope.btnType=true;
    $scope.capacity=1;
    $scope.formDisplay=false;
    $scope.carListDisplay=true;
    $scope.disableSearchForm = false;
    // $scope.pickup_date=$filter('date')(new Date(2017 ,06 ,29 ),"dd-MM-yyyy");


    // retrive data
    $scope.displayData =function(){

        $http.post('./php/rentpopData.php',{'pickup_date':$scope.pickup_date,'dropoff_date':$scope.dropoff_date,'capacity':$scope.capacity,'cartype':$scope.cartype,'btnName':$scope.btnName})
            .success(function(data){
                $scope.carListDisplay=true;
                $scope.names=data;
                $scope.btnName="SEARCH";
            })
            .error(function(err){
                $log.error(err);
            });

      }
    $scope.customerForm =function(){
        $scope.carListDisplay=false;
        $scope.formDisplay=true;
        $scope.btnType=false;
        $scope.disableSearchForm = true;
        var pickupDate = $("#pickup_date").data("kendoDateTimePicker");
        var dropoffDate = $("#dropoff_date").data("kendoDateTimePicker");
        pickupDate.readonly();
        dropoffDate.readonly();
        $http.post('./php/rentpopData.php',{'pickup_date':$scope.pickup_date,'dropoff_date':$scope.dropoff_date,'capacity':$scope.capacity,'btnName':$scope.btnName})
            .success(function(data){
                $scope.names=data;

            })
            .error(function(err){
                $log.error(err);
            });

    }
    //Search Form
    $scope.searchForm =function(){
        $scope.formDisplay=false;
        $scope.btnType=true;
        $scope.disableSearchForm = false;
    }

    // Confirm Booking
    $scope.confirmBooking =function(){

        $http.post('./php/confirmpushData.php',{'pickup_date':$scope.pickup_date,'dropoff_date':$scope.dropoff_date,'capacity':$scope.capacity,'cartype':$scope.cartype,'firstname':$scope.fname,'lastname':$scope.lname,'address':$scope.address,'city':$scope.city,'pincode':$scope.pincode,'email':$scope.email,
            'phonenumber':$scope.phonenumber,'dob':$scope.dob,'driving':$scope.driving})
            .success(function(data){
                $scope.bookings=data;

            })
            .error(function(err){
                $log.error(err);
            });

    }

}]);
