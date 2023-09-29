<?php
include "dbConfig.php";
?>

<!DOCTYPE html>
<html>
    <head>
    <title>Forget Password</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">


    <style>
        #form{
            margin-top: 5%;
            margin-left: 25%;
        }
    </style>

    </head>

    <body class=" bg-dark">
    <h1 style="margin-left:39%;color:azure">Welcome to Dragon Repellor</h1>
    <form class='col-md-6  p-3 bg-danger bg-gradient' id="form" action="" method="POST">
        <h2>Recover Username</h2>
        <div class="mb-3">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" name="useremail" required>
 

            <?php
                if(isset($_POST['getName'])){
                    $userEmail = $_POST['useremail'];


                    $sql1= "SELECT COUNT(`name`) AS 'ifThere' FROM `players` WHERE `email` = '$userEmail'";
                    $result1 = $conn->query($sql1);
                    $ifThere="";
                    if($result1->num_rows > 0){
                        while($row1 = $result1->fetch_assoc()){
                            $ifThere = $row1['ifThere'];
                        }
                    }

                    if($ifThere==0){
                        echo '<script>alert("There is no user with email: '.$userEmail.'")</script>';
                        echo '<script>window.location.href = "forgetPass.php";</script>';
                    }
                    else{
                        $sql = "SELECT `name` FROM `players` WHERE `email`='$userEmail'";

                        $result = $conn->query($sql);
    
                        if($result->num_rows > 0){
                            while($row = $result->fetch_assoc()){
                                $recPass = $row['name'];
                            }
                        }
                    }
                }
    
            ?>

            <label for="name">Name</label>
            <input type="text" class="form-control" id="name" name="name" readonly value=<?php echo isset($recPass) ? $recPass : '';?>>

        </div>
        <button type="submit" class="btn btn-primary" value="getName" name="getName">Get Name</button>
        <a href="createUser.php" class="btn btn-info">Start Page</a>
    </form>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>

    </body>
</html>