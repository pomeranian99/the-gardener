var canva = 60;
var cellSize = 5;
var cell = [];
var mainLocX = canva * cellSize / 2;
var mainLocY = canva * cellSize / 2;

function setup(){
	createCanvas(canva * cellSize, canva * cellSize);
}


function draw(){
	background(0);
  noStroke();
  fill(51, 119, 255);
  rect(mainLocX, mainLocY, cellSize, cellSize);
  
}