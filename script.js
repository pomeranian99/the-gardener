var y = 300;
var x = -1;
function setup() {
  createCanvas(400,300);
  background(25);
}
function draw() {
  background(25);
  ellipse(200,200,y,y);
  y=y + x;
  if(y<=0){
    x=1;
  }
  if(y>300){
    x=-1;
  }
}


  
/*ellipse(width/2, height/2, 100, 100);
  fill(64);
  ellipse(180,140,20,20);
  ellipse(220,140,20,20);
  fill(196);
  ellipse(constrain(mouseX - 20,172,190),
          140,
          10,
          20);
  ellipse(constrain(mouseX + 20,212,228),
          140,
          10,
          20);
          */