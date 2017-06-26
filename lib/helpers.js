function Point(x,y) {
  this.x = x;
  this.y = y;
}

function randomColor() {
  return {
    r: random(255),
    g: random(255),
    b: random(255)
  }
}
