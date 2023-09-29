<?php
include "dbConfig.php";
$currName= "";
if(isset($_POST['submit'])){
    $userName = $_POST['username'];
    $userEmail = $_POST['useremail'];



    $sql1 = "SELECT `name` FROM  `players` WHERE  `email`='$userEmail' ";
    $checkName="";
    $result1 = $conn->query($sql1);

    if($result1 == TRUE){
      echo "Data present";

      if($result1->num_rows > 0){
        while($row = $result1->fetch_assoc()){
          $checkName = $row['name'];
        }
      }
      
      if($checkName == $userName){
         echo '<script>alert("This Player already exist change Email");</script>';
        echo '<script>window.location.href = "createUser.php";</script>';
      }
      else{
        $sql = "INSERT INTO `players`(`name`,`email`,`win`) VALUES('$userName','$userEmail',0)";
  
        $result = $conn->query($sql);
    
        if($result == TRUE){
          echo "Data entered succesfully";
          echo '<script>window.location.href = "game.php?un='.$userName.'";</script>';
    
        }
        else{
          echo "Query failed: ".$sql." <br>".$conn->error;
        }
    
        $conn->close();
      }
    }
   

}

  
?>


<!DOCTYPE html>
<html>
<head>
    <title>Player Entry Form</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">

    <style>
        #form{
            margin-top: 5%;
            margin-left: 25%;
        }
    </style>
</head>
<body style="background-color:  #fffbd5">
<h1 style="margin-left:39%">Welcome to Dragon Repellor</h1>

<form class='col-md-6 border p-3 bg-danger' id="form" action="" method="POST">
<h2>Login/SignUp</h2>
  <div class="mb-3">
    <label for="name">Player Name</label>
    <input type="text" class="form-control" id="name" name="username" required>
  </div>
  <div class="mb-3">
    <label for="email">email</label>
    <input type="email" class="form-control" id="email" name="useremail" required>
    
  </div>
  <button type="submit" class="btn btn-primary" value="submit" name="submit" >Play Game</button>
  <a href="forgetPass.php" class="btn btn-info">Forget Password</a>
</form>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>

</body>
</html>