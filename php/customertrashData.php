<?php
    $connect = mysqli_connect('localhost','root','','mcars');
     $data =json_decode(file_get_contents("php://input"));

    if(count($data) >0)
    {
      $id =$data->customer_id;

      $query = "DELETE FROM customers WHERE customer_id='$id'";

      if( mysqli_query($connect,$query))
      {
         echo('Data Deleted');
      }
      else{
         echo('Error');
      }
    }
?>