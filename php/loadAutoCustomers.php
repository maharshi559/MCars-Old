<?php

    $connect = mysqli_connect('localhost','root','','mcars');
    $output = array();
    $data =json_decode(file_get_contents("php://input"));

    $customer_id = mysqli_real_escape_string($connect,$data->customer_id);
    $query = "SELECT * FROM customers where customer_id=$customer_id";

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