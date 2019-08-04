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
  // unknownPleasures();  
  // triangleMesh();
  // cubicDisarray();
  // unDeuxTroix();
}

function circlePacker() {
  var circles = [];
  var minRadius = 2;
  var maxRadius = 100;
  var totalCircles = 500;
  var createCircleAttempts = 500;

  for( var i = 0; i < totalCircles; i++ ) {  
    createAndDrawCircle();
  }
}

function createAndDrawCircle() {
  var newCircle = {
    x: Math.floor(Math.random() * size),
    y: Math.floor(Math.random() * size),
    radius: minRadius
  };

  for (var radiusSize = minRadius; radiusSize < maxRadius; radiusSize++) {
    newCircle.radius = radiusSize;
    if (doesCircleHaveACollision(newCircle)) {
      newCircle.radius--;
      break;
    }
  }
}

// Return true of false depending on whether the circle collides with another.
function doesCircleHaveACollision(circle) {
  // If their radii combined, is greater than the distance between each of their centers, then we know there’s a collision.
  for (var i = 0; i < circles.length; i++) {
    var otherCircle = circles[i];
    var a = circle.radius + otherCircle.radius;
    var x = circle.x - otherCircle.x;
    var y = circle.y - otherCircle.y;

    if (a >= Math.sqrt(x * x + y * y)) {
      return true;
    }
  }
  // but return false for now
  return false;
}

function unDeuxTroix() {
  var step = 20;
  var aThirdOfHeight = canvasHeight / 3;
  strokeWeight(4);

  for (var y = step; y < canvasHeight - step; y += step) {
    for (var x = step; x < canvasWidth - step; x += step) {
      // As we move down the page, draw more lines as passed in by the positions array
      if (y < aThirdOfHeight) {
        drawMultipleLines(x, y, step, step, [0.5]);
      } else if (y < aThirdOfHeight * 2) {
        drawMultipleLines(x, y, step, step, [0.2, 0.8]);
      } else {
        drawMultipleLines(x, y, step, step, [0.1, 0.5, 0.9]);
      }
    }
  }
}

function drawMultipleLines(x, y, width, height, positions) {
  push();
  // Move to the current position and add random rotation
  translate(x + width/2, y + height/2);
  rotate(Math.random() * 5);
  translate(-width / 2, -height / 2);
  // Draw as many lines as required
  for(var i = 0; i <= positions.length; i++) {
    line(positions[i] * width, 0, positions[i] * width, height);
  }
  pop();
}

function cubicDisarray() {
  stroke(1);
  var squareSize = 30;
  var randomDisplacement = 15;
  var rotateMultiplier = 20;
  var offset = 10;

  for(var i = 0; i <= canvasWidth - squareSize; i+=squareSize) {
    for (var j = 0; j <= canvasHeight - squareSize; j+=squareSize) {
      // Create a random amount to rotate; increase as j gets higher
      var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
      var rotateAmt = j / canvasHeight * Math.PI / 180 * plusOrMinus * Math.random() * rotateMultiplier;
      plusOrMinus = Math.random() < 0.5 ? -1 : 1;
      // Create a random amount to offset; increase as j gets higher
      var translateAmt = j / canvasHeight * plusOrMinus * Math.random() * randomDisplacement;
      
      // Push new state
      push();
      // Translate
      translate(i + translateAmt + offset, j + offset);
      rotate(rotateAmt);
      rect(0,0, squareSize, squareSize);
      // Pop off state
      pop();
    }
  }
}


function triangleMesh() {
  stroke(1);
  var lines = [];
  var gapX = canvasWidth / 7;
  var gapY = canvasHeight / 7;
  var odd = false;
  var points = [];

  // Make a grid off points with first row offset
  for (var y = gapY / 2; y <= canvasHeight; y += gapY) {
    odd = !odd;
    points = [];
    for (var x = gapX / 2; x <= canvasWidth; x += gapX) {
      // Move points around within the gap space
      // They are all at least gapx or gapy away so they won't overlap
      points.push({
        x: x + (Math.random() * .8 - .4) * gapX + (odd ? gapX / 2 : 0),
        y: y + (Math.random() * .8 - .4) * gapY
      });
    }

    lines.push(points);
  }

  var dotLine;
  odd = true;

  for (var y = 0; y < lines.length - 1; y++) {
    console.log(y)
    odd = !odd;
    dotLine = [];
    for (var i = 0; i < lines[y].length; i++) {
      dotLine.push(odd ? lines[y][i] : lines[y + 1][i]);
      dotLine.push(odd ? lines[y + 1][i] : lines[y][i]);
    }
    for (var i = 0; i < dotLine.length - 2; i++) {
      drawTriangle(dotLine[i], dotLine[i + 1], dotLine[i + 2]);
    }
  }
}

function drawTriangle(a, b, c) {
  var gray = Math.floor(Math.random() * 6);

  switch (gray) {
    case 0:
      fill(0);
      break;
    case 1:
      fill(50);
      break;
    case 2:
      fill(87);
      break;
    case 3:
      fill(167);
      break;
    case 4:
      fill(209);
      break;
    case 5:
      fill(255);
      break;
  }
    
  beginShape();
  vertex(a.x, a.y);
  vertex(b.x, b.y);
  vertex(c.x, c.y);
  vertex(a.x, a.y);
  endShape();
}

// Still need to tweak values so that it looks nicer
function unknownPleasures() {
  stroke(1);
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
      var variance = Math.max(canvasWidth / 3 - offsetFromCenter - distanceToCenter, 0);
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
  stroke(1);
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
