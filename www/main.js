/*Welcome to the source code for AI Tic-Tac-Toe,the Tic-Tac-Toe game that
  you can never beat. Note that this does not mean that the computer always 
  wins against the player. This simply means that the the game always end in a
  draw or the computer wins. This is because if two experienced players are
  playing against each other then the game will always end in draw.I have divided 
  the code into several small sections.Ok now on with the code.. 
 */
///////////////////////////////////////////////////////////////// 
//Some basic variable declarions etc. I dont think I need to explain them. 
playerSpace = []
playerPoints = 0
compPoints = 0 
compSpace= []
filledSpaces = 0
varGameOver = false
varSpecialCase = true
center = document.getElementById("22")
edgeSpaces = [document.getElementById('12'),
			  document.getElementById('21'),
			  document.getElementById('23'),
			  document.getElementById('32')]
cornerSpaces = [document.getElementById('11'),
				document.getElementById('13'),
				document.getElementById('31'),
				document.getElementById('33')]//Array of all corner pieces
freeSpace = document.getElementsByClassName('free')//Bascically an array af all "playable" spaces 
firstChance = true//Variable to check if its the computer's first chance. You will know why later. 
whoseTurn = 'computer'
///////////////////////////////////////////////////////////////////
function onClick(row,column)
/*Ok. Now the way this program works is by marking a space either randomly or by blocking a potential
 straight line by the player.
 This function executes any time the player marks an unmarked space */
{
/////////////////////////////////////////////////////////////////////////////////
//This section just changes the attributes of the clicked square
	temp = document.getElementById(row+column)
	temp.src = 'x.png'
	temp.onclick = ''
	temp.className = 'player'
	filledSpaces += 1
	playerSpace.push(row+column)
//////////////////////////////////////////////////////////////////////////////////
	if(firstChance)
	/*This section executes if its the computer's first chance.Any experienced player will tell
	you that your first move should be either on the corner or the center.This way ensure atleast
	a draw. 
	*/
	{
		if(center.className == 'free')
		{
		center.src = "o.png"
		center.onclick = ''
		center.className = 'computer'
		compSpace.push(center.id)
		filledSpaces += 1
		firstChance = false
		return
		}
		else
		{
		for(i = 0; i<cornerSpaces.length ; i++)
		{
			if(cornerSpaces[i].className != 'free')
			cornerSpaces.splice(cornerSpaces.indexOf(cornerSpaces[i]), 1 )
		}
		selected = cornerSpaces[Math.floor(Math.random() * cornerSpaces.length)]
		selected.src = "o.png"
		selected.onclick = ''
		selected.className = 'computer'
		compSpace.push(selected.id)
		firstChance = false
		filledSpaces += 1
		return
	}
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////		
// These functions are explained during their definations.
//In short these functions check for potential straight lines on the player's side and blocks them.
	if(allCompChecks())
	if(specialCase() != 'blocked' && varGameOver == false)
	if (rowCheck() != 'blocked' && varGameOver == false)
	if (columnCheck() != 'blocked' && varGameOver == false)
	if (rightDiagonalCheck() != 'blocked' && varGameOver == false)
	leftDiagonalCheck()
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Something that I noticed during testing was that the player was able to win the match sometimes
if the computer didn't mark on the corner if some of the corners were avalible. So this section ensure
 that the computer always marks the corners if they are avalible*/  
	if(whoseTurn == 'computer' && varGameOver == false)
	{
	freeCornerSpaces = []
	for(i =0;i<cornerSpaces.length;i++)
	if(cornerSpaces[i].className == "free")
	freeCornerSpaces.push(cornerSpaces[i])
	if(freeCornerSpaces.length != 0)
	{
	selected = freeCornerSpaces[Math.floor(Math.random() * freeCornerSpaces.length)]
	selected.src = "o.png"
	selected.onclick = ''
	selected.className = 'computer'
	filledSpaces += 1
	compSpace.push(selected.id)
	}
//////////////////////////////////////////////////////////////////////////////////////////////////////////
	else
	{
	if(filledSpaces == 9)//Executes when all spaces are marked i.e. the game ends in a draw. 
	alert('Its a draw!')
	else//Executes when there are no potential threats.
	{	
	freeSpace = document.getElementsByClassName('free')
	selected = freeSpace[Math.floor(Math.random() * freeSpace.length)]
	selected.src = "o.png"
	selected.onclick = ''
	selected.className = 'computer'
	filledSpaces += 1
	compSpace.push(selected.id)
	}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
}
}
function rowCheck()
/*This function checks if there are potential "threats" in the form of rows.
The way it works is by comparing the first part of the id of an space occupied 
by the player to others and blocking them if a match is found.
*/
{
	inARow = 0
	for(i = 0; i < playerSpace.length; i++)
	{	
	for(j = i+1; j < playerSpace.length; j++)
	{
		if(playerSpace[i][0] == playerSpace[j][0])
		{
			inARow += 1
			blockResult = block(playerSpace[i][0].toString(),logic(playerSpace[i][1],playerSpace[j][1]))
			whoseTurn = 'player'
			if(blockResult)return "blocked"
		}
		if (inARow == 2)
		{
			alert("You Win!(rc)")
			playerPoints++
			playerScore = document.getElementById('playerPoints')
			playerScore.innerHTML = "Player: "+playerPoints
			gameOver()
			return
		}
	}
	inARow = 0 
	}
	whoseTurn = 'computer'
}
function columnCheck()
{
//Same logic as in rows but does it columns
	inAColumn = 0
	for(i = 0; i < playerSpace.length; i++)
	{
	for(j = i + 1; j < playerSpace.length; j++)
	{
		if(playerSpace[i][1] == playerSpace[j][1])
		{
			inAColumn += 1
			blockResult = block(logic(playerSpace[i][0],playerSpace[j][0]),playerSpace[j][1].toString())
			whoseTurn = 'player'
			if(blockResult)return "blocked"
		}
		if (inAColumn == 2)
		{
			alert("You Win!(cc)")
			playerPoints++
			playerScore = document.getElementById('playerPoints')
			playerScore.innerHTML = "Player: "+playerPoints
			gameOver()
			break
		}
	}
	inAColumn = 0 
	}
	whoseTurn = 'computer'
}

function rightDiagonalCheck()
{
/*Checks for a diagonal tilting towards the right ie like this "/". If you observe, you will notice that
the x and y part of the id adds upto 4. I used this as an method to identify "right diagonals"    
*/
	inRightDiagonal = []
	for(i = 0; i < playerSpace.length; i++)
	{
	if(parseInt(playerSpace[i][0]) + parseInt(playerSpace[i][1])==4)
	inRightDiagonal.push(playerSpace[i])
}
	if(inRightDiagonal.length == 2)
	{
		blockResult = block(logic(inRightDiagonal[0][0],inRightDiagonal[1][0]),logic(inRightDiagonal[0][1],inRightDiagonal[1][1]))
		whoseTurn = 'player'
		if(blockResult)return "blocked"
		else
		{ 
		whoseTurn = 'computer'
		return "Already Blocked"
		}
	}
	if(inRightDiagonal.length == 3)
	{
		alert("You win(rdc)")
		playerPoints++
		playerScore = document.getElementById('playerPoints')
		playerScore.innerHTML = "Player: "+playerPoints
		gameOver()
		return
	}
	
}

function leftDiagonalCheck()
{
//Same as right diagonals but instead operates on left side tilting diagonals
	inLeftDiagonal = []
	for(i = 0; i < playerSpace.length; i++)
	{
	if(parseInt(playerSpace[i][0]) == parseInt(playerSpace[i][1]))
	inLeftDiagonal.push(playerSpace[i])
	}
	if(inLeftDiagonal.length == 2)
	{

		blockResult = block(logic(inLeftDiagonal[0][0],inLeftDiagonal[1][0]),logic(inLeftDiagonal[0][1],inLeftDiagonal[1][1]))
		whoseTurn = 'player'
		if(blockResult)return "blocked"
		else
		{
		whoseTurn = 'computer'
		return "Already Blocked"
		}
	}
	if(inLeftDiagonal.length == 3)
	{
		alert("You win(ldc)")
		playerPoints++
		playerScore = document.getElementById('playerPoints')
		playerScore.innerHTML = "Player: "+playerPoints
		gameOver()
		return
	}
}

function allCompChecks()
{
/*Basically a combination of all previous checks but instead checks on the computer occupied space and blocks itself.
This is necessary since we dont want the computer to slip an opportunity to win*/ 
inARow = 0
inAColumn = 0
inRightDiagonalComp = []
inLeftDiagonalComp = []

	for(i = 0; i < compSpace.length; i++)	
	for(j = i+1; j < compSpace.length; j++)
	{
//////////////////////////////////////////////////////Row Check//////////////////////////////////////////////////////
		if(compSpace[i][0] == compSpace[j][0])
		{
			blockResult = block(compSpace[i][0].toString(),logic(compSpace[i][1],compSpace[j][1]),"ComprowCheck")
			if(blockResult)
			{
				alert("Computer won!")
				compPoints++
				compScore = document.getElementById('compPoints')
				compScore.innerHTML = "Computer: "+compPoints
				gameOver()
				return
			}
		}
/////////////////////////////////////////////////////Column Check////////////////////////////////////////////////////
		else if(compSpace[i][1] == compSpace[j][1])
		{
			blockResult = block(logic(compSpace[i][0],compSpace[j][0]),compSpace[j][1].toString())
			if(blockResult)
			{
				alert("Computer won!")
				compPoints++
				compScore = document.getElementById('compPoints')
				compScore.innerHTML = "Computer: "+compPoints
				gameOver()
				return 
			}
		}
	}
///////////////////////////////////////////////////////Right Diagonal Check//////////////////////////////////////////////////////////////	
	for(k=0;k < compSpace.length;k++)
	{
	if(parseInt(compSpace[k][0]) + parseInt(compSpace[k][1])==4)
	{
	inRightDiagonalComp.push(compSpace[k])
	if(inRightDiagonalComp.length == 2)
	{
		blockResult = block(logic(inRightDiagonalComp[0][0],inRightDiagonalComp[1][0]),logic(inRightDiagonalComp[0][1],inRightDiagonalComp[1][1]))
		whoseTurn = 'player'
		if(blockResult)
		{
		alert("Computer won!")
		compPoints++
		compScore = document.getElementById('compPoints')
		compScore.innerHTML = "Computer: "+compPoints
		gameOver()
		return
		}
	}
	else if(inRightDiagonalComp.length == 3)
	{
		alert("Computer won!")
		compPoints++
		compScore = document.getElementById('compPoints')
		compScore.innerHTML = "Computer: "+compPoints
		gameOver()
		return	
	}
	}
///////////////////////////////////////////////////////////Left Diagonal Check////////////////////////////////////////////////////////////
	if(parseInt(compSpace[k][0]) == parseInt(compSpace[k][1]))
	{
	inLeftDiagonalComp.push(compSpace[k])
	if(inLeftDiagonalComp.length == 2)
	{
		blockResult = block(logic(inLeftDiagonalComp[0][0],inLeftDiagonalComp[1][0]),logic(inLeftDiagonalComp[0][1],inLeftDiagonalComp[1][1]))
		whoseTurn = 'player'
		if(blockResult)
		{
		alert("Computer won!")
		compPoints++
		compScore = document.getElementById('compPoints')
		compScore.innerHTML = "Computer: "+compPoints
		gameOver()
		return 		
		}
	}
	else if(inLeftDiagonalComp.length == 3)
	{
		alert("Computer won!")
		compPoints++
		compScore = document.getElementById('compPoints')
		compScore.innerHTML = "Computer: "+compPoints
		gameOver()
		return
	}
	}
	}
return 1	
}

function specialCase()
{
	for(i = 0; i < playerSpace.length; i++)
	for(j = i + 1; j < playerSpace.length; j++)
	{
		if//Broken down the conditions to diffrent lines so that it will be easy to under
		(
		varSpecialCase == true && 
		(
		((playerSpace[i] == '11' && playerSpace[j] == '33')||(playerSpace[j] == '11' && playerSpace[i] == '33'))
		//Checks for an left diagonal.The 'or' condition in between ensures that this block executes no matter what order the buttons are pressed
		 ||
		((playerSpace[i] == '13' && playerSpace[j] == '31')||playerSpace[j] == '13' && playerSpace[i] == '31'))
		//Similarly checks for right diagonal
		)
		{
			freeEdgeSpaces = []
			for(i =0;i<edgeSpaces.length;i++)
			if(edgeSpaces[i].className == "free")
			freeEdgeSpaces.push(edgeSpaces[i])
			if(freeEdgeSpaces.length != 0)
			{
			selected = freeEdgeSpaces[Math.floor(Math.random() * freeEdgeSpaces.length)]	
			}
			varSpecialCase = false
			block(selected.id[0],selected.id[1])
			varSpecialCase = false
			return 'blocked'
		
		}
	}	
}

function logic(x,y)
{
//This piece of code takes 2 numbers as arguments and returns the third in the list of "1,2,3".
//The computer uses this to identify the id of the unoccuied space to be blocked. 
num = ['1','2','3']
num.splice(num.indexOf(x), 1)
num.splice(num.indexOf(y), 1 )
return num[0] 
}

function block(x,y)
{
//The function blocks marks the space on behalf of the computer
	temp = document.getElementById(x+y)
	if(temp.className == 'free')
	{
		temp.src = "o.png"
		temp.onclick = ''
		temp.className = 'computer'
		compSpace.push(x+y)
		whoseTurn = 'player'
		filledSpaces += 1
		return true

	}
	else return false
}

function gameOver() //Executes when the game ends
{
	varGameOver = true
	allSpaces = document.getElementsByTagName("img")
	for(i=0;i<allSpaces.length;i++)
	allSpaces[i].onclick = ""
}

function newGame()//Resets the whole board
{
	allSpaces = document.getElementsByTagName("img")
	for(i=0;i<allSpaces.length;i++)
	{
	x = allSpaces[i].id.toString()
	xVar = 'onClick("'+x[0]+'","'+x[1]+'")'
	allSpaces[i].setAttribute("onclick",xVar)
	allSpaces[i].src = "white.png"
	allSpaces[i].className = "free"
	}
	playerSpace = []
	compSpace= []
	filledSpaces = 0
	varGameOver = false
	varSpecialCase = true
	cornerSpaces = [document.getElementById('11'),
					document.getElementById('13'),
					document.getElementById('31'),
					document.getElementById('33')]
	freeSpace = document.getElementsByClassName('free')
	firstChance = true
	whoseTurn = 'computer'	
}
/*That was it. For more such projects visit my GitHub profile:
www.github.com/anish98821
For short scripts and other codes visit:
gist.github.com/anish98821
Coded by: Anish U
*/
