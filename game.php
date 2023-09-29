<?php
include "dbConfig.php";
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>RPG - Dragon Repeller</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <div id="game">
    <div id="stats">
      <span class="stat">XP: <strong><span id="xpText">20</span></strong></span>
      <span class="stat">Health: <strong><span id="healthText">1000</span></strong></span>
      <span class="stat">Gold: <strong><span id="goldText">50</span></strong></span>
      
      <?php
          if(isset($_GET['un'])){
            $username = $_GET['un'];
          }
        ?>
      <label id="playerName"><?php echo $username;?></label>
    </div>
    <div id="controls">
      <button id="button1">Go to store</button>
      <button id="button2">Go to cave</button>
      <button id="button3">Fight dragon</button>
    </div>
    <div id="monsterStats">
      <span class="stat">Monster Name: <strong><span id="monsterName"></span></strong></span>
      <span class="stat">Health: <strong><span id="monsterHealth"></span></strong></span>
    </div>
    <div id="text">Welcome to Dragon Repeller. You must defeat the dragon that is preventing people from leaving the
      town. You are in the town square. Where do you want to go? Use the buttons above.</div>
  </div>
  <script src="script.js"></script>
</body>

</html>