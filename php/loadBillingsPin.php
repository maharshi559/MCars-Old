<?php

require 'config.php';

$output = array();
$data =json_decode(file_get_contents("php://input"));

$booking_id = mysqli_real_escape_string($connect,$data->booking_id);

$query = "SELECT DISTINCT booking.booking_id,cars.number,cars.price_day,cars.extra_hr,booking.pickup_date,booking.dropoff_date,billing.return_date,billing.billing_status,booking.status,customers.first_name,
          customers.last_name, customers.email, customers.phone_number,DATEDIFF(booking.dropoff_date,booking.pickup_date) AS diff,
           ((UNIX_TIMESTAMP(billing.return_date) - UNIX_TIMESTAMP(booking.dropoff_date))/(3600)) AS return_drop,
            ((UNIX_TIMESTAMP(booking.dropoff_date) - UNIX_TIMESTAMP(booking.pickup_date))/(3600)) AS pick_drop  
  FROM billing
                          LEFT JOIN booking
                          ON billing.booking_id=booking.booking_id
                          LEFT JOIN customers
                          ON billing.customer_id=customers.customer_id
                          LEFT JOIN cars
                          ON billing.car_id=cars.car_id  WHERE billing.booking_id='$booking_id'";



$result = mysqli_query($connect,$query);

if(mysqli_num_rows($result) >0)
{
    while($row = mysqli_fetch_array($result))
    {
        $output[] =$row;
    }
    echo json_encode($output);
}

?>