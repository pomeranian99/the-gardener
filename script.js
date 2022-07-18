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

var timeNow = 0;

function setup(){
	createCanvas(canva * cellSize, canva * cellSize);
  timeNow = millis(); // starting time for entire simulation
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
  
  // if it's time to move the planter ...
  if (millis() - timeNow > planterMoveWait) {
    
    // move the planter
    mainLocX = mainLocX + planterMoves[planterMoveDir][0] * cellSize;
    mainLocY = mainLocY + planterMoves[planterMoveDir][1] * cellSize;
    
    // if we've moved off the edge, wrap around 
    if (mainLocX > canva * cellSize) {
      mainLocX = 0;
    };
    if (mainLocX < 0){
      mainLocX = (canva - 1) * cellSize;
    };
    if (mainLocY > canva * cellSize){
      mainLocY = 0;
    };
    if (mainLocY < 0){
      mainLocY = (canva - 1) * cellSize;
    };
    
    // add to the countdown for the next change of directin
    planterChangeCount += 1;
    
    // reset the counter to wait for the next move 
    timeNow = millis();
    
    // if it's time to pick a new direction, pick a new direction
    if (planterChangeCount > planterChangeDirWait) {
      planterMoveDir = Math.floor(Math.random() * 8);
      planterChangeCount = 0;
    }
    
  }
  
  // show the planter
  rect(mainLocX, mainLocY, cellSize, cellSize);
  
} // end of draw() function here 