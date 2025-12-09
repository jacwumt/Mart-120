// simple generative artwork - John Weber
// floating circles using arrays

var orbX = [];
var orbY = [];
var orbSize = [];
var orbVX = [];
var orbVY = [];
var orbR = [];
var orbG = [];
var orbB = [];
var numOrbs = 40;

function setup() {
  createCanvas(600, 600);
  noStroke();

  for (var i = 0; i < numOrbs; i++) {
    orbX[i] = random(width);
    orbY[i] = random(height);
    orbSize[i] = random(10, 40);

    // base speed
    orbVX[i] = random(-1.5, 1.5);
    orbVY[i] = random(-1.5, 1.5);

    // blue-ish colors, slightly different
    orbR[i] = random(40, 120);
    orbG[i] = random(80, 200);
    orbB[i] = random(180, 255);
  }
}

function draw() {
  // semi-transparent background for trail effect
  background(5, 10, 25, 40);

  drawOrbs();
  moveOrbs();

  // small title in the corner
  fill(200);
  textSize(14);
  text("Floating Orbs", 20, 20);
}

function drawOrbs() {
  for (var i = 0; i < numOrbs; i++) {

    // distance from mouse
    var d = dist(mouseX, mouseY, orbX[i], orbY[i]);

    // make orbs grow & brighten when mouse is close
    var glow = 0;
    if (d < 80) {
      glow = map(d, 0, 80, 80, 0);
    }

    fill(orbR[i] + glow, orbG[i] + glow, orbB[i] + glow, 180);
    circle(orbX[i], orbY[i], orbSize[i] + glow * 0.1);
  }
}

function moveOrbs() {
  for (var i = 0; i < numOrbs; i++) {
    // tiny random wobble so paths aren't straight
    orbVX[i] += random(-0.05, 0.05);
    orbVY[i] += random(-0.05, 0.05);

    orbVX[i] = constrain(orbVX[i], -2, 2);
    orbVY[i] = constrain(orbVY[i], -2, 2);

    orbX[i] += orbVX[i];
    orbY[i] += orbVY[i];

    // wrap around edges
    if (orbX[i] > width)  orbX[i] = 0;
    if (orbX[i] < 0)      orbX[i] = width;
    if (orbY[i] > height) orbY[i] = 0;
    if (orbY[i] < 0)      orbY[i] = height;
  }
}
