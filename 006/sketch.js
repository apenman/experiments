var canvas, canvasWidth, canvasHeight;
// Space in between lines
var spacing;
var thing;
function setup() {
  // Set canvas
  // Subtract from windowHeight to account for header. Header is 40px so we subtract 38px in order to fill screen
  // May cause issues with not seeing to the very bottom of sketch since vertical scroll is disabled
  canvas = createCanvas(windowWidth, windowHeight - 38);
  canvasWidth = windowWidth;
  canvasHeight = windowHeight - 38;
  canvas.class('sketch');

  background(255);

  spacing = 20;
  things = new Thingy(canvasWidth/3, canvasHeight/2, 1);
  thing2 = new Thingy(things.rightPoint.x + spacing/2, things.rightPoint.y, -1);
  thing3 = new Thingy(thing2.leftPoint.x + spacing/2, thing2.leftPoint.y, 1);
  thing4 = new Thingy(thing3.rightPoint.x + spacing/2, thing3.rightPoint.y, -1);

  things.plotThingy();
  thing2.plotThingy();
  thing3.plotThingy();
  thing4.plotThingy();
}

function draw() {
}

function windowResized() {
  canvasWidth = windowWidth;
  canvasHeight = windowHeight - 38;
  resizeCanvas(windowWidth, canvasHeight);
}

function Thingy(x, y, dir) {
  this.direction = dir;
  this.length = 200;
  this.peak = new Point(x, y);
  this.midpoint = new Point(this.peak.x, this.peak.y + (dir * sqrt(sq(this.length)-sq(this.length/2))));
  this.height = dist(this.peak.x, this.peak.y, this.midpoint.x, this.midpoint.y);
  this.leftPoint = new Point(this.midpoint.x-(dir * (this.length/2)), this.midpoint.y);
  this.rightPoint = new Point(this.midpoint.x+(dir * (this.length/2)), this.midpoint.y);
  console.log("HEIGHT " + this.height);


  // Store the three points for the first phase
  // Calculate three new points for new iteration by manually adjusting for the space, get the length manually between the new points
  this.plotThingy = function() {
    var color = randomColor();
    stroke(color.r, color.g, color.b);
    strokeWeight(2);
    var left, right, midpoint;
    var offset, newlength;

    for(var i = 0; i < 6; i++){
      offset = spacing * i;
      // Handle case of first lines
      if(i == 0) {
        newlength = this.length;
      }
      else {
        newlength = sqrt(sq(this.length/2 - offset) + sq(this.height-offset));
      }

      left = new Point(this.midpoint.x-(newlength/2), this.midpoint.y);
      right = new Point(this.midpoint.x+(newlength/2), this.midpoint.y);
      // ellipse(this.peak.x, this.peak.y, 5);
      // ellipse(left.x, left.y, 5);
      // ellipse(right.x, right.y, 5);
      line(this.peak.x, this.peak.y + (dir * offset), left.x, left.y);
      line(this.peak.x, this.peak.y + (dir * offset), right.x, right.y);
    }
  }
}
