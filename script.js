let yPos=0
function setup() {
  createCanvas(400,300);
  background(25);
}
function draw() {
  background(25);
  yPos=yPos-1;
  if (yPos < 0) {
    yPos = height;
  }
  ellipse(200,yPos,200,yPos);
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