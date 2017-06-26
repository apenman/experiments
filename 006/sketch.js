// TODO:
// 1. Center the drawing
// 2. Add left and right possibility to face left or right
// 3. Randomly decide direction of first up or down

var canvas, canvasWidth, canvasHeight;
// Space in between lines
var spacing;
var things;
var triLength;
var debug;
var numTriangles;
function setup() {
  // Set canvas
  // Subtract from windowHeight to account for header. Header is 40px so we subtract 38px in order to fill screen
  // May cause issues with not seeing to the very bottom of sketch since vertical scroll is disabled
  canvas = createCanvas(windowWidth, windowHeight - 38);
  canvasWidth = windowWidth;
  canvasHeight = windowHeight - 38;
  canvas.class('sketch');

  background(255);

  triLength = 200;
  spacing = 20;
  initTriangles();
}

function draw() {}

function windowResized() {
  canvasWidth = windowWidth;
  canvasHeight = windowHeight - 38;
  resizeCanvas(windowWidth, canvasHeight);
}

function initTriangles() {
  numTriangles = random([3,4,5,6,7]);
  things = [];
  things.push(new Thingy((canvasWidth/numTriangles), canvasHeight/2, dir));
  for(var i = 1; i < numTriangles; i++) {
    var dir;
    i%2==0?dir="down":dir="up";
    things.push(new Thingy((canvasWidth/numTriangles) + (triLength/2*i) + (spacing/2*i), canvasHeight/2, dir));
  }

  for(var i = 0; i < things.length; i++) {
    things[i].plotThingy();
  }
}

function mouseClicked() {
  background(255);
  initTriangles()
}

function Thingy(x, y, dir) {
  this.direction = dir;
  this.middle = new Point(x, y);
  this.height = sqrt(sq(triLength)-sq(triLength/2));

  // Store the three points for the first phase
  // Calculate three new points for new iteration by manually adjusting for the space, get the length manually between the new points
  this.plotThingy = function() {
    var color = randomColor();
    stroke(color.r, color.g, color.b);
    strokeWeight(2);
    var left, right, midpoint;
    var offset, newlength;

    push();
    // Move origin to middle of triangle
    // We are now operating with the middle point as the origin
    translate(this.middle.x, this.middle.y);
    if(this.direction == "up"){rotate(radians(180))}

    for(var i = 0; i < 6; i++){
      offset = spacing * i;
      // Handle case of first lines
      if(i == 0) {
        newlength = triLength;
      }
      else {
        newlength = sqrt(sq(triLength/2 - offset) + sq(this.height-offset));
      }

      left = new Point(-newlength/2, this.height/2);
      right = new Point(newlength/2, this.height/2);

      line(0, -(this.height/2) + offset, left.x, left.y);
      line(0, -(this.height/2) + offset, right.x, right.y);

      if(debug) {
        line(0, -(this.height/2) + offset, 0, this.height/2);
        ellipse(0, -(this.height/2) + (this.height/2));
        ellipse(0, 0, 5);
        ellipse(left.x, left.y, 5);
        ellipse(right.x, right.y, 5);
      }
    }
    pop();
  }
}
