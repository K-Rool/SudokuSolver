
var NumberArray = []; //array to hold all of the numbers in
var currentNumber = 0; //number currently being solved
var numberSolvedSquares = 0; //number of currently solved squares


//constructor to create new number objects;
function number(num, row, column, box, value, solved) {
  this.n = num
  this.r = row;
  this.c = column;
  this.b = box;
  this.v = value;
  this.s = solved;
}
//arrays to store numbers currently in each row, column, and box
var rowNumbers = ["", "", "", "", "", "", "", "", ""];
var columnNumbers = ["", "", "", "", "", "", "", "", ""];
var boxNumbers = ["", "", "", "", "", "", "", "", ""];

//arrays to store which number squares are in which rows/columns/boxes

var rowSquares = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14, 15, 16, 17, 18],
  [19, 20, 21, 22, 23, 24, 25, 26, 27],
  [28, 29, 30, 31, 32, 33, 34, 35, 36],
  [37, 38, 39, 40, 41, 42, 43, 44, 45],
  [46, 47, 48, 49, 50, 51, 52, 53, 54],
  [55, 56, 57, 58, 59, 60, 61, 62, 63],
  [64, 65, 66, 67, 68, 69, 70, 71, 72],
  [73, 74, 75, 76, 77, 78, 79, 80, 81]
];
var columnSquares = [
  [1, 10, 19, 28, 37, 46, 55, 64, 73],
  [2, 11, 20, 29, 38, 47, 56, 65, 74],
  [3, 12, 21, 30, 39, 48, 57, 66, 75],
  [4, 13, 22, 31, 40, 49, 58, 67, 76],
  [5, 14, 23, 32, 41, 50, 59, 68, 77],
  [6, 15, 24, 33, 42, 51, 60, 69, 78],
  [7, 16, 25, 34, 43, 52, 61, 70, 79],
  [8, 17, 26, 35, 44, 53, 62, 71, 80],
  [9, 18, 27, 36, 45, 54, 63, 72, 81]
];
var boxSquares = [
  [1, 2, 3, 10, 11, 12, 19, 20, 21],
  [4, 5, 6, 13, 14, 15, 22, 23, 24],
  [7, 8, 9, 16, 17, 18, 25, 26, 27],
  [28, 29, 30, 37, 38, 39, 46, 47, 48],
  [31, 32, 33, 40, 41, 42, 49, 50, 51],
  [34, 35, 36, 43, 44, 45, 52, 53, 54],
  [55, 56, 57, 64, 65, 66, 73, 74, 75],
  [58, 59, 60, 67, 68, 69, 76, 77, 78],
  [61, 62, 63, 70, 71, 72, 79, 80, 81]
];

function beginSolve() {
  //creates objects for each number, row, column, and box
  for (var i = 0; i < 81; i++) {
    var num = i + 1;
    if(document.getElementById("n" + num).value.length>1||"123456789".indexOf(document.getElementById("n" + num).value)==-1){
      console.log(document.getElementById("n" + num).value.length);
      console.log("123456789".indexOf(document.getElementById("n" + num).value));
      console.log(num);
      document.getElementById("solvedText").innerHTML="invalid input. Cannot solve";
      document.getElementById("btn").style.display = "none";
      return
    }
    var b = parseInt(document.getElementById("n" + num).parentNode.id.charAt(3));
    NumberArray[i] = new number(i + 1, Math.floor((i) / 9), (i) % 9, b, document.getElementById("n" + (i + 1)).value, true);
    if (NumberArray[i].v == "") {
      NumberArray[i].v = "123456789";
      NumberArray[i].s = false;
    } else {
      numberSolvedSquares++;
      document.getElementById("n" + num).disabled = true;
      rowNumbers[NumberArray[i].r] += NumberArray[i].v.toString();
      columnNumbers[NumberArray[i].c] += NumberArray[i].v.toString();
      boxNumbers[NumberArray[i].b] += NumberArray[i].v.toString();
    }
  }

  document.getElementById("btn").style.display = "none";
  SolveSudoku();
}

