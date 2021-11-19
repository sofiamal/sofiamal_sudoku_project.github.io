let filledCells = [];
let cellsToFill = initMatrixArrays(9);
//initialized array with 0 to fill with random numbers
var sudoku = initArrays(81)

// call function fill
fill(sudoku);

// return the filled row 
function returnRow(cell) {
	return Math.floor(cell / 9);
}

// return the filled column
function returnCol(cell) {
	return cell % 9;
}

// return the filled block
function returnBlock(cell) {
	return Math.floor(returnRow(cell) / 3) * 3 + Math.floor(returnCol(cell) / 3);
}

// return true if the number can be placed in the row
function isPossibleRow(number,row,sudoku) {
	for (var i=0; i<=8; i++) {
		if (sudoku[row*9+i] == number) {
			return false;
		}
	}
	return true;
}

// return true if the number can be placed in the column
function isPossibleCol(number,col,sudoku) {
	for (var i=0; i<=8; i++) {
		if (sudoku[col+9*i] == number) {
			return false;
		}
	}
	return true;
}

// return true if the number can be placed in the block
function isPossibleBlock(number,block,sudoku) {
	for (var i=0; i<=8; i++) {
		if (sudoku[Math.floor(block/3)*27+i%3+9*Math.floor(i/3)+3*(block%3)] == number) {
			return false;
		}
	}
	return true;
}

// return true if the number can be placed in the cell
function isPossibleNumber(cell,number,sudoku) {
	var row = returnRow(cell);
	var col = returnCol(cell);
	var block = returnBlock(cell);
	return isPossibleRow(number,row,sudoku) && isPossibleCol(number,col,sudoku) && isPossibleBlock(number,block,sudoku);
}

// return true if it's a legal row (rowTemp filled from  row sudoku variable and sort it to compare if the row dosent have illegal numbers for sudoku )
function isCorrectRow(row,sudoku) {
	var rightSequence = new Array(1,2,3,4,5,6,7,8,9);
	var rowTemp= new Array();
	for (var i=0; i<=8; i++) {
		rowTemp[i] = sudoku[row*9+i];
	}
	rowTemp.sort();
	return rowTemp.join() == rightSequence.join();
}

// return true if it's a legal column (like isCorrectRow but for column)
function isCorrectCol(col,sudoku) {
	var rightSequence = new Array(1,2,3,4,5,6,7,8,9);
	var colTemp= new Array();
	for (var i=0; i<=8; i++) {
		colTemp[i] = sudoku[col+i*9];
	}
	colTemp.sort();
	return colTemp.join() == rightSequence.join();
}

// return true if it's a legal block (like isCorrectRow but for block)
function isCorrectBlock(block,sudoku) {
	var rightSequence = new Array(1,2,3,4,5,6,7,8,9);
	var blockTemp= new Array();
	for (var i=0; i<=8; i++) {
		blockTemp[i] = sudoku[Math.floor(block/3)*27+i%3+9*Math.floor(i/3)+3*(block%3)];
	}
	blockTemp.sort();
	return blockTemp.join() == rightSequence.join();
}

// return true if the compares of isCorrect"""" are true
function isSolvedSudoku(sudoku) {
	for (var i=0; i<=8; i++) {
		if (!isCorrectBlock(i,sudoku) || !isCorrectRow(i,sudoku) || !isCorrectCol(i,sudoku)) {
			return false;
		}
	}
	return true;
}

// return an array with all possible values we can write in the cell(unshift function like push is insert numbers to an array but every time to the first index)
function determinePossibleValues(cell,sudoku) {
	var possible = new Array();
	for (var i=1; i<=9; i++) {
		if (isPossibleNumber(cell,i,sudoku)) {
			possible.unshift(i);
		}
	}
	return possible;
}

// array of possible values to a cell, return a random value picked from the array
function determineRandomPossibleValue(possible,cell) {
	var randomPicked = Math.floor(Math.random() * possible[cell].length);
	return possible[cell][randomPicked];
}

// check unique sudoku 
function scanSudokuForUnique(sudoku) {
	var possible = new Array();
	for (var i=0; i<=80; i++) {
		if (sudoku[i] == 0) {
			possible[i] = new Array();
			possible[i] = determinePossibleValues(i,sudoku);
			if (possible[i].length==0) {
				return false;
			}
		}
	}
	return possible;
}

// remove the number from the array if the number is already exist in the array 
function removeAttempt(attemptArray,number) {
	var newArray = new Array();
	for (var i=0; i<attemptArray.length; i++) {
		if (attemptArray[i] != number) {
			newArray.unshift(attemptArray[i]);
		}
	}
	return newArray;
}

// return the index of a cell for next move to try
function nextRandom(possible) {
	var max = 9;
	var choice = 0;
	for (var i=0; i<=80; i++) {
		if (possible[i]!=undefined) {
			if ((possible[i].length<=max) && (possible[i].length>0)) {
				max = possible[i].length;
				choice = i;
			}
		}
	}
	return choice;
}

// filling the final sudoku matrix after all function check
function fill(sudoku) {
	var tmp = new Array();
	var newSudoku = new Array();
	var i=0;
	var nextMove;
	var whatToTry;
	var attempt;
	while (!isSolvedSudoku(sudoku)) {
		i++;
		nextMove = scanSudokuForUnique(sudoku);
		if (nextMove == false) {
			nextMove = tmp.pop();
			sudoku = newSudoku.pop();
		}
		whatToTry = nextRandom(nextMove);
		attempt = determineRandomPossibleValue(nextMove,whatToTry);
		if (nextMove[whatToTry].length>1) {
			nextMove[whatToTry] = removeAttempt(nextMove[whatToTry],attempt);
			tmp.push(nextMove.slice());
			newSudoku.push(sudoku.slice());
		}
		sudoku[whatToTry] = attempt;
	}
    
    filledsudoku = makeSudokuForBoard(sudoku);
}

// create sudoku matrix for board
function makeSudokuForBoard(sudoku) {
	var filledsudoku = initMatrixArrays(9)
	for (let i=0; i<filledsudoku.length; i++) {
		for (let j=0; j<filledsudoku.length; j++) {
			filledsudoku[i][j]=sudoku[i*9+j];
		}
	}
	return filledsudoku;
}

// making matrix with % of the board by level choose
function RandomCells(NumberOfIndexesToFill){
    
    for(;NumberOfIndexesToFill-- > 0;){
        let i = Math.floor((Math.random() * 9));
        let j = Math.floor((Math.random() * 9));
        cellsToFill[i][j] = filledsudoku[i][j];   
    }
        userSolutionToFill = [].concat.apply([], cellsToFill);
   
     return cellsToFill;
}

var timer;
var time = 0;
var selectedNum;
var selectedcell;
var disableSelect;

function loadGamePage(NumberOfIndexesToFill,diff){
    window.location = 'sudoku.html' + "#" + NumberOfIndexesToFill + diff;
}

window.onload = function(){
    document.body.style.zoom=0.73;this.blur();
    createNumberBank();
    for(let i = 0 ; i < id("number_bank").children.length; i++){
      id("number_bank").children[i].addEventListener("click",function(){
          if(!disableSelect){
              if(this.classList.contains("selected")){
                  this.classList.remove("selected");
                  selectedNum = null;
              }
              else{
                  for(let i = 0 ; i < id("number_bank").children.length; i++){
                      id("number_bank").children[i].classList.remove("selected");
                  }
                  this.classList.add("selected");
                  selectedNum = this;
                  updateMove();
              }
          }
      })
    }
    startGame();
}

function ClearBoard(){ 
    console.log(cellsToFill);
  for(let i = 0 ; i < 9 ; i++){
      for( let j = 0 ; j < 9 ; j++){
          filledCells.push(cellsToFill[i][j]);
      }
  }
  console.log(filledCells);

  for(let i = 0 ; i < 81 ; i++){
      if(filledCells[i] > 0){
        document.getElementsByClassName("cell")[i].textContent = filledCells[i];
      } else {
        document.getElementsByClassName("cell")[i].textContent = " ";
      }
  }
}



function backToLevelPage(){
    window.location.href = "sudokuLevel.html";
}

function startGame(){
    let NumberOfIndexesToFill = window.location.hash.substring(1,3);
    let diff = window.location.hash.substring(3);
    id("difficult").textContent += diff;
    let board = RandomCells(NumberOfIndexesToFill);
    createBoard(board);
    startTimer();
   }

function createBoard(board){
    let idcount = 0;
    for(let i = 0; i < board.length ; i++ ){
        for(let j = 0; j < board.length ; j++ ){
           let cell = document.createElement("p");
           if(board[i][j] != 0){
            cell.textContent = board[i][j];
            cell.classList.add("disablecell");
        }
            else{
                cell.classList.add("ablecell");
                cell.addEventListener("click",function(){
                if(!disableSelect){
                    if(cell.classList.contains("selected")){
                        cell.classList.remove("selected");
                        selectedcell = null;
                  }
                    else{
                        for(let i = 0 ; i <(board.length)*2; i++){
                          qsa(".cell")[i].classList.remove("selected");
                      }
                        cell.classList.add("selected");
                        selectedcell = cell;
                        updateMove(selectedcell);
                  }
              }
          })
      }
        cell.id = idcount;
        idcount++;
        cell.classList.add("cell");
        if((cell.id > 17 && cell.id < 27) ||(cell.id > 44 && cell.id < 54 || i == 8)){
            cell.classList.add("bottomBorder");
        }
        if((cell.id + 1) % 9 == 3 ||(cell.id + 1) % 9 == 6 || j == 8){
            cell.classList.add("rightBorder");
        }
        if(i == 0){
            cell.classList.add("topBorder");
        }
        if(j == 0){
            cell.classList.add("leftBorder");
        }
        id("tableGame").appendChild(cell);
      }
  }    
}

function createNumberBank(){
    let idcount = 0;
    let number;
    for(let i = 0; i < 9 ; i++){
        number = document.createElement("p");
        number.innerHTML = i+1;
        number.id = idcount;
        idcount++;
        number.classList.add("number_bank");
        id("number_bank").appendChild(number);
    }

}

function updateMove(){  
    if(selectedcell && selectedNum){
    selectedcell.textContent = selectedNum.textContent;
      if(selectedcell){
            userSolutionToFill[selectedcell.id] = parseInt(selectedcell.textContent);
            selectedcell.classList.remove("selected");
            selectedNum.classList.remove("selected");
            selectedNum = null;
            selectedcell = null;
        }
        else{
            disableSelect = true;
            setTimeout(function(){
            selectedcell.classList.remove("selected");
            selectedNum.classList.remove("selected");
            selectedcell.textContent = "";
            selectedcell = null;
            selectedNum = null;
            },);///fix timer
        }
    }
}

function startTimer(){
    id("timer").textContent = timeConversion(time);
    timer = setInterval(function(){
        time++;
        id("timer").textContent = timeConversion(time);
    }, 1000)
}
  
  function timeConversion(time){
    let minutes = Math.floor(time / 60);
    if(minutes < 10){
        minutes = "0" + minutes;
    }
    let seconds = time % 60;
    if(seconds < 10){
        seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
  }

  function checkdone(){
    clearTimeout(timer);
    let solution = [].concat.apply([], filledsudoku);
    for(let i = 0 ; i < 81 ; i++){
        if(userSolutionToFill[i] != parseInt(solution[i])){
            id("result").style.color = "red";
            id("result").textContent = "You Lose!!! 😌"
            gameFinished.hidden = false;
            game_btns.hidden = true;
            return
        }
    }
    id("result").textContent = "You Win!!! 😀"; 
    gameFinished.hidden = false;
    game_btns.hidden = true;
}

function initMatrixArrays(numberOfIndexes){
    var matrix = [];
    for(let i = 0; i < numberOfIndexes; i++) {
        matrix[i] = [];
        for(let j = 0; j < numberOfIndexes; j++) {
            matrix[i][j] = 0;
        }
    }
    return matrix;
}
function initArrays(indexes){
    var arr = new Array();
    for(let i = 0; i < indexes; i++) {
        arr.push(0);
    }
    return arr;
}
function id(id){
    return document.getElementById(id);
}
function qs(selector){
  return document.querySelector(selector);
}
function qsa(selector){
  return document.querySelectorAll(selector);
}