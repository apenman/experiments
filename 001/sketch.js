var colors;
var canvas;

function setup() {
  // Set canvas
  // Subtract from windowHeight to account for header. Header is 40px so we subtract 38px in order to fill screen
  // May cause issues with not seeing to the very bottom of sketch since vertical scroll is disabled
  canvas = createCanvas(windowWidth, windowHeight - 38);
  canvas.class('sketch');
  colors = new Color();
}

function draw() {
  background(colors.r, colors.g, colors.b);
}

function Color() {
  this.r = 255;
  this.g = 100;
  this.b = 255;
}
