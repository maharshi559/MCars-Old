<?php

$connect = mysqli_connect('localhost','root','','mcars');

$output = array();

$query = "SELECT *FROM booking
                          INNER JOIN cars
                          ON booking.car_id=cars.car_id
                          INNER JOIN customers
                          ON booking.customer_id=customers.customer_id ORDER BY pickup_date DESC";



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