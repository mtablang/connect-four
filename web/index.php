<?php
//Connect Four by Martin Tablang (c) 2016
?>

<html>
<title>Connect Four by Martin Leandro Tablang</title>

<head>

<style type="text/css">

body {
	background-color:#89ABE3;
}

#front_nav{
	position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    height: 180px;
	width:170px;
	text-align: center;
	background-color:#F2DDDE;
	padding: 20px;
	outline: 5px solid #222;
	font-family: Arial;
	-webkit-transition: .5s ease-in-out;
    -moz-transition: .5s ease-in-out;
    -o-transition: .5s ease-in-out;
    transition: .5s ease-in-out;
    font-family: 'Verdana';

}

#front_nav:hover {
    background: #eee;
}


#nametag{
	position: fixed;
	right: 0px;
	bottom: 0px;
	background-color:#F2DDDE;
	padding: 10px;
	outline: 5px dotted #F2DDDE;
	font-family: Arial;
}

#nametag span{
	-webkit-transition: .1s ease-in-out;
    -moz-transition: .1s ease-in-out;
    -o-transition: .1s ease-in-out;
    transition: .1s ease-in-out;
}

#nametag span:hover{
	background-color:#ed303c;
	color:#fff;
}



.action-button
{
	-webkit-transition: all 0.1s;
	-moz-transition: all 0.1s;
    -o-transition: all 0.1s;
	transition: all 0.1s;
	position: relative;
	padding: 10px 20px;
	border-radius: 10px;
	font-family: 'Verdana';
	font-size: 14px;
	color: #FFF;
	background-color: #3498DB;
	text-shadow:none !important;
	border:none !important;
	box-shadow:none !important;
}

.action-button:active
{
	transform: translate(0px,8px);
  	-webkit-transform: translate(0px,8px);
	
}

.text-fields
{
	font-family: 'Verdana';
	font-size: 12px;
	background-color: #fff;
	-webkit-transition: .5s ease-in-out;
    -moz-transition: .5s ease-in-out;
    -o-transition: .5s ease-in-out;
    transition: .5s ease-in-out;
}

.text-fields:hover 
{
    background: #FfDDDE;
}

</style>


</head>































<body>

	<div id="front_nav">

		<form action="play_game.php" method="get">
			Player 1's Name:<br>
			<input type="text" name="player1name" class="text-fields" value="RED">
			<br>
			Player 2's Name:<br>
			<input type="text" name="player2name" class="text-fields" value="BLACK">
			<br><br>
  			<input type="submit" class="action-button" value="Start Game">
  			 
		</form> 

	</div>



	<div id="nametag">
		<b><u>Connect Four</u></b> by <br> <b><u><span>Martin Leandro Tablang</span></u></b><br> (c) <b>2016</b>
	</div>



</body>




</html>