<?php
require 'config.php';
  $data =json_decode(file_get_contents("php://input"));
  if(count($data) >0){
    $first_name = mysqli_real_escape_string($connect,$data->firstname);
    $last_name = mysqli_real_escape_string($connect,$data->lastname);
    $address = mysqli_real_escape_string($connect,$data->address);
    $city = mysqli_real_escape_string($connect,$data->city);
    $pincode = mysqli_real_escape_string($connect,$data->pincode);
    $email = mysqli_real_escape_string($connect,$data->email);
    $phonenumber = mysqli_real_escape_string($connect,$data->phonenumber);
    $dob = mysqli_real_escape_string($connect,$data->dob);
    $driving = mysqli_real_escape_string($connect,$data->driving);
    $btn_name =$data->btnName;
    if($btn_name == "ADD"){
       $query="INSERT INTO customers(first_name,last_name,address,city,pincode,email,phone_number,dob,driving_no) VALUES ('$first_name','$last_name','$address','$city','$pincode','$email','$phonenumber','$dob',' $driving')";

           if(mysqli_query($connect,$query)){
             echo "Data Inserted";
           }
           else{
             echo "ERROR";
           }

    }

     if($btn_name == "Update"){
           $id =$data->customer_id;
           $query="UPDATE customers SET first_name='$first_name',last_name='$last_name',address='$address',city='$city',pincode='$pincode',email='$email',phone_number='$phonenumber',dob='$dob',driving_no ='$driving' WHERE customer_id='$id'";

               if(mysqli_query($connect,$query)){
                 echo "Data Updated";
               }
               else{
                 echo "ERROR";
               }

        }

  }
?>