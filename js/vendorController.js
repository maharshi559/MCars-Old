/**
 * Created by Samuel on 6/24/2017.
 */
mcarApp.controller('vendorController',['$scope','$http','$log',function($scope,$http,$log) {
    $scope.btnName="ADD";
    $scope.vendorToggle = function () {
        //$('#vendorInput').slideToggle();
        $("#add").find('i').toggleClass('fa-plus fa-times');
    }

    // Insert data
    $scope.insertData =function(){
        if($scope.fname!= null && $scope.lname!=null && $scope.address!=null && $scope.city!=null && $scope.pincode!=null && $scope.email!=null && $scope.phonenumber!=null && $scope.company_name!=null ){

            $http.post('./php/vendorpushData.php',{'firstname':$scope.fname,'lastname':$scope.lname,'address':$scope.address,'city':$scope.city,'pincode':$scope.pincode,'email':$scope.email,
                'phonenumber':$scope.phonenumber,'company_name':$scope.company_name,'btnName':$scope.btnName,'vendor_id':$scope.vendor_id})
                .success(function(data){
                    alert(data);
                    $scope.fname=null;
                    $scope.lname=null;
                    $scope.address=null;
                    $scope.city=null;
                    $scope.pincode=null;
                    $scope.email=null;
                    $scope.phonenumber=null;
                    $scope.company_name=null;
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
        $http.get('./php/vendorpopData.php')
            .success(function(data){
                $scope.names=data;
            })
            .error(function(err){
                $log.error(err);
            });

    }
    // update data
    $scope.updateData =function(vendor_id,first_name,last_name,address,city,pincode,email,phone_number,company_name){
        //toggle to come down
        //$('#vendorInput').slideToggle();
        $("#add").find('i').toggleClass('fa-plus fa-times');

        $scope.vendor_id = vendor_id;
        $scope.fname = first_name;
        $scope.lname = last_name;
        $scope.address = address;
        $scope.city = city;
        $scope.pincode = pincode;
        $scope.email = email;
        $scope.phonenumber = phone_number;
        $scope.company_name = company_name;
        $scope.btnName = "Update";
    }


    // Delete data
    $scope.deleteData =function(id){
        if(confirm('Are you sure you want to delete ?'))
        {
            $http.post('./php/vendortrashData.php',{'vendor_id':vendor_id})
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