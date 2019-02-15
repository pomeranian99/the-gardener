let angle = 0.0;
function setup() {
  createCanvas(100, 100, WEBGL);
}

function draw() {
  background(200);
if (second() % 2 === 0) {
let c = cos(angle);  
}
  //increase the angle value using the most recent jitter value
  
  //use cosine to get a smooth CW and CCW motion when not jittering
  
  //move the shape to the center of the canvas
  translate(width / 2, height / 2);
  //apply the final rotation
  rotate(c);
  rect(0, 0, 180, 180);
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