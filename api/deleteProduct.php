<?php

include("config.php");
$data=json_decode(file_get_contents("php://input"),true);
$id=$data["id"]; // step 1

$resp["status"]=mysqli_query($con,"delete from products where id=$id"); // step 2 & 3

echo json_encode($resp); // step 4


?>