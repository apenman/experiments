var canvas, canvasWidth, canvasHeight;
var cells, ruleset, generation, w;
var r,g,b;

function setup() {
  // Set canvas
  // Subtract from windowHeight to account for header. Header is 40px so we subtract 38px in order to fill screen
  // May cause issues with not seeing to the very bottom of sketch since vertical scroll is disabled
  canvas = createCanvas(windowWidth, windowHeight - 38);
  canvasWidth = windowWidth;
  canvasHeight = windowHeight - 38;
  canvas.class('sketch');


  ruleset = [0,1,0,1,1,0,1,0];
  generation = 0;
  randomColor();

  // set cell width and initialize
  w = 5;
  cells = [];
  for(var i = 0; i < canvasWidth/5; i++) {
    cells[i] = 0;
  }
  // set middle sell to 1
  cells[cells.length/2] = 1;

  background(255);
}

function draw() {
    generate();
    for(var i = 0; i < cells.length; i++) {
        // Only draw cells with state of 1 for now
        // Slight optimization for simple black and white
        if(cells[i] == 1) {
            fill(r, g, b);
            stroke(255);
            rect(i*w,generation*w,w,w);
        }
    }
    generation++;

    //// Stop looping
    // if(generation >= 100) {
    //     noLoop();
    // }

    // When CA hits bottom of window
    // Reset with new ruleset
    if(generation*w >= windowHeight) {
        generation = 0;
        generateNewRuleset();
        background(255);
        randomColor();
    }
}

function windowResized() {
  canvasWidth = windowWidth;
  canvasHeight = windowHeight - 38;
  resizeCanvas(windowWidth, canvasHeight);
}

function generate() {
    // Use newCells array because we don't want to overwrite previous generation as we go
    var newGeneration = [];

    newGeneration.push(0);
    // Start at index 1 and end one less than length to skip edge cases
    for(var i = 1; i < cells.length-1; i++) {
        newGeneration.push(rules(cells[i-1], cells[i], cells[i+1]));
    }
    newGeneration.push(0);

    cells = newGeneration;
}

function rules(left, middle, right) {
    // Convert neighborhood to binary string
    var s = "" + left + middle + right;
    // Convert binary string to int
    var index = parseInt(s, 2);
    // Access the value from our ruleset using converted int
    return ruleset[index];
}

function generateNewRuleset() {
    for(var i = 0; i < 8; i++) {
        if(random(1) < 0.5)
            ruleset[i] = 0;
        else
            ruleset[i] = 1;
    }
}

function randomColor() {
  r = random(255);
  g = random(255);
  b = random(255);
}
