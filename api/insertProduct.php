<?php
// php://input
include("config.php");

$name=$_POST["name"];
$price=$_POST["price"];
$section=$_POST["section"];
$descr=$_POST["descr"];
$qty=$_POST["qty"];

$img_name=$_FILES["img"]["name"]; // original file name
move_uploaded_file($_FILES["img"]["tmp_name"],"../uploads/$img_name"); // step 1
// {status:$bool}
$resp["status"]=mysqli_query($con,"insert into products(name,price,section,descr,qty,img) values('$name','$price','$section','$descr','$qty','uploads/$img_name')"); // step 2 & 3

echo json_encode($resp); // step 4

?>