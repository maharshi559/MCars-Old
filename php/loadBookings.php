<?php

require 'config.php';

$output = array();

$query = "SELECT booking.booking_id, cars.name, cars.number, DATE_FORMAT(booking.pickup_date, '%d %M %y %H:%i %p')AS pickup_date,DATE_FORMAT(booking.dropoff_date, '%d %M %y %H:%i %p')AS dropoff_date, customers.first_name, customers.last_name, booking.status FROM booking
                          INNER JOIN cars
                          ON booking.car_id=cars.car_id
                          INNER JOIN customers
                          ON booking.customer_id=customers.customer_id ORDER BY booking.pickup_date DESC";



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