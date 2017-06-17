var xPoints = [];
var yPoints = [];
var numPoints = 50;
var currLineStep = 0.0;
var i = 0;
var j = 0;

function setup() {
  // Set canvas
  // Subtract from windowHeight to account for header. Header is 40px so we subtract 38px in order to fill screen
  // May cause issues with not seeing to the very bottom of sketch since vertical scroll is disabled
  canvas = createCanvas(windowWidth, windowHeight - 38);
  canvas.class('sketch');
  background(255);

  for (var i = 0; i < numPoints; i++) {
    xPoints[i] = random(windowWidth - 100);
    yPoints[i] = random(windowHeight - 50);
  }

  i = 0;
  j = 1;
}

function windowResized() {
  canvasWidth = windowWidth;
  canvasHeight = windowHeight - 38;
  resizeCanvas(windowWidth, canvasHeight);
}

function drawPoints() {
  for (var d = 0; d < numPoints; d++) {
    point(xPoints[d], yPoints[d])
  }
}

function animateLine() {
  // Use lerp() to calc point between x's and y's
  var newX = lerp(xPoints[i], xPoints[j], currLineStep);
  var newY = lerp(yPoints[i], yPoints[j], currLineStep);

  stroke(0);
  strokeWeight(0.25);

  line(xPoints[i], yPoints[i], newX, newY);

  if (currLineStep < 1.0)
    currLineStep = currLineStep + 0.1 > 1.0 ? 1.0 : currLineStep + 0.1;
  else {
    if (j < numPoints - 1) {
      j++;
    } else {
      j = 0;
      i++;
      // END OF ANIMATION
      if (i == numPoints) {
        console.log("DONE!");
        noLoop();
      }
    }
    currLineStep = 0.0;
  }
}

function draw() {
  //drawPoints();
  animateLine();
}
