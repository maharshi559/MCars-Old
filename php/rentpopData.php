<?php
require 'config.php';

   $data =json_decode(file_get_contents("php://input"));

    if(count($data) >0){
         $pickup_date = mysqli_real_escape_string($connect,$data->pickup_date);
          $dropoff_date = mysqli_real_escape_string($connect,$data->dropoff_date);
          $capacity = mysqli_real_escape_string($connect,$data->capacity);
          $cartype = mysqli_real_escape_string($connect,$data->cartype);

       $btn_name =$data->btnName;

         if($btn_name == "SEARCH"){

               $output = array();

                $query = "SELECT  DISTINCT cars.car_id,cars.name,cars.price_day,cars.model,cars.capacity,cars.number,cars.cartype,cars.extra_hr,vendors.first_name,vendors.last_name,cars.vendor_id
                          FROM cars
                          LEFT JOIN vendors
                            ON cars.vendor_id =vendors.vendor_id                         
                          LEFT JOIN booking
                          ON booking.car_id =cars.car_id
                           WHERE (capacity='$capacity' OR cartype='$cartype') AND (NOT current_status='NotAvailable' AND NOT current_status='Service') AND  (((pickup_date NOT BETWEEN '$pickup_date' AND '$dropoff_date') and (dropoff_date NOT BETWEEN '$pickup_date' AND '$dropoff_date')  and (capacity='$capacity' OR cartype='$cartype')) 
                          OR  ( pickup_date is null ) )   
                          ";
            /* $query = "SELECT *
                          FROM cars
                          INNER JOIN vendors
                          ON cars.vendor_id=vendors.vendor_id WHERE current_status='available'
                          ";*/

                $result = mysqli_query($connect,$query);

                if(mysqli_num_rows($result) >0)
                {
                    while($row = mysqli_fetch_array($result))
                    {
                      $output[] =$row;
                    }
                  echo json_encode($output);
                }


           }

      }
?>