var canvas, canvasWidth, canvasHeight;
var step;
var lines;

function setup() {
  // Set canvas
  // Subtract from windowHeight to account for header. Header is 40px so we subtract 38px in order to fill screen
  // May cause issues with not seeing to the very bottom of sketch since vertical scroll is disabled
  canvas = createCanvas(windowWidth, windowHeight - 38);
  canvasWidth = windowWidth;
  canvasHeight = windowHeight - 38;
  canvas.class('sketch');


  background(255);
  stroke(1);
  noLoop();
}

function draw() {
  // tiledLines();
  unknownPleasures();
}

// Still need to tweak values so that it looks nicer
function unknownPleasures() {
  step = 20;
  lines = [];
  generateLinePoints();
  drawUnknownLines();
}

function generateLinePoints() {
  //increase of decrease to change spread
  var offsetFromCenter = 200;
  for (var i = step; i <= canvasHeight - step; i += step) {
    var points = [];
    for (var j = step; j <= canvasWidth - step; j += step) {
      var distanceToCenter = Math.abs(j - canvasWidth / 2);
      var variance = Math.max(canvasWidth / 2 - offsetFromCenter - distanceToCenter, 0);
      var displace = Math.random() * variance / 2 * -1;
      var point = {
        x: j,
        y: i + displace
      };

      points.push(point)
    }
    lines.push(points);
  }
}

function drawUnknownLines() {
  for (var i = 5; i < lines.length; i++) {
    beginShape();

    for (var j = 0; j < lines[i].length; j++) {
      console.log(lines[i][j].x, lines[i][j].y);
      curveVertex(lines[i][j].x, lines[i][j].y);
    }
    endShape();
  }
}

function tiledLines() {
  step = 80;
  
  for (var x = 0; x < canvasWidth; x += step) {
    for (var y = 0; y < canvasHeight; y += step) {
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
