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


?>

<html>
<title>Connect Four by Martin Leandro Tablang</title>
<head>

<style type="text/css">

body {
	background-color:#89ABE3;
}

#gameboard{
	background-color:#ddd;
	position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
	height: 370px;
	width: 420px;
	border-style: solid;
	border-color: #fffc00;
    border-width: 50px;
    outline: 10px dotted #F2DDDE;
}

.column{
	height: 370px;
	width:60px;
	margin: 0px;
	float: left;
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

#whose_turn{
	position: fixed;
    bottom: 6px;
    left: 50%;
    -webkit-transform: translate(-50%, 0%);
    transform: translate(-50%, 0%);
	background-color:#ed303c;
	color:#fff;
	padding: 6px;
	outline: 1px solid #bbb;
	font-family: Arial;
}

.circle{
	height:55px;
	width:55px;
}

#results{
	position: fixed;
    top: 50%;
    left: 90px;
    -webkit-transform: translate(0%, -50%);
    transform: translate(0%, -50%);
    height: 140px;
	width:150px;
	text-align: center;
	background-color:#F2DDDE;
	padding: 20px;
	outline: 5px dotted #F2DDDE;
	font-family: Arial;
	-webkit-transition: .5s ease-in-out;
    -moz-transition: .5s ease-in-out;
    -o-transition: .5s ease-in-out;
    transition: .5s ease-in-out;
	opacity: 0;

}

#results:hover {
    background: #ddd;
}

#results a{
	color: #3468DB;
	font-size: 20;
	-webkit-transition: .5s ease-in-out;
    -moz-transition: .5s ease-in-out;
    -o-transition: .5s ease-in-out;
    transition: .5s ease-in-out;
    font-family: Verdana;
}

#results a:visited{
	color: #3468FB;
}

#results a:hover{
	color: #ed303c;
}

</style>



