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
  var l = 200.0;
  var tx = mouseX + cos(radians(90))* l;
  var ty = mouseY + sin(radians(180))* l;

  line(mouseX, mouseY, tx, ty);
}
