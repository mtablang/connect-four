

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
var outside = 69;

var first_player = red;
var second_player = -(first_player);
var current_player = first_player;
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
		
	var debug = false;

	chance = new Array(0,0,0,0,0,0,0);
	chance[0] = Math.random();
	chance[1] = Math.random();
	chance[2] = Math.random();
	chance[3] = Math.random();
	chance[4] = Math.random();
	chance[5] = Math.random();
	chance[6] = Math.random();

	var best_column = 0;
	var greatest_chance = -10000;

	for(i=0;i<=6;i++){

		//CASES 1-4: Connect-4 Cases

		//CASE 1:
		//Connect-4 for AI (Winning column for AI).
		if(win_checker(i, heightCounter[i], second_player, 3).hasWon)
		{		
			chance[i] += 500;
			if(debug)alert("<" + i + ">   case 1   (chance:" + Math.round(chance[i]*100)/100 + ")");
		}
	
		//CASE 2:
		//Connect-4 for Human (Prevent an immediate human win).
		if(win_checker(i, heightCounter[i], first_player, 3).hasWon)
		{		
			chance[i] += 400;
			if(debug)alert("<" + i + ">   case 2   (chance:" + Math.round(chance[i]*100)/100 + ")");
		}

		//CASE 3:
		//Connect-4 for Human at next turn (Human can win next turn if AI chooses this same column -- so don't choose it).
		if(win_checker(i, heightCounter[i]-1, first_player, 3).hasWon)
		{		
			chance[i] -= 300;
			if(debug)alert("<" + i + ">   case 3   (chance:" + Math.round(chance[i]*100)/100 + ")");
		}

		//CASE 4:
		//Connect-4 for AI at next turn (Human can prevent it right away so avoid it as much as possible).
		if(win_checker(i, heightCounter[i]-1, second_player, 3).hasWon)
		{		
			chance[i] -= 50;
			if(debug)alert("<" + i + ">   case 4   (chance:" + Math.round(chance[i]*100)/100 + ")");
		}



		//CASES 5-8: Connect-3/4 Cases

		//CASE 5:
		//Connect-3/4 for AI (This is wanted).
		if(win_checker(i, heightCounter[i], second_player, 2).hasWon)
		{		
			//Add the number of connections that can be made to the chance.
			chance[i] += 200 + (((win_checker(i, heightCounter[i], second_player, 2).number_of_connect_fours)-1)*5);
			if(debug)alert("<" + i + ">   case 5   (chance:" + Math.round(chance[i]*100)/100 + ")");
		}

		//CASE 6:
		//Connect-3/4 for human (Prevent a human 3/4-ball-sequence).
		if(win_checker(i, heightCounter[i], first_player, 2).hasWon)
		{		
			//Add the number of connections that can be prevented to the chance.
			chance[i] += 150 + (((win_checker(i, heightCounter[i], first_player, 2).number_of_connect_fours)-1)*5);
			if(debug)alert("<" + i + ">   case 6   (chance:" + Math.round(chance[i]*100)/100 + ")");
		}

		//CASE 7:
		//Connect-3/4 for human at next turn (Should not be chosen as much as possible).
		if(win_checker(i, heightCounter[i]-1, first_player, 2).hasWon)
		{		
			chance[i] -= 30;
			if(debug)alert("<" + i + ">   case 7   (chance:" + Math.round(chance[i]*100)/100 + ")");
		}

		//CASE 8:
		//Connect-3/4 for AI at next turn (This is wanted).
		if(win_checker(i, heightCounter[i]-1, second_player, 2).hasWon)
		{		
			chance[i] += 30;
			if(debug)alert("<" + i + ">   case 8   (chance:" + Math.round(chance[i]*100)/100 + ")");
		}



		//CASES 9-10: Connect-2/4 Cases

		//CASE 9:
		//Connect-2/4 for AI (This is wanted).
		if(win_checker(i, heightCounter[i], second_player, 1).hasWon)
		{		
			//Add the number of connections that can be made to the chance.
			chance[i] += 10 + (((win_checker(i, heightCounter[i], second_player, 1).number_of_connect_fours)-1)*5);
			if(debug)alert("<" + i + ">   case 9   (chance:" + Math.round(chance[i]*100)/100 + ")");
		}

		//CASE 10:
		//Connect-2/4 for human (Prevent a human 2/4-ball-sequence).
		if(win_checker(i, heightCounter[i], first_player, 1).hasWon)
		{		
			//Add the number of connections that can be prevented to the chance.
			chance[i] += 10 + (((win_checker(i, heightCounter[i], first_player, 1).number_of_connect_fours)-1)*5);
			if(debug)alert("<" + i + ">   case 10   (chance:" + Math.round(chance[i]*100)/100 + ")");
		}


	}

		
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
	if (win_checker(column_number, heightCounter[column_number]+1, current_player, 4).hasWon) 
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
		else if((game_type=="AI")&&(ball_color==second_player)){
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
		if(winning_player == first_player){
			winner = player1name;
		}
		else if(winning_player == second_player){
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





function win_checker(x, y, ball_color, sequence_goal, heuristic_check)
{
	var inner_ctr, outer_ctr;
	var sum1,sum2,sum3,sum4;
	var youShallNotPass1,youShallNotPass2,youShallNotPass3,youShallNotPass4;
	var ball_color2;
	var youreWinner=false;
	var connect_four_ctr = 0;


	ball_color2 = -ball_color;

	
	var heuristic_check = false;
	if(sequence_goal != 4){
		heuristic_check = true;
	}



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


		if ((sum1 >= sequence_goal) && (youShallNotPass1 == 0)) 
		{
			type_of_impact = "horizontal";
			if(!heuristic_check){
				lightTheBalls(x, y, outer_ctr, type_of_impact, ball_color);
			}

			youreWinner = true;
			connect_four_ctr++;
		} 

		if ((sum2 >= sequence_goal) && (youShallNotPass2 == 0)) 
		{
			type_of_impact = "vertical";
			if(!heuristic_check){
				lightTheBalls(x, y, outer_ctr, type_of_impact, ball_color);
			}

			youreWinner = true;
			connect_four_ctr++;
		}

		if ((sum3 >= sequence_goal) && (youShallNotPass3 == 0)) 
		{
			type_of_impact = "diagonal-left-to-right";//L to R, from top
			if(!heuristic_check){
				lightTheBalls(x, y, outer_ctr, type_of_impact, ball_color);
			}

			youreWinner = true;
			connect_four_ctr++;
		} 

		if ((sum4 >= sequence_goal) && (youShallNotPass4 == 0)) 
		{
			type_of_impact = "diagonal-right-to-left";//R to L, from top
			if(!heuristic_check){
				lightTheBalls(x, y, outer_ctr, type_of_impact, ball_color);
			}

			youreWinner = true;
			connect_four_ctr++;
		};

	}
	return {
		hasWon: youreWinner,
		number_of_connect_fours: connect_four_ctr 
	};
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