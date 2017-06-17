var canvas, canvasWidth, canvasHeight;
var observers;

function setup() {
  // Set canvas
  // Subtract from windowHeight to account for header. Header is 40px so we subtract 38px in order to fill screen
  // May cause issues with not seeing to the very bottom of sketch since vertical scroll is disabled
  canvas = createCanvas(windowWidth, windowHeight - 38);
  canvasWidth = windowWidth;
  canvasHeight = windowHeight - 38;
  canvas.class('sketch');

  strokeWeight(4);
  createObservers();
}

function draw() {
  background(255);
  var mx = mouseX;
  var my = mouseY;
  for(var i = 0; i < observers.length; i++) {
    observers[i].update(mx, my);
    observers[i].display();
  }
}

function windowResized() {
  canvasWidth = windowWidth;
  canvasHeight = windowHeight - 38;
  resizeCanvas(windowWidth, canvasHeight);
  createObservers();
}

function Observer(x, y) {
  this.x = x;
  this.y = y;
  this.angle = 0;

  this.update = function(mx, my) {
    this.angle = atan2(my - this.y, mx - this.x);
  }

  this.display = function() {
    push();
    translate(this.x, this.y);
    // fill(0);
    // ellipse(0, 0, 10);
    rotate(this.angle);
    line(0, -20, 0, 20);
    pop();
  }
}

function createObservers() {
  observers = [];
    for (var i = 50; i < canvasWidth - 50; i += 50) {
      for (var j = 50; j < canvasHeight - 50; j += 50) {
        observers.push(new Observer(i, j));
      }
    }
}
