var colors;
var canvas, canvasWidth, canvasHeight;
var boxes;

function setup() {
  // Set canvas
  // Subtract from windowHeight to account for header. Header is 40px so we subtract 38px in order to fill screen
  // May cause issues with not seeing to the very bottom of sketch since vertical scroll is disabled
  canvas = createCanvas(windowWidth, windowHeight - 38);
  canvasWidth = windowWidth;
  canvasHeight = windowHeight - 38;
  canvas.class('sketch');

  cursor(HAND);
  boxes = [];
  for (var i = 50; i < canvasWidth - 50; i += 100) {
    for (var j = 50; j < canvasHeight; j += 100) {
      boxes.push(new Box([i, j], [i + 50, j], [i + 50, j + 50], [i, j + 50]));
    }
  }
  // boxes.push(new Box([100, 100], [150, 100], [150, 150], [100, 150]));
  // boxes.push(new Box([200, 200], [250, 200], [250, 250], [200, 250]));
  background(255);
  strokeWeight(4);
}

function draw() {
  background(255);
  boxes.forEach(function(box) {
    box.updateFaces();
    box.drawFaces();
  });
}

//          f[0]
//     v[0]------v[1]
//      |         |
// f[3] |         | f[1]
//      |         |
//     v[3]------v[2]
//          f[2]
function Box(v0, v1, v2, v3) {
  this.vertices = [v0, v1, v2, v3];
  // Indicates which faces are shadowed
  this.faces = [true, false, false, true];

  this.draw = function() {
    // line(this.vertices[0][0], this.vertices[0][1], this.vertices[1][0], this.vertices[1][1]);
    // line(this.vertices[0][0], this.vertices[0][1], this.vertices[3][0], this.vertices[3][1]);
  }

  this.updateFaces = function() {
    // Check face 0
    if (mouseY < this.vertices[0][1]) {
      this.faces[0] = true;
    } else {
      this.faces[0] = false;
    }
    // Check face 1
    if (mouseX > this.vertices[1][0]) {
      this.faces[1] = true;
    } else {
      this.faces[1] = false;
    }
    // Check face 2
    if (mouseY > this.vertices[2][1]) {
      this.faces[2] = true;
    } else {
      this.faces[2] = false;
    }
    // Check face 3
    if (mouseX < this.vertices[0][0]) {
      this.faces[3] = true;
    } else {
      this.faces[3] = false;
    }
  }

  this.drawFaces = function() {
    if (this.faces[0]) {
      line(this.vertices[0][0], this.vertices[0][1], this.vertices[1][0], this.vertices[1][1]);
    }

    if (this.faces[1]) {
      line(this.vertices[1][0], this.vertices[1][1], this.vertices[2][0], this.vertices[2][1]);
    }

    if (this.faces[2]) {
      line(this.vertices[2][0], this.vertices[2][1], this.vertices[3][0], this.vertices[3][1]);
    }

    if (this.faces[3]) {
      line(this.vertices[0][0], this.vertices[0][1], this.vertices[3][0], this.vertices[3][1]);
    }
  }
}
