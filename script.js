function setup() {
  createCanvas(400,300);
  background(25);
}
funstion draw() {
}

function mouseDragged() {
  strokeWeight(random(10));
  stroke(255,255,255);
 line(mouseX,mouseY,pmouseX, pmouseY,);
  line(width - mouseX, mouseY, width - pmouseX, mouseY);
  
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