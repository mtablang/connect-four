<?php
	//Connect Four by Martin Tablang (c) 2016
?>

<html>
<title>Connect Four by Martin Leandro Tablang</title>

<head>

<link rel="stylesheet" type="text/css" href="page_design.css" />

<script type="text/javascript">

function changeName(opponent_type){
	if(opponent_type=="AI"){
		document.getElementById('opponent_type').innerHTML = "AI's Name:";
		document.getElementById('opponent_name').value = "BLACK AI";
	}
	else{
		document.getElementById('opponent_type').innerHTML = "Player 2's Name:";
		document.getElementById('opponent_name').value = "BLACK";
	}
}

</script>

</head>










<body>

	<div id="front_nav">
		<form action="play_game.php" method="get">
			
			Game Mode:
			<select name="game_type" id="game_select" onchange="changeName(this.value)">
				<option value="Human">Versus Human</option>
				<option value="AI">Versus AI</option>
			</select>
			<br><br>
			
			Player 1's Name:<br>
			<input type="text" name="player1name" class="text-fields" value="RED">
			<br>
			
			<span id="opponent_type">Player 2's Name:</span><br>
			<input type="text" id="opponent_name" name="player2name" class="text-fields" value="BLACK">
			<br><br>
  			
  			<input type="submit" class="action-button" value="Start Game">			 
		</form> 

	</div>



	<div id="nametag">
		<b><u>Connect Four</u></b> by <br> <b><u><span>Martin Leandro Tablang</span></u></b><br> (c) <b>2016</b>
	</div>

</body>




</html>