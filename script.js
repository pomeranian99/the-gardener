var canva = 60; // number of rows and columns 
var cellSize = 5; // size of each cell // 
var flowerList = [];
var mainLocX = canva * cellSize / 2; // starting position
var mainLocY = canva * cellSize / 2; // starting position
var plantWait = 15000; // how many moves before the planter plants
var planterMoveWait = 1000 // how long the planter waits before moving 
var planterAlpha = 255;
var planterAlphaDir = -1;
var planterMoveDir = Math.floor(Math.random() * 8); // initial direction for planter moving
var planterChangeDirWait = 4;
var planterChangeCount = 0;
var planterMoves = [
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1]
];

var timeNow = millis(); // starting time for entire simulation

function setup(){
	createCanvas(canva * cellSize, canva * cellSize);
}

function draw(){
  clear();
	background(0);
  noStroke();
  fill(51, 119, 255, planterAlpha);
  
  // pulse the planter's alpha
  planterAlpha += planterAlphaDir * 2;
  if (planterAlphaDir < 0 && planterAlpha < 190) {
    planterAlphaDir = planterAlphaDir * -1;
  };
  if (planterAlphaDir > 0 && planterAlpha > 254) {
    planterAlphaDir = planterAlphaDir * -1;
  };
  
  // move the planter
  if (millis() - timeNow > planterMoveWait) {
    // if it's time to pick a new direction, pick a new direction
    if (planterChangeCount > planterChangeDirWait) {
      
    }
  }
  
  // show the planter
  rect(mainLocX, mainLocY, cellSize, cellSize);
  
}