<script type="text/javascript">

	

	playing_field 	 = new Array(0,0,0,0,0,0,0);
	playing_field[0] = new Array(0,0,0,0,0,0);//Column 0
	playing_field[1] = new Array(0,0,0,0,0,0);//Column 1
	playing_field[2] = new Array(0,0,0,0,0,0);//Column 2
	playing_field[3] = new Array(0,0,0,0,0,0);//Column 3
	playing_field[4] = new Array(0,0,0,0,0,0);//Column 4
	playing_field[5] = new Array(0,0,0,0,0,0);//Column 5
	playing_field[6] = new Array(0,0,0,0,0,0);//Column 6

	//Height counter for the 7 columns. Full if reaches -1.
	heightCounter =  new Array(5,5,5,5,5,5,5);

	//Ball Status Constants
	red = 1;
	black = 2;
	outside = 3;

	first_move = red;
	current_player = first_move;

	ballNumber = 0;
	hasWon = false;



	function drop_ball(column_number)
	{
		if(!hasWon){
			

			//Column Full Case
			if (heightCounter[column_number] == -1){
				//alert("This column is full. Choose another.")
			}



			else
			{
				playing_field[column_number][heightCounter[column_number]] = current_player;
				heightCounter[column_number]--;
				put(column_number,current_player);
				var audio = new Audio('sounds/Blop-Mark_DiAngelo-79054334.mp3');
				audio.play();
				
				//Win Case
				if (win_checker(column_number, heightCounter[column_number]+1, current_player) == true) 
				{
					hasWon=true;
					show_results(current_player, false);
					var audio = new Audio('sounds/Ta Da-SoundBible.com-1884170640.mp3');
					audio.play();
				}

				//Draw Case (All columns have been filled)
				if (
					(heightCounter[0] == -1) && 
					(heightCounter[1] == -1) && 
					(heightCounter[2] == -1) && 
					(heightCounter[3] == -1) && 
					(heightCounter[4] == -1) && 
					(heightCounter[5] == -1) && 
					(heightCounter[6] == -1)) 
				{
					show_results(current_player, true);
				}

				
				//Continue Playing Case
				if (hasWon != true) {
					if(current_player==red){
						current_player = black;
						document.getElementById("whose_turn").innerHTML =  '<b><u>' + player2name + '\'s</u></b> Turn'
						document.getElementById("whose_turn").style.backgroundColor = "#000";
					}
					else if(current_player == black){
						current_player = red;
						document.getElementById("whose_turn").innerHTML =  '<b><u>' + player1name + '\'s</u></b> Turn'
						document.getElementById("whose_turn").style.backgroundColor = "#ed303c";
					}
		

				}       	
			}
		}
	}



	function put(column_number,ball_color)
	{
		//To do: PUT ANIMATION HERE
		if (ball_color == red) 
			document.getElementById("PlayPanel").innerHTML = document.getElementById("PlayPanel").innerHTML + 
			'<div id="ball' + ballNumber + '" style="position:absolute; top:'+(heightCounter[column_number]*60+68)+'px; left:'+(column_number*60+3)+
			'px;"><img src="images/red-circle.png" class="circle"> </div>';

			

		if (ball_color == black) 
			document.getElementById("PlayPanel").innerHTML = document.getElementById("PlayPanel").innerHTML + 
			'<div id="ball' + ballNumber + '"style="position:absolute; top:'+(heightCounter[column_number]*60+68)+'px; left:'+(column_number*60+3)+
			'px;"><img src="images/black-circle.png" class="circle"> </div>';

		
		ballNumber++;
		
	}




	function get(column_number, row_number)
	{
		if ((column_number < 0) || (column_number > 6) || (row_number < 0) || (row_number > 5)) 
		{
			return outside
		}
		else 
		{
			return (playing_field[column_number][row_number])
		}
	}




	function show_results(winning_player, draw_game){
		
		if(!draw_game){
			if(winning_player == 1){
				winner = player1name;
			}
			else if(winning_player == 2){
				winner = player2name;
			}

			document.getElementById("results").innerHTML =  
			'<h3><b>Winner is <u>'+ winner +'</u>!</b></h3>' + document.getElementById("results").innerHTML;

			document.getElementById("results").style.opacity = 1;
		}

		else{
			document.getElementById("results").innerHTML =  
			"<h3><b>It is a draw!</u></b></h3>" + document.getElementById("results").innerHTML;

			document.getElementById("results").style.opacity = 1;
		}

	}





	





	function win_checker(x, y, ball_color)
	{
		var j,k;
		var sum1,sum2,sum3,sum4;
		var youShallNotPass1,youShallNotPass2,youShallNotPass3,youShallNotPass4;
		var ball_color2;
		var youreWinner=false;

		if (ball_color == red)
		{
			ball_color2 = black
		} else 
		{
			ball_color2 = red
		}; 

		/*Check the whole board for cases:
		Magsisimula sa x and y, tapos, sa inner loop, may checking for horizontal (pakanan), vertical (pababa), diagonals (L-R, R-L; from top). 
		Kapag di nakakita: kakaliwa from x, tataas from y , tataas (and <kakaliwa OR kakanan>) from diagonals ng 1 step. Gagawin to 4 times (outer loop).
		4 times... kasi kailangan i-handle yung worst case na pa-horizontal kapag galing sa column 7.
		So basically, ichecheck ng inner loop yung 4 paabante, tapos pag di nakakita, i-aatras ng outer loop yung checking ng 1.
		Kapag lumagpas sa grid (will happen in the inner loops of non-worst cases), or nakatagpo ng other ball color, mag-fafalse yung inner loop. */

		for (k=0;k<=3;k++)
		{
			sum1 = 0;
			sum2 = 0;
			sum3 = 0;
			sum4 = 0;
			youShallNotPass1 = 0;
			youShallNotPass2 = 0;
			youShallNotPass3 = 0;
			youShallNotPass4 = 0;

			for(j=0;j<=3;j++)
			{

				//Check kung "You're" Winner
				if (get(x-k+j,y) == ball_color) {sum1++};//I-check ang pa-horizontal...(pakanan)
				if (get(x,y-k+j) == ball_color) {sum2++};//I-check ang pa-vertical...(pababa)
				if (get(x-k+j,y-k+j) == ball_color) {sum3++};//I-check ang pa-diagonal... (left to right, from top)
				if (get(x+k-j,y-k+j) == ball_color) {sum4++};//I-check ang pa-diagonal... (right to left, from top)


				//Same checking pero for the other ball. Kapag naka-encounter ng at least 1, "You shall not pass" - Gandalf
				if (get(x-k+j,y) == ball_color2) {youShallNotPass1++};
				if (get(x,y-k+j) == ball_color2) {youShallNotPass2++};
				if (get(x-k+j,y-k+j) == ball_color2) {youShallNotPass3++};
				if (get(x+k-j,y-k+j) == ball_color2) {youShallNotPass4++};


				//Same checking pero checks if outside. Kapag naka-encounter ng at least 1, "You shall not pass" - Gandalf
				if (get(x-k+j,y) == outside) {youShallNotPass1++};
				if (get(x,y-k+j) == outside) {youShallNotPass2++};
				if (get(x-k+j,y-k+j) == outside) {youShallNotPass3++};
				if (get(x+k-j,y-k+j) == outside) {youShallNotPass4++};
			}


			if ((sum1 >= 4) && (youShallNotPass1 == 0)) 
			{
				type_of_impact = "horizontal";
				lightTheBalls(x, y, k, type_of_impact, ball_color);

				youreWinner = true
			} 

			else if ((sum2 >= 4) && (youShallNotPass2 == 0)) 
			{
				type_of_impact = "vertical";
				lightTheBalls(x, y, k, type_of_impact, ball_color);

				youreWinner = true
			}

			else if ((sum3 >= 4) && (youShallNotPass3 == 0)) 
			{
				type_of_impact = "diagonal-left-to-right";
				lightTheBalls(x, y, k, type_of_impact, ball_color);

				youreWinner = true
			} 

			else if ((sum4 >= 4) && (youShallNotPass4 == 0)) 
			{
				type_of_impact = "diagonal-right-to-left";
				lightTheBalls(x, y, k, type_of_impact, ball_color);

				youreWinner = true
			};

		}
		return youreWinner;
	}

	

	function lightTheBalls(x, y, degree, type_of_impact, ball_color)
	{

		var dx;
		var dy;
		var current_x = x;
		var current_y = y;

		
		if(type_of_impact=="horizontal")
		{
			dx = 1;
			dy = 0;
			current_x = current_x - degree;
		}
		
		else if(type_of_impact == "vertical")
		{
			dx = 0;
			dy = 1;
			current_y = current_y - degree;
		}

		else if(type_of_impact == "diagonal-left-to-right")
		{
			dx = 1;
			dy = 1;
			current_x = current_x - degree;
			current_y = current_y - degree;
		}

		else if(type_of_impact == "diagonal-right-to-left")
		{
			dx = -1;
			dy = 1;
			current_x = current_x + degree;
			current_y = current_y - degree;
		}




		for(ctr=0; ctr<=3; ctr++){

			if (ball_color == red) 
				document.getElementById("PlayPanel").innerHTML = document.getElementById("PlayPanel").innerHTML + 
				'<div id="ball' + '" style="position:absolute; top:'+((current_y-1)*60+68)+'px; left:'+(current_x*60+3)+
				'px;"><img src="images/RED_WINNER.gif" class="circle"> </div>';

				
			
			if (ball_color == black) 
				document.getElementById("PlayPanel").innerHTML = document.getElementById("PlayPanel").innerHTML + 
				'<div id="ball' + '" style="position:absolute; top:'+((current_y-1)*60+68)+'px; left:'+(current_x*60+3)+
				'px;"><img src="images/BLACK_WINNER.gif" class="circle"> </div>';

			current_x += dx;
			current_y += dy;

		}





	}


</script>
</head>































<body>
	<div id="whose_turn">
		
	</div>

	<div id="gameboard">
		
		<img src="images/column.png" onclick="drop_ball(0)" class="column"> 
		<img src="images/column.png" onclick="drop_ball(1)" class="column"> 
		<img src="images/column.png" onclick="drop_ball(2)" class="column"> 
		<img src="images/column.png" onclick="drop_ball(3)" class="column"> 
		<img src="images/column.png" onclick="drop_ball(4)" class="column"> 
		<img src="images/column.png" onclick="drop_ball(5)" class="column"> 
		<img src="images/column.png" onclick="drop_ball(6)" class="column">
		
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
</script>



</html>