function checkNumber() {

//skips checking already solved numbers
  if (NumberArray[currentNumber].s == true) {
    return;
  } else {
    //checks if a possible value of current number is already in the current row
    for (var i = 0; i < rowNumbers[NumberArray[currentNumber].r].length; i++) {
      var rowString = rowNumbers[NumberArray[currentNumber].r].charAt(i).toString();
      NumberArray[currentNumber].v = NumberArray[currentNumber].v.replace(rowString.toString(), "");
    }
      //checks if a possible value of current number is already in the current column
    for (var i = 0; i < columnNumbers[NumberArray[currentNumber].c].length; i++) {
      var columnString = columnNumbers[NumberArray[currentNumber].c].charAt(i).toString();
      NumberArray[currentNumber].v = NumberArray[currentNumber].v.replace(columnString.toString(), "");
    }
      //checks if a possible value of current number is already in the current box
    for (var i = 0; i < boxNumbers[NumberArray[currentNumber].b].length; i++) {
      var boxString = boxNumbers[NumberArray[currentNumber].b].charAt(i).toString();
      NumberArray[currentNumber].v = NumberArray[currentNumber].v.replace(boxString.toString(), "");
    }

    //check if the current square is the only possible place to put a specific number in the current row
    for (var i = 1; i < 10; i++) {
      var possibleNumber = false;
      for (var e = 0; e < NumberArray[currentNumber].v.length; e++) {
        if (NumberArray[currentNumber].v.charAt(e) == i) {
          possibleNumber = true;
        }
      }
      if (possibleNumber) {
        var containsNumber = 0;
        for (var z = 0; z < 9; z++) {
          for (var y = 0; y < NumberArray[rowSquares[NumberArray[currentNumber].r][z] - 1].v.length; y++) {
            if (NumberArray[rowSquares[NumberArray[currentNumber].r][z] - 1].v.charAt(y) == i) {
              containsNumber++;
            }
          }
        }
        if (containsNumber == 1) {
          NumberArray[currentNumber].v = i.toString();
        }
      }
    }
    //check if the current square is the only possible place to put a specific number in the current column
    for (var i = 1; i < 10; i++) {
      var possibleNumber = false;
      for (var e = 0; e < NumberArray[currentNumber].v.length; e++) {
        if (NumberArray[currentNumber].v.charAt(e) == i) {
          possibleNumber = true;
        }
      }
      if (possibleNumber) {
        var containsNumber = 0;
        for (var z = 0; z < 9; z++) {
          for (var y = 0; y < NumberArray[columnSquares[NumberArray[currentNumber].c][z] - 1].v.length; y++) {
            if (NumberArray[columnSquares[NumberArray[currentNumber].c][z] - 1].v.charAt(y) == i) {
              containsNumber++;
            }
          }
        }
        if (containsNumber == 1) {
          NumberArray[currentNumber].v = i.toString();
        }
      }
    }

    //check if the current square is the only possible place to put a specific number in the current box
    for (var i = 1; i < 10; i++) {
      var possibleNumber = false;
      for (var e = 0; e < NumberArray[currentNumber].v.length; e++) {
        if (NumberArray[currentNumber].v.charAt(e) == i) {
          possibleNumber = true;
        }
      }
      if (possibleNumber) {
        var containsNumber = 0;
        for (var z = 0; z < 9; z++) {
          for (var y = 0; y < NumberArray[boxSquares[NumberArray[currentNumber].b][z] - 1].v.length; y++) {
            if (NumberArray[boxSquares[NumberArray[currentNumber].b][z] - 1].v.charAt(y) == i) {
              containsNumber++;
            }
          }
        }
        if (containsNumber == 1) {
          NumberArray[currentNumber].v = i.toString();
        }
      }
    }

    //if there is only 1 possible value left for the current square, solves current square
    if (NumberArray[currentNumber].v.length == 1) {
      numberSolvedSquares++;
      NumberArray[currentNumber].s = true;
      document.getElementById("n" + (currentNumber + 1)).value = NumberArray[currentNumber].v;
      document.getElementById("n" + (currentNumber + 1)).style.color = "blue";
      rowNumbers[NumberArray[currentNumber].r] += NumberArray[currentNumber].v;
      columnNumbers[NumberArray[currentNumber].c] += NumberArray[currentNumber].v;
      boxNumbers[NumberArray[currentNumber].b] += NumberArray[currentNumber].v;
      var currentSquareNumber = currentNumber+1;
      document.getElementById("n" + currentSquareNumber).disabled = true;
    }
  }
}



function SolveSudoku() {
  var squaresSinceLastChange = 0;
  do {
    var tempV = NumberArray[currentNumber].v;
    checkNumber()

    //if all squares have been solved
    if(numberSolvedSquares==81){
      document.getElementById("solvedText").innerHTML="Solved";
      return;
    }

    if(tempV!==NumberArray[currentNumber].v){
      squaresSinceLastChange=0;
    }else{
      squaresSinceLastChange++;

      //if unable to solve the puzzle
      if(squaresSinceLastChange>85){
        document.getElementById("solvedText").innerHTML="Too complex, couldn't solve";
        return;
      }
    }

    currentNumber++
    if (currentNumber == 81) {
      currentNumber = 0;
    }
  }
  while (true);
}
