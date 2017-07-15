<?php

require 'config.php';

$output = array();

$query = "SELECT DISTINCT booking.booking_id,cars.number,cars.price_day,cars.extra_hr,DATE_FORMAT(booking.pickup_date, '%d %M %y %H:%i %p')AS pickup_date,DATE_FORMAT(booking.dropoff_date, '%d %M %y %H:%i %p') AS dropoff_date,DATE_FORMAT(billing.return_date, '%d %M %y %H:%i %p') AS return_date,billing.billing_status,booking.status,customers.first_name,
          customers.last_name, customers.email, customers.phone_number,DATEDIFF(booking.dropoff_date,booking.pickup_date) AS diff,
           ((UNIX_TIMESTAMP(billing.return_date) - UNIX_TIMESTAMP(booking.dropoff_date))/(3600)) AS return_drop,
            ((UNIX_TIMESTAMP(booking.dropoff_date) - UNIX_TIMESTAMP(booking.pickup_date))/(3600)) AS pick_drop 
  FROM billing
                          LEFT JOIN booking
                          ON billing.booking_id=booking.booking_id
                          LEFT JOIN customers
                          ON billing.customer_id=customers.customer_id
                          LEFT JOIN cars
                          ON billing.car_id=cars.car_id ORDER BY billing.return_date DESC";



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