/**
 * Created by Samuel on 6/25/2017.
 */
mcarApp.controller('rentController', ['$scope','$filter','$http','$log',function($scope,$filter,$http,$log) {
    $scope.btnName="SEARCH";
    $scope.btnType=true;
    $scope.capacity=1;
    $scope.formDisplay=false;
   // $scope.carListDisplay=true;
    $scope.disableSearchForm = false;
    $scope.customer=-1;
    $scope.detailed=false;
    // $scope.search=false;

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
    $scope.customerForm =function(car_id,vendor_id,name,cartype){
        $scope.carListDisplay=false;
        $scope.formDisplay=true;
        $scope.btnType=false;
        $scope.disableSearchForm = true;
        $scope.search=false;
        var pickupDate = $("#pickup_date").data("kendoDateTimePicker");
        var dropoffDate = $("#dropoff_date").data("kendoDateTimePicker");
        pickupDate.readonly();
        dropoffDate.readonly();
        $scope.car_id=car_id;
        $scope.vendor_id=vendor_id;
        $scope.carName=name;
        $scope.carType=cartype;
        $scope.detailcustomer=[{'first_name':null,'last_name':null,'dob':new Date(1994-10-1)}];


    }
    $scope.customerAutofill =function(){

        $http.post('./php/loadAutoCustomers.php',{'customer_id':$scope.customer})

            .success(function(data){
                $scope.detailcustomer=data;
                console.log(data);
            })
            .error(function(err){
                $log.error(err);
            });

    }

    //Search Form
    $scope.searchForm =function() {
        $scope.formDisplay=false;
        $scope.btnType=true;
        $scope.disableSearchForm = false;
    }
    //Previous Search
    $scope.presearchForm =function() {
        var pickupDate = $("#pickup_date").data("kendoDateTimePicker");
        var dropoffDate = $("#dropoff_date").data("kendoDateTimePicker");
        pickupDate.readonly(false);
        dropoffDate.readonly(false);
        $scope.carListDisplay=true;
        $scope.formDisplay=false;
        $scope.btnType=true;
        $scope.disableSearchForm =false;

        $scope.btnName="SEARCH";


    }
    //Preview Booking
    $scope.previewBooking =function(){
           $scope.detailed=true;
        $scope.search=true;
    }
    //Previous Form
    $scope.previousForm =function(){
        $scope.detailed=false;
        $scope.search=false;


    }
    // Confirm Booking
    $scope.confirmBooking =function(){
        // var search={'pickup_date':$scope.pickup_date,'dropoff_date':$scope.dropoff_date,'capacity':$scope.capacity};
        // productService.addProduct(search);

            $http.post('./php/confirmpushData.php', {
                'pickup_date': $scope.pickup_date,
                'dropoff_date': $scope.dropoff_date,
                'car_id': $scope.car_id,
                'vendor_id': $scope.vendor_id,
                'customer_id': $scope.customer,
                'capacity': $scope.capacity,
                'cartype': $scope.cartype,
                'firstname': $scope.detailcustomer[0].first_name,
                'lastname': $scope.detailcustomer[0].last_name,
                'address': $scope.detailcustomer[0].address,
                'city': $scope.detailcustomer[0].city,
                'pincode': $scope.detailcustomer[0].pincode,
                'email': $scope.detailcustomer[0].email,
                'phonenumber': $scope.detailcustomer[0].phone_number,
                'dob': $scope.detailcustomer[0].dob,
                'driving': $scope.detailcustomer[0].driving_no,
                'booking_id': $scope.booking_id
            })
                .success(function (data) {
                    alert(data);

                    $scope.fname = null;
                    $scope.lname = null;
                    $scope.address = null;
                    $scope.city = null;
                    $scope.pincode = null;
                    $scope.email = null;
                    $scope.phonenumber = null;
                    $scope.dob = null;
                    $scope.driving = null;
                })
                .error(function (err) {
                    $log.error(err);
                });

    }
    // load customers data
    $scope.loadCustomers =function(id){
        $http.get('./php/loadCustomers.php')

            .success(function(data){
                $scope.customers=data;
            })
            .error(function(err){
                $log.error(err);
            });

    }

}]);
