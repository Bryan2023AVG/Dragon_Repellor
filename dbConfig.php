<?php
$serverName = "localhost";
$userName = "root";
$password = "D1R2A3G4";
$dbName = "dragondb";

$conn = new mysqli($serverName,$userName,$password,$dbName);

if($conn->connect_error){
    die("Connection failed:".$conn->connect_error);
}
else{
   // echo "Connection succesfull";
}
?>