var canva = 60; // number of rows and columns 
var cellSize = 5; // size of each cell // 
var flowerList = [];
var mainLocX = canva * cellSize / 2; // starting position
var mainLocY = canva * cellSize / 2; // starting position
var waitPlant = 15000; // how long to wait before planting a new flower
var planterAlpha = 255;
var planterAlphaDir = -1;

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
  
  // show the planter
  rect(mainLocX, mainLocY, cellSize, cellSize);
  
}