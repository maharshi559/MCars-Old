<?php
  $connect = mysqli_connect('localhost','root','','mcars');
  $data =json_decode(file_get_contents("php://input"));
  if(count($data) >0){
    $vendor = mysqli_real_escape_string($connect,$data->vendor);
    $carname = mysqli_real_escape_string($connect,$data->carname);
    $carpic = mysqli_real_escape_string($connect,$data->carpic);
    $model = mysqli_real_escape_string($connect,$data->model);
    $capacity = mysqli_real_escape_string($connect,$data->capacity);
    $cartype = mysqli_real_escape_string($connect,$data->cartype);
    $price = mysqli_real_escape_string($connect,$data->price);
    $extra = mysqli_real_escape_string($connect,$data->extra);
    $number = mysqli_real_escape_string($connect,$data->number);
    $vprice = mysqli_real_escape_string($connect,$data->vprice);
    $current_status =$data->current_status;
    $btn_name =$data->btnName;
    if($btn_name == "ADD"){
       $query="INSERT INTO cars(vendor_id,name,pic,model,capacity,cartype,price_day,extra_hr,number,vprice,current_status) VALUES ('$vendor',' $carname','$carpic','$model','$capacity','$cartype','$price','$extra','$number','$vprice','$current_status')";

           if(mysqli_query($connect,$query)){
             echo "Data Inserted";
           }
           else{
             echo "ERROR";
           }

    }

     if($btn_name == "Update"){
           $id =$data->id;
           $query="UPDATE cars SET vendor_id='$vendor',name='$carname',pic='$carpic',model='$model',capacity='$capacity',cartype='$cartype',price_day='$price',extra_hr='$extra',number='$number',vprice='$vprice' WHERE id='$id'";

               if(mysqli_query($connect,$query)){
                 echo "Data Updated";
               }
               else{
                 echo "ERROR";
               }

        }

  }
?>