<?php

include("config.php");
$data=json_decode(file_get_contents("php://input"),true);

$id=$_POST["id"]; // step 1
$name=$_POST["name"];
$price=$_POST["price"];
$section=$_POST["section"];
$descr=$_POST["descr"];
$qty=$_POST["qty"];

if($_FILES["img"]){
    $result=mysqli_query($con,"select img from products where id=$id");
    $row=mysqli_fetch_assoc($result);
    unlink("../".$row["img"]);
    $img_name=round(microtime(true) * 1000).substr($_FILES["img"]["name"],strrpos($_FILES["img"]["name"],'.')); // original file name
    move_uploaded_file($_FILES["img"]["tmp_name"],"../uploads/$img_name"); // step 1

    $resp["status"]=mysqli_query($con,"update products set name='$name',price='$price',section='$section',descr='$descr',qty='$qty',img='uploads/$img_name' where id=$id");
}
else {
$resp["status"]=mysqli_query($con,"update products set name='$name',price='$price',section='$section',descr='$descr',qty='$qty' where id=$id");
}

echo json_encode($resp);

?>