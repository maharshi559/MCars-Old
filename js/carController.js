/**
 * Created by Samuel  on 6/23/2017.
 */
mcarApp.controller('carController',['$scope','$http','$log',function($scope,$http,$log) {
    $scope.btnName="ADD";
    $scope.carToggle = function () {
        $('#carInput').slideToggle();
        $("#add").find('i').toggleClass('fa-plus fa-times');
    }

    // Insert data
    $scope.insertData =function(){
        if($scope.vendor!= null && $scope.carName!=null&& $scope.carPic!=null  && $scope.model!=null && $scope.number!=null && $scope.capacity!=null && $scope.price!=null && $scope.extra!=null && $scope.vprice!=null && $scope.cartype!=null ){
            $scope.current_status="Available";

            $http.post('./php/carpushData.php',{'vendor':$scope.vendor,'carname':$scope.carName,'carpic':$scope.carPic,'model':$scope.model,'capacity':$scope.capacity,'price':$scope.price,'extra':$scope.extra,'number':$scope.number,
                'vprice':$scope.vprice,'btnName':$scope.btnName,'cartype':$scope.cartype,'current_status':$scope.currentstatus,'car_id':$scope.car_id})
                .success(function(data){
                    alert(data);
                    $scope.vendor=null;
                    $scope.carName=null;
                    $scope.carPic=null;
                    $scope.model=null;
                    $scope.capacity=null;
                    $scope.price=null;
                    $scope.extra=null;
                    $scope.number=null;
                    $scope.vprice=null;
                    $scope.cartype=null;
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
        $http.get('./php/carpopData.php')
            .success(function(data){
                $scope.names=data;
                console.log($scope.names);
            })
            .error(function(err){
                $log.error(err);
            });

    }
    // update data
    $scope.updateData =function(car_id,vendor,carName,carPic,model,capacity,cartype,price,extra,number,vprice,current_status){
        //toggle to come down
        /*$('#carInput').slideToggle();
        $("#add").find('i').toggleClass('fa-plus fa-times');*/

        $scope.car_id = car_id;
        $scope.vendor=vendor;
        $scope.carName=carName;
        $scope.carPic=carPic;
        $scope.model=model;
        $scope.number=number;
        $scope.capacity=capacity;
        $scope.cartype=cartype;
        $scope.price=price;
        $scope.extra=extra;
        $scope.vprice=vprice;
        $scope.currentstatus=current_status;
        $scope.btnName = "Update";
    }


    // Delete data
    $scope.deleteData =function(id){
        if(confirm('Are you sure you want to delete ?'))
        {
            $http.post('./php/cartrashData.php',{'car_id':car_id})
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

    // load vendors data
    $scope.loadVendors =function(id){
        $http.get('./php/loadVendors.php')
            .success(function(data){
                $scope.vendors=data;
            })
            .error(function(err){
                $log.error(err);
            });

    }
}]);