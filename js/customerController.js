/**
 * Created by Samuel on 6/20/2017.
 */


mcarApp.controller('customerController', ['$scope','$http','$log',function($scope,$http,$log) {
    $scope.btnName="ADD";
    //hidden toggle
    $scope.customerToggle =function() {
        $('#customerInput').slideToggle();
        $("#add").find('i').toggleClass('fa-plus fa-times');
    }

   // Insert data
    $scope.insertData =function(){

        if($scope.fname!= null && $scope.lname!=null && $scope.address!=null && $scope.city!=null && $scope.pincode!=null && $scope.email!=null && $scope.phonenumber!=null && $scope.dob!=null && $scope.driving!=null ){
            console.log($scope.dob);
            $http.post('./php/customerpushData.php',{'firstname':$scope.fname,'lastname':$scope.lname,'address':$scope.address,'city':$scope.city,'pincode':$scope.pincode,'email':$scope.email,
                'phonenumber':$scope.phonenumber,'dob':$scope.dob,'driving':$scope.driving,'btnName':$scope.btnName,'customer_id':$scope.customer_id})
                .success(function(data){
                    alert(data);

                    $scope.fname=null;
                    $scope.lname=null;
                    $scope.address=null;
                    $scope.city=null;
                    $scope.pincode=null;
                    $scope.email=null;
                    $scope.phonenumber=null;
                    $scope.dob=null;
                    $scope.driving=null;
                    $scope.btnName="ADD";
                    $scope.displayData();
                })
                .error(function(err){
                    $log.error(err);
                });
        }

    }
    // retrive data
    $scope.displayData =function(){
        $http.get('./php/customerpopData.php')
            .success(function(data){
                $scope.names=data;
            })
            .error(function(err){
                $log.error(err);
            });

    }
    // update data
    $scope.updateData =function(customer_id,first_name,last_name,address,city,pincode,email,phone_number,dob,driving_no){
         //toggle to come down
            $('#customerInput').slideToggle();
            $("#add").find('i').toggleClass('fa-plus fa-times');
            $scope.customer_id = customer_id;
            $scope.fname = first_name;
            $scope.lname = last_name;
            $scope.address = address;
            $scope.city = city;
            $scope.pincode = pincode;
            $scope.email = email;
            $scope.phonenumber = phone_number;
            $scope.dob = dob;
            $scope.driving = driving_no;
            $scope.btnName = "Update";

        }


    // Delete data
    $scope.deleteData =function(customer_id){
       if(confirm('Are you sure you want to delete ?'))
       {
           $http.post('./php/customertrashData.php',{'customer_id':customer_id})
               .success(function(data){
                   alert(data);
                   $scope.displayData();
               })
               .error(function(err){
                   $log.error(err);
               });

       }
       else
       {
           return false;
       }
    }
}]);