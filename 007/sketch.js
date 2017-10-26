var canvas, canvasWidth, canvasHeight;

function setup() {
  // Set canvas
  // Subtract from windowHeight to account for header. Header is 40px so we subtract 38px in order to fill screen
  // May cause issues with not seeing to the very bottom of sketch since vertical scroll is disabled
  canvas = createCanvas(windowWidth, windowHeight - 38);
  canvasWidth = windowWidth;
  canvasHeight = windowHeight - 38;
  canvas.class('sketch');

  background(255);
}

function draw() {
  background(255);

  // Draw shadow
  var flipX, flipY;
  flipX = canvasWidth - mouseX;
  flipY = canvasHeight - mouseY;
  stroke(145);
  line(flipX, flipY, canvasWidth/2, canvasHeight/2);

  // Draw sun
  noStroke();
  fill(255, 255, 0);
  ellipse(mouseX, mouseY, 25);

  // Draw shadow
  fill(0);
  ellipse(canvasWidth / 2, canvasHeight / 2, 10);
}

function windowResized() {
  canvasWidth = windowWidth;
  canvasHeight = windowHeight - 38;
  resizeCanvas(windowWidth, canvasHeight);
}
