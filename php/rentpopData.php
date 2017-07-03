<?php
  $connect = mysqli_connect('localhost','root','','mcars');

   $data =json_decode(file_get_contents("php://input"));

    if(count($data) >0){
         $pickup_date = mysqli_real_escape_string($connect,$data->pickup_date);
          $dropoff_date = mysqli_real_escape_string($connect,$data->dropoff_date);
       $capacity = mysqli_real_escape_string($connect,$data->capacity);

       $btn_name =$data->btnName;

         if($btn_name == "SEARCH"){

               $output = array();

                $query = "SELECT *
                          FROM cars
                          INNER JOIN vendors
                          ON cars.vendor_id=vendors.vendor_id WHERE current_status='available'";

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