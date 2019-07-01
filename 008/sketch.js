var canvas, canvasWidth, canvasHeight;
var step;

function setup() {
  // Set canvas
  // Subtract from windowHeight to account for header. Header is 40px so we subtract 38px in order to fill screen
  // May cause issues with not seeing to the very bottom of sketch since vertical scroll is disabled
  canvas = createCanvas(windowWidth, windowHeight - 38);
  canvasWidth = windowWidth;
  canvasHeight = windowHeight - 38;
  canvas.class('sketch');

  background(255);
  stroke(145);
  step = 80;
  noLoop();
}

function draw() {
  // context.stroke();
  for(var x = 0; x < canvasWidth; x += step) {
    for(var y = 0; y < canvasHeight; y += step) {
      drawLines(x, y, step, step);
    }
  }
}

function drawLines(x, y, width, height) {
  var leftToRight = Math.random() >= 0.5;

  if (leftToRight) {
    line(x, y, x+width, y+height);
  } else {
    line(x+width, y, x, y+height);
  }
}

function windowResized() {
  canvasWidth = windowWidth;
  canvasHeight = windowHeight - 38;
  resizeCanvas(windowWidth, canvasHeight);
}
