<?php

require 'config.php';

    $output = array();

    $query = "SELECT * FROM vendors ORDER BY first_name ASC";

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