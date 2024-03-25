const TicTacToe = ["gBox1", "gBox2", "gBox3", "gBox4", "gBox5", "gBox6", "gBox7", "gBox8", "gBox9"];
const leftScreen = document.getElementById("screenCol1");
const rightScreen = document.getElementById("screenCol3")
var userInput = [];
var circleSum = [[0, 0, 0], [0, 0, 0], [0]];
var crossSum = [[0, 0, 0], [0, 0, 0], [0]];
var newInput = true;
var winner = false;
var turn = 1;

function drawMarks(mark, markNum, turn) {
    var currentBox = document.getElementById(mark);
    if(turn%2 == 1){
        var playerMark = document.createElement("div");
        playerMark.className = "circle";
        circleSum[0][Math.floor(markNum/3)] += 1;//adds 1 to the sum of the respective row of the cell that was clicked
        circleSum[1][Math.floor(markNum%3)] += 1;//adds 1 to the sum of the respective column of the cell that was clicked
        if(markNum%2 == 0){
            circleSum[2][0] += markNum+1;//adds to the sum of the respective diagonal of the cell that was clicked
        }
        console.log(circleSum[2][0]);
    }
    else{
        var playerMark = document.createTextNode("X");
        crossSum[0][Math.floor(markNum/3)] += 1;
        crossSum[1][Math.floor(markNum%3)] += 1;
        if(markNum%2 == 0){
            crossSum[2][0] += markNum+1;
        }
    }
    currentBox.append(playerMark);
}

TicTacToe.forEach((box, boxNum) => {
    var currentBox = document.getElementById(box);
    currentBox.addEventListener("click", function(){//creates event listener for each tictactoe cell
        if(winner == false){
            newInput = true;
            if(turn%2 == 1){
                leftScreen.textContent = "X\r\nTURN";
            }
            else{
                leftScreen.textContent = "O\r\nTURN";
            }
            for(let i = 0 ; i < userInput.length ; i++){//check if input is valid
                if(userInput[i] == boxNum){
                    newInput = false;
                }
            }
            if(newInput == true){//if input valid then run
                userInput.push(boxNum);
                drawMarks(box, boxNum, turn);
                turn++;
            }
            if(turn > 5){//wincon
                for(let i = 0 ; i < 3 ; i++){
                    if(circleSum[0][i] == 3 || circleSum[1][i] == 3 || (i < 1 && circleSum[2][i] == 15)){//if the number of circles in a row, column, or diagonal add up to 3
                        console.log("Circle wins");
                        winner = true;
                        rightScreen.textContent = "O\r\nWINS";
                        leftScreen.textContent = "";
                    }
                    if(crossSum[0][i] == 3 || crossSum[1][i] == 3 || (i < 1 && crossSum[2][i] == 15)){//if the number of crosses in a row, column, or diagonal add up to 3
                        console.log("Cross wins");
                        winner = true;
                        rightScreen.textContent = "X\r\nWINS";
                        leftScreen.textContent = "";
                    }
                }
            }
        }
    });
});