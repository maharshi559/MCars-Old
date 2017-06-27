<?php
  $connect = mysqli_connect('localhost','root','','mcars');
  $data =json_decode(file_get_contents("php://input"));
  if(count($data) >0){
    $first_name = mysqli_real_escape_string($connect,$data->firstname);
    $last_name = mysqli_real_escape_string($connect,$data->lastname);
    $address = mysqli_real_escape_string($connect,$data->address);
    $city = mysqli_real_escape_string($connect,$data->city);
    $pincode = mysqli_real_escape_string($connect,$data->pincode);
    $email = mysqli_real_escape_string($connect,$data->email);
    $phonenumber = mysqli_real_escape_string($connect,$data->phonenumber);
    $company_name = mysqli_real_escape_string($connect,$data->company_name);
    $btn_name =$data->btnName;
    if($btn_name == "ADD"){
       $query="INSERT INTO vendors(first_name,last_name,address,city,pincode,email,phone_number,company_name) VALUES ('$first_name','$last_name','$address','$city','$pincode','$email','$phonenumber','$company_name')";

           if(mysqli_query($connect,$query)){
             echo "Data Inserted";
           }
           else{
             echo "ERROR";
           }

    }

     if($btn_name == "Update"){
           $id =$data->id;
           $query="UPDATE vendors SET first_name='$first_name',last_name='$last_name',address='$address',city='$city',pincode='$pincode',email='$email',phone_number='$phonenumber',company_name='$company_name' WHERE id='$id'";

               if(mysqli_query($connect,$query)){
                 echo "Data Updated";
               }
               else{
                 echo "ERROR";
               }

        }

  }
?>