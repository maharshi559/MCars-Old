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



}]);