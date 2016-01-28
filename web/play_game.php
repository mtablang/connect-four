<?php
	//Connect Four by Martin Tablang (c) 2016

	$player1name = $_GET['player1name']; 
	echo "<script type=\"text/javascript\">\n"; 
	echo " var player1name = (\"$player1name\");\n";
	echo "</script>\n\n";

	$player2name = $_GET['player2name']; 
	echo "<script type=\"text/javascript\">\n"; 
	echo " var player2name = (\"$player2name\");\n";
	echo "</script>\n\n";

	$game_type = $_GET['game_type']; 
	echo "<script type=\"text/javascript\">\n"; 
	echo " var game_type = (\"$game_type\");\n";
	echo "</script>\n\n";


?>

<html>
<title>Connect Four by Martin Leandro Tablang</title>
<head>

<link rel="stylesheet" type="text/css" href="page_design.css" />

<script type="text/javascript" src="game_engine.js"></script>

</head>






























<body>
	
	<div id="whose_turn">
	</div>



	<div id="gameboard">		
		<img src="images/column.png" onclick="drop_from_human(0)" class="column"> 
		<img src="images/column.png" onclick="drop_from_human(1)" class="column"> 
		<img src="images/column.png" onclick="drop_from_human(2)" class="column"> 
		<img src="images/column.png" onclick="drop_from_human(3)" class="column"> 
		<img src="images/column.png" onclick="drop_from_human(4)" class="column"> 
		<img src="images/column.png" onclick="drop_from_human(5)" class="column"> 
		<img src="images/column.png" onclick="drop_from_human(6)" class="column">
		
		<div id="PlayPanel"></div>
	</div>



	<div id="nametag">
		<b><u>Connect Four</u></b> by <br> <b><u><span>Martin Leandro Tablang</span></u></b><br> (c) <b>2016</b>
	</div>



	<div id="results">
		<a href=# onclick="location.reload()"> Rematch </a>
		<br>
		<a href='index.php' onclick=""> Quit Game </a>
	</div>

</body>



<script>
	document.getElementById("whose_turn").innerHTML = '<b><u>' + player1name + '\'s</u></b> Turn';
		
	if(first_move==black){
		document.getElementById("whose_turn").style.backgroundColor = "#000";
	}
	else if(first_move == red){
		document.getElementById("whose_turn").style.backgroundColor = "#ed303c";
	}


</script>



</html>