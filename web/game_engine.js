

board_holes    = new Array(0,0,0,0,0,0,0);
board_holes[0] = new Array(0,0,0,0,0,0);//Column 0
board_holes[1] = new Array(0,0,0,0,0,0);//Column 1
board_holes[2] = new Array(0,0,0,0,0,0);//Column 2
board_holes[3] = new Array(0,0,0,0,0,0);//Column 3
board_holes[4] = new Array(0,0,0,0,0,0);//Column 4
board_holes[5] = new Array(0,0,0,0,0,0);//Column 5
board_holes[6] = new Array(0,0,0,0,0,0);//Column 6

//Height counter for the 7 columns. Full if reaches -1.
heightCounter =  new Array(5,5,5,5,5,5,5);

//Ball Type Constants
var red = 1;
var black = -1;
var outside = 0;

var first_move = red;
var second_move = -(first_move);
var current_player = first_move;
var current_player_name = player1name;

var globalBallNumber = 0;
var game_over = false;
var hasBallDropped = true;





function drop_from_human(column_number)
{
	if((!game_over) && (hasBallDropped) && (heightCounter[column_number] != -1)){
				
		drop_ball(column_number);
		
		//Case: Continue Game
		if (!game_over) {

			changeTurn();
	
			if(game_type=="AI"){				
				
				setTimeout(function() {
				    drop_ball(best_column_heuristic());
					
					if(!game_over){
						changeTurn();
					}

				}, (300));

			}
		}

	}
}





function changeTurn(){
		
	if(current_player_name == player1name)
	{
		current_player_name = player2name;
	}else
	{
		current_player_name = player1name;
	}

	if(current_player==red){
		current_player = black;
		document.getElementById("whose_turn").innerHTML =  '<b><u>' + current_player_name + '\'s</u></b> Turn'
		document.getElementById("whose_turn").style.backgroundColor = "#000";
	}
	else if(current_player == black){
		current_player = red;
		document.getElementById("whose_turn").innerHTML =  '<b><u>' + current_player_name + '\'s</u></b> Turn'
		document.getElementById("whose_turn").style.backgroundColor = "#ed303c";
	}

}





function best_column_heuristic(){
		
	chance = new Array(0,0,0,0,0,0,0);
	chance[0] = Math.random();
	chance[1] = Math.random();
	chance[2] = Math.random();
	chance[3] = Math.random();
	chance[4] = Math.random();
	chance[5] = Math.random();
	chance[6] = Math.random();

	var best_column = -1;
	var greatest_chance = -1;
		
	for(i=0;i<=6;i++){
		if ((chance[i] > greatest_chance) && (heightCounter[i]!=-1))
		{
			greatest_chance = chance[i];
			best_column = i;
		}
	}

	return best_column;
}





function drop_ball(column_number){

	animate_fall(column_number, heightCounter[column_number], 0, current_player, globalBallNumber++, true);
	
	board_holes[column_number][heightCounter[column_number]] = current_player;
	heightCounter[column_number]--;

	var audio = new Audio('sounds/Blop-Mark_DiAngelo-79054334.mp3');
	audio.play();
	

	//Case: Win!
	if (win_checker(column_number, heightCounter[column_number]+1, current_player) == true) 
	{
		game_over=true;
	
		setTimeout(function() {
			show_results(current_player, false);
			var audio = new Audio('sounds/Ta Da-SoundBible.com-1884170640.mp3');
			audio.play();
		}, (50));
	
	}


	//Case: Draw (All columns have been filled!)
	if (
		(heightCounter[0] == -1) && 
		(heightCounter[1] == -1) && 
		(heightCounter[2] == -1) && 
		(heightCounter[3] == -1) && 
		(heightCounter[4] == -1) && 
		(heightCounter[5] == -1) && 
		(heightCounter[6] == -1)) 
	{
		game_over=true;
		show_results(current_player, true);
	}

}





function animate_fall(column_number, goal_height, current_height, ball_color, ball_num, first_recursion_pass)
{

	if(first_recursion_pass){
		
		hasBallDropped = false;

		if (ball_color == red) 
			document.getElementById("PlayPanel").innerHTML = document.getElementById("PlayPanel").innerHTML + 
			'<div id="ball' + ball_num + '" style="position:absolute; top:'+(current_height)+'px; left:'+((column_number*60) +3)+
			'px;"><img src="images/red-circle.png" class="circle"> </div>';

			

		if (ball_color == black) 
			document.getElementById("PlayPanel").innerHTML = document.getElementById("PlayPanel").innerHTML + 
			'<div id="ball' + ball_num + '"style="position:absolute; top:'+(current_height)+'px; left:'+((column_number*60) +3)+
			'px;"><img src="images/black-circle.png" class="circle"> </div>';
	
	}

	falling_ball = document.getElementById("ball"+ball_num);

	if(current_height > ((goal_height*60) +8)){
		falling_ball.style.top = (goal_height*60) +8;
		
		if(game_type=="Human"){
			hasBallDropped = true;
		}
		else if((game_type=="AI")&&(ball_color==second_move)){
			//In AI mode, make sure that the AI ball has landed first before letting the human player click.
			hasBallDropped = true;
		}
	
	}
	else{
		falling_ball.style.top = current_height + 'px';
		setTimeout(function(){animate_fall(column_number, goal_height, current_height+5, ball_color, ball_num, false)}, 1);
	}
		
}





function get(column_number, row_number)
{
	if ((column_number < 0) || (column_number > 6) || (row_number < 0) || (row_number > 5)) 
	{
		return outside;
	}
	else 
	{
		return (board_holes[column_number][row_number]);
	}
}





function show_results(winning_player, draw_game){
	
	if(!draw_game){
		if(winning_player == first_move){
			winner = player1name;
		}
		else if(winning_player == second_move){
			winner = player2name;
		}

		document.getElementById("results").innerHTML =  
		'<h3><b>'+ winner +' wins!</b></h3>' + document.getElementById("results").innerHTML;

		document.getElementById("results").style.opacity = 1;
	}

	else{
		document.getElementById("results").innerHTML =  
		"<h3><b>It is a draw!</b></h3>" + document.getElementById("results").innerHTML;

		document.getElementById("results").style.opacity = 1;
	}

}





function win_checker(x, y, ball_color)
{
	var inner_ctr, outer_ctr;
	var sum1,sum2,sum3,sum4;
	var youShallNotPass1,youShallNotPass2,youShallNotPass3,youShallNotPass4;
	var ball_color2;
	var youreWinner=false;


	ball_color2 = -ball_color;


	/*Check the whole board for cases:
	Magsisimula sa x and y, tapos, sa inner loop, may checking for horizontal (pakanan), vertical (pababa), diagonals (L-R, R-L; from top). 
	Kapag di nakakita: kakaliwa from x, tataas from y , tataas (and <kakaliwa OR kakanan>) from diagonals ng 1 step. Gagawin to 4 times (outer loop).
	4 times... kasi kailangan i-handle yung worst case na pa-horizontal kapag galing sa column 7.
	So basically, ichecheck ng inner loop yung 4 paabante, tapos pag di nakakita, i-aatras ng outer loop yung checking ng 1.
	Kapag lumagpas sa grid (will happen in the inner loops of non-worst cases), or nakatagpo ng other ball color, mag-fafalse yung inner loop. */

	for (outer_ctr=0; outer_ctr<=3; outer_ctr++)
	{
		sum1 = 0;
		sum2 = 0;
		sum3 = 0;
		sum4 = 0;
		youShallNotPass1 = 0;
		youShallNotPass2 = 0;
		youShallNotPass3 = 0;
		youShallNotPass4 = 0;

		for(inner_ctr=0;inner_ctr<=3;inner_ctr++)
		{

			//Check kung "You're" Winner
			if (get(x-outer_ctr+inner_ctr,	y) == ball_color) {sum1++};//I-check ang pa-horizontal...(pakanan)
			if (get(x,	y-outer_ctr+inner_ctr) == ball_color) {sum2++};//I-check ang pa-vertical...(pababa)
			if (get(x-outer_ctr+inner_ctr,	y-outer_ctr+inner_ctr) == ball_color) {sum3++};//I-check ang pa-diagonal... (left to right, from top)
			if (get(x+outer_ctr-inner_ctr,	y-outer_ctr+inner_ctr) == ball_color) {sum4++};//I-check ang pa-diagonal... (right to left, from top)


			//Same checking pero for the other ball. Kapag naka-encounter ng at least 1, "You shall not pass" - Gandalf
			if (get(x-outer_ctr+inner_ctr,	y) == ball_color2) {youShallNotPass1++};
			if (get(x,	y-outer_ctr+inner_ctr) == ball_color2) {youShallNotPass2++};
			if (get(x-outer_ctr+inner_ctr,	y-outer_ctr+inner_ctr) == ball_color2) {youShallNotPass3++};
			if (get(x+outer_ctr-inner_ctr,	y-outer_ctr+inner_ctr) == ball_color2) {youShallNotPass4++};


			//Same checking pero checks if outside. Kapag naka-encounter ng at least 1, "You shall not pass" - Gandalf
			if (get(x-outer_ctr+inner_ctr,	y) == outside) {youShallNotPass1++};
			if (get(x,	y-outer_ctr+inner_ctr) == outside) {youShallNotPass2++};
			if (get(x-outer_ctr+inner_ctr,	y-outer_ctr+inner_ctr) == outside) {youShallNotPass3++};
			if (get(x+outer_ctr-inner_ctr,	y-outer_ctr+inner_ctr) == outside) {youShallNotPass4++};
		}


		if ((sum1 >= 4) && (youShallNotPass1 == 0)) 
		{
			type_of_impact = "horizontal";
			lightTheBalls(x, y, outer_ctr, type_of_impact, ball_color);

			youreWinner = true
		} 

		if ((sum2 >= 4) && (youShallNotPass2 == 0)) 
		{
			type_of_impact = "vertical";
			lightTheBalls(x, y, outer_ctr, type_of_impact, ball_color);

			youreWinner = true
		}

		if ((sum3 >= 4) && (youShallNotPass3 == 0)) 
		{
			type_of_impact = "diagonal-left-to-right";//L to R, from top
			lightTheBalls(x, y, outer_ctr, type_of_impact, ball_color);

			youreWinner = true
		} 

		if ((sum4 >= 4) && (youShallNotPass4 == 0)) 
		{
			type_of_impact = "diagonal-right-to-left";//R to L, from top
			lightTheBalls(x, y, outer_ctr, type_of_impact, ball_color);

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
			'<div id="ball' + '" style="position:absolute; top:'+((current_y*60) +8)+'px; left:'+((current_x*60) +3)+
			'px;"><img src="images/RED_WINNER.gif" class="circle"> </div>';

			
		
		if (ball_color == black) 
			document.getElementById("PlayPanel").innerHTML = document.getElementById("PlayPanel").innerHTML + 
			'<div id="ball' + '" style="position:absolute; top:'+((current_y*60) +8)+'px; left:'+((current_x*60) +3)+
			'px;"><img src="images/BLACK_WINNER.gif" class="circle"> </div>';

		current_x += dx;
		current_y += dy;

	}
}