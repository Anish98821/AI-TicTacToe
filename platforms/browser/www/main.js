playerSpace = []
playerPoints = 0
compPoints = 0 
compSpace= []
filledSpaces = 0
varGameOver = false
center = document.getElementById("22")
console.log(center.onclick)
cornerSpaces = [document.getElementById('11'),
				document.getElementById('13'),
				document.getElementById('31'),
				document.getElementById('33')]
freeSpace = document.getElementsByClassName('free')
firstChance = true
whoseTurn = 'computer'
function onClick(row,column)
{
	temp = document.getElementById(row+column)
	temp.src = 'x.png'
	temp.onclick = ''
	temp.className = 'player'
	filledSpaces += 1
	playerSpace.push(row+column)
	if(firstChance)
	{
		if(center.className == 'free')
		{
		center.src = "o.png"
		center.onclick = ''
		center.className = 'computer'
		compSpace.push(center.id)
		filledSpaces += 1
		//whoseTurn = 'player'
		firstChance = false
		console.log("FirstChance: Center\nId:"+center.id+"\nWhose turn:"+whoseTurn)
		console.log(playerSpace)
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
		console.log("FirstChance: Corner\nId:"+center.id+"\nWhose turn:"+whoseTurn)
		console.log(playerSpace)
		return
	}
}		
	if(allCompChecks())
	if (rowCheck() != 'blocked' && varGameOver == false)
	if (columnCheck() != 'blocked' && varGameOver == false)
	if (rightDiagonalCheck() != 'blocked' && varGameOver == false)
	leftDiagonalCheck()
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
	console.log("generated Randomly(corner): \nId:"+selected.id+"\nWhose turn:"+whoseTurn)
	console.log(playerSpace)
	}
	else
	{
	console.log("filled :" + filledSpaces)	
	if(filledSpaces == 9)
	alert('Its a draw!')
	else{	
	freeSpace = document.getElementsByClassName('free')
	selected = freeSpace[Math.floor(Math.random() * freeSpace.length)]
	selected.src = "o.png"
	selected.onclick = ''
	selected.className = 'computer'
	filledSpaces += 1
	compSpace.push(selected.id)
	console.log("generated Randomly: \nId:"+selected.id+"\nWhose turn:"+whoseTurn)
	console.log(playerSpace)
	}
}
}
}
function rowCheck()
{
	inARow = 0
	for(i = 0; i < playerSpace.length; i++)
	{	
	for(j = i+1; j < playerSpace.length; j++)
	{
		if(playerSpace[i][0] == playerSpace[j][0])
		{
			inARow += 1
			blockResult = block(playerSpace[i][0].toString(),logic(playerSpace[i][1],playerSpace[j][1]),"rowCheck")
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
	inAColumn = 0
	for(i = 0; i < playerSpace.length; i++)
	{
	for(j = i + 1; j < playerSpace.length; j++)
	{
		if(playerSpace[i][1] == playerSpace[j][1])
		{
			inAColumn += 1
			blockResult = block(logic(playerSpace[i][0],playerSpace[j][0]),playerSpace[j][1].toString(),"columnCheck")
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
	inRightDiagonal = []
	for(i = 0; i < playerSpace.length; i++)
	{
	if(parseInt(playerSpace[i][0]) + parseInt(playerSpace[i][1])==4)
	inRightDiagonal.push(playerSpace[i])
}
	if(inRightDiagonal.length == 2)
	{
		blockResult = block(logic(inRightDiagonal[0][0],inRightDiagonal[1][0]),logic(inRightDiagonal[0][1],inRightDiagonal[1][1]),"rDiagonalcheck")
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
	inLeftDiagonal = []
	for(i = 0; i < playerSpace.length; i++)
	{
	if(parseInt(playerSpace[i][0]) == parseInt(playerSpace[i][1]))
	inLeftDiagonal.push(playerSpace[i])
	}
	if(inLeftDiagonal.length == 2)
	{

		blockResult = block(logic(inLeftDiagonal[0][0],inLeftDiagonal[1][0]),logic(inLeftDiagonal[0][1],inLeftDiagonal[1][1]),"lDiagonalcheck")
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
			blockResult = block(logic(compSpace[i][0],compSpace[j][0]),compSpace[j][1].toString(),"CompcolumnCheck")
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
	//console.log("Compspace[k] = "+compSpace[k])
	if(parseInt(compSpace[k][0]) + parseInt(compSpace[k][1])==4)
	{
	inRightDiagonalComp.push(compSpace[k])
	if(inRightDiagonalComp.length == 2)
	{
		blockResult = block(logic(inRightDiagonalComp[0][0],inRightDiagonalComp[1][0]),logic(inRightDiagonalComp[0][1],inRightDiagonalComp[1][1]),"ComprDiagonalcheck")
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
		blockResult = block(logic(inLeftDiagonalComp[0][0],inLeftDiagonalComp[1][0]),logic(inLeftDiagonalComp[0][1],inLeftDiagonalComp[1][1]),"ComplDiagonalcheck")
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

function logic(x,y)
{
num = ['1','2','3']
num.splice(num.indexOf(x), 1)
num.splice(num.indexOf(y), 1 )
return num[0] 
}

function block(x,y,caller)
{
	temp = document.getElementById(x+y)
	console.log("Blocked:\nTo block: "+x+y+"\n Its class:"+temp.className)
	console.log("Caller:"+caller)
	if(temp.className == 'free')
	{
		temp.src = "o.png"
		temp.onclick = ''
		temp.className = 'computer'
		compSpace.push(x+y)
		whoseTurn = 'player'
		console.log(compSpace)	
		filledSpaces += 1
		return true

	}
	else return false
}

function gameOver()
{
	varGameOver = true
	allSpaces = document.getElementsByTagName("img")
	for(i=0;i<allSpaces.length;i++)
	allSpaces[i].onclick = ""
}

function newGame()
{
	allSpaces = document.getElementsByTagName("img")
	for(i=0;i<allSpaces.length;i++)
	{
	x = allSpaces[i].id.toString()
	xVar = 'onClick("'+x[0]+'","'+x[1]+'")'
	console.log(x)
	allSpaces[i].setAttribute("onclick",xVar)
	/*allSpaces[i].onclick = 
	function()
	{
		console.log(
		onClick(x[0].toString(),x[1].toString())
	}*/
	console.log(x[0],x[1])
	console.log("onClick: "+allSpaces[i].onclick)
	allSpaces[i].src = "white.png"
	allSpaces[i].className = "free"
	}
	playerSpace = []
	compSpace= []
	filledSpaces = 0
	varGameOver = false
	cornerSpaces = [document.getElementById('11'),
					document.getElementById('13'),
					document.getElementById('31'),
					document.getElementById('33')]
	freeSpace = document.getElementsByClassName('free')
	firstChance = true
	whoseTurn = 'computer'	
}
