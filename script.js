function setup(){
	createCanvas(400, 400);
}
function draw(){
	background(240);

	// move the origin to the pivot point
	translate(width/2, height/2); 

	// then rotate the grid around the pivot point by a
	// number of degrees equal to the frame count of the sketch
	rotate(radians(frameCount));

	// and draw the square at the origin
	fill(0);
  circle(0,0,5);
	rect(10, 10, 100, 100);
}