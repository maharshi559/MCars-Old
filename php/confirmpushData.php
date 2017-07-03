<?php
  $connect = mysqli_connect('localhost','root','','mcars');
  $data =json_decode(file_get_contents("php://input"));
  if(count($data) >0){

    $car_id = mysqli_real_escape_string($connect,$data->car_id);
    $vendor_id = mysqli_real_escape_string($connect,$data->vendor_id);
    $customer_id = mysqli_real_escape_string($connect,$data->customer_id);
    $pickup_date = mysqli_real_escape_string($connect,$data->pickup_date);
    $dropoff_date = mysqli_real_escape_string($connect,$data->dropoff_date);

    $first_name = mysqli_real_escape_string($connect,$data->firstname);
    $last_name = mysqli_real_escape_string($connect,$data->lastname);
    $address = mysqli_real_escape_string($connect,$data->address);
    $city = mysqli_real_escape_string($connect,$data->city);
    $pincode = mysqli_real_escape_string($connect,$data->pincode);
    $email = mysqli_real_escape_string($connect,$data->email);
    $phonenumber = mysqli_real_escape_string($connect,$data->phonenumber);
    $dob = mysqli_real_escape_string($connect,$data->dob);
    $driving = mysqli_real_escape_string($connect,$data->driving);


      $q="SELECT * FROM customers WHERE customer_id='$customer_id'" ;
      $result = mysqli_query($connect, $q);
      if(mysqli_num_rows($result) == 0) {
          $new = "INSERT INTO customers(first_name,last_name,address,city,pincode,email,phone_number,dob,driving_no)
               VALUES ('$first_name','$last_name','$address','$city','$pincode','$email','$phonenumber','$dob',' $driving')";
          if(mysqli_query($connect,$new)){
              echo "Data ";
              $customer_id = mysqli_insert_id($connect);
             // echo "New record created successfully. Last inserted ID is: " . $last_id;
          }
      }

      $query="INSERT INTO booking(car_id,customer_id,vendor_id,pickup_date,dropoff_date) VALUES ('$car_id ','$customer_id','$vendor_id','$pickup_date','$dropoff_date')";

           if(mysqli_query($connect,$query)){
             echo "Data Inserted";
           }
           else{
             echo "ERROR";
           }
  }
?>