function setup() {
  createCanvas(400,300);
  background(25);
}
function draw() {
  background(25);
  fill(255,255,255);
  ellipse(width/2, height/2, 100, 100);
  fill(64);
  ellipse(180,140,20,20);
  ellipse(220,140,20,20);
  fill(196);
  ellipse(constrainmouseX,140,10,20);
  ellipse(mouseX+40,140,10,20);
}