<?php
require 'config.php';
$data =json_decode(file_get_contents("php://input"));
if(count($data) >0) {
    $status = mysqli_real_escape_string($connect, $data->status);
    $booking_id = mysqli_real_escape_string($connect, $data->booking_id);
    $number = mysqli_real_escape_string($connect, $data->number);
    $car_id = mysqli_real_escape_string($connect, $data->car_id);
    $customer_id = mysqli_real_escape_string($connect, $data->customer_id);
    $dropoff_date = mysqli_real_escape_string($connect, $data->dropoff_date);
    $pickup_date = mysqli_real_escape_string($connect, $data->pickup_date);
    $price_day = mysqli_real_escape_string($connect, $data->price_day);
    $extra_hr = mysqli_real_escape_string($connect, $data->extra_hr);
    $current_time = mysqli_real_escape_string($connect, $data->current_time);
    $btnName = mysqli_real_escape_string($connect, $data->btnName);
    $book_id = mysqli_real_escape_string($connect, $data->book_id);

    if ($status == "Booked" || $status == "OnRoad" || $status == "Billing" || $status == "Returned") {
        $query = "UPDATE booking SET status='$status' WHERE booking_id='$booking_id'";


        if (mysqli_query($connect, $query)) {
            echo "Data Updated";
        } else {
            echo "ERROR";
        }
    }
    if ($status == "Billing") {

        $queryCheck = "SELECT * from billing where booking_id='$booking_id'";
        $result = mysqli_query($connect, $queryCheck);
        if (mysqli_num_rows($result) > 0) {
            $query = "UPDATE billing SET return_date=CURRENT_TIMESTAMP WHERE booking_id = '$booking_id'";

            if (mysqli_query($connect, $query)) {
                echo "Data Updated";
            } else {
                echo "ERROR";
            }

        } else {
            $query = "INSERT INTO billing(booking_id,car_id,customer_id,billing_status,return_date) VALUES ('$booking_id','$car_id','$customer_id','Unpaid',CURRENT_TIMESTAMP )";

            if (mysqli_query($connect, $query)) {
                echo "Data Updated";
            } else {
                echo "ERROR";
            }
        }

    }

    if ($status == "OnRoad") {
        $query = "UPDATE cars SET current_status='$status' WHERE car_id='$car_id'";

        if (mysqli_query($connect, $query)) {
            echo "Data Updated";
        }
    }
    if ($status == "Returned" || $status == "Booked") {
        $query = "UPDATE cars SET current_status='Available' WHERE car_id='$car_id'";

        if (mysqli_query($connect, $query)) {
            echo "Data Updated";
        }
    }
  }
  if($btnName == "Confirm"){
      $query = "UPDATE billings SET billing_status='Paid' WHERE booking_id='$book_id'";

      if (mysqli_query($connect, $query)) {
          echo "Data Updated";
      }
  }
if ($status == "Paid" || $status == "Unpaid") {
    $query = "UPDATE billing SET billing_status='$status' WHERE booking_id='$booking_id'";

    if (mysqli_query($connect, $query)) {
        echo "Data Updated";
    }
}
?>