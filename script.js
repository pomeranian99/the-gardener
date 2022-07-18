var canva = 60; // number of rows and columns 
var cellSize = 5; // size of each cell // 
var flowerList = [];
var mainLocX = canva * cellSize / 2; // starting position
var mainLocY = canva * cellSize / 2; // starting position
var waitPlant = 15000; // how long to wait before planting a new flower
var planter

var timeNow = millis(); // starting time for entire simulation

function setup(){
	createCanvas(canva * cellSize, canva * cellSize);
}

function draw(){
  clear();
	background(0);
  noStroke();
  fill(51, 119, 255);
  rect(mainLocX, mainLocY, cellSize, cellSize);
  // if it's time to plant, plant!
  if (millis() - timeNow > waitPlant) {
    
  }
}