var canvas, canvasWidth, canvasHeight;
var rotation, r, g, b, l;

function setup() {
  // Set canvas
  // Subtract from windowHeight to account for header. Header is 40px so we subtract 38px in order to fill screen
  // May cause issues with not seeing to the very bottom of sketch since vertical scroll is disabled
  canvas = createCanvas(windowWidth, windowHeight - 38);
  canvasWidth = windowWidth;
  canvasHeight = windowHeight - 38;
  canvas.class('sketch');

  r = g = b = rotation = 0;
  l = 100;
  background(255);
}

function draw() {
  var mx = mouseX;
  var my = mouseY;
  // Avoid drawing before mouse enters frame
  if(mx != 0 && my != 0) {
    stroke(r,g,b);
    push();
    rotate(rotation);
    line(mx-l/2, my, mx+l/2, my);
    pop();
  }
}

function mouseClicked() {
  background(255);
}

function keyPressed() {
  // TODO: Add rotation
  if (keyCode === LEFT_ARROW) {
  } else if (keyCode === RIGHT_ARROW) {
  } else if (keyCode === UP_ARROW) {
    l += 20;
  } else if (keyCode === DOWN_ARROW) {
    if(l - 20 >= 0) {
      l -= 20;
    }
  } else if (key === 'C') {
    r = random(255);
    g = random(255);
    b = random(255);
  }
}
