// Week Assignment - John Weber

// player
var characterX = 200;
var characterY = 350;
var playerSize = 25;

// keys (WASD + arrows)
var w = 87, s = 83, a = 65, d = 68;
var up = 38, down = 40, leftKey = 37, rightKey = 39;

// obstacles
var o1x = 120, o1y = 120, o1vx = 2, o1vy = 1.2, o1size = 20;      // circle
var o2x = 300, o2y = 260, o2vx = -1.6, o2vy = 2.1, o2w = 50, o2h = 30; // rect (diagonal)
var o3x = 420, o3y = 180, o3vx = 1.2, o3vy = -1.4, o3size = 35;    // circle

// static obstacle (only one on click)
var mouseShapeX = null;
var mouseShapeY = null;

function setup() {
  createCanvas(500, 600);
}

function draw() {
  background(120, 45, 78);

  createBorders(10);

  // exit label
  fill(255);
  textSize(16);
  text("EXIT", width - 50, height - 55);

  // player
  fill(255, 220, 150);
  circle(characterX, characterY, playerSize);

  movePlayer();

  // obstacle 1 (circle)
  fill(13, 145, 14);
  circle(o1x, o1y, o1size);
  o1vx += random(-0.05, 0.05);
  o1vy += random(-0.05, 0.05);
  o1x += o1vx;
  o1y += o1vy;
  wrap1();

  // obstacle 2 (rect) diagonal
  fill(80, 180, 255);
  rect(o2x, o2y, o2w, o2h);
  o2vx += random(-0.05, 0.05);
  o2vy += random(-0.05, 0.05);
  o2x += o2vx;
  o2y += o2vy;
  wrap2();

  // obstacle 3 (circle)
  fill(220, 120, 180);
  circle(o3x, o3y, o3size);
  o3vx += random(-0.05, 0.05);
  o3vy += random(-0.05, 0.05);
  o3x += o3vx;
  o3y += o3vy;
  wrap3();

  // static obstacle (one click)
  if (mouseShapeX !== null) {
    fill(200, 200, 0);
    rect(mouseShapeX, mouseShapeY, 40, 40);
  }

  // win check (enter the bottom-right gap)
  if (characterX > width - 20 && characterY > height - 60) {
    fill(255);
    textSize(30);
    text("YOU WIN!", width / 2 - 80, height / 2);
  }
}

// movement
function movePlayer() {
  // left/right (if / else if) with OR for keys
  if (keyIsDown(a) || keyIsDown(leftKey)) {
    characterX -= 3;
  } else if (keyIsDown(d) || keyIsDown(rightKey)) {
    characterX += 3;
  }

  // up/down
  if (keyIsDown(w) || keyIsDown(up)) {
    characterY -= 3;
  } else if (keyIsDown(s) || keyIsDown(down)) {
    characterY += 3;
  }

  // keep inside
  if (characterX < 12) characterX = 12;
  if (characterX > width - 12) characterX = width - 12;
  if (characterY < 12) characterY = 12;
  if (characterY > height - 12) characterY = height - 12;
}

// borders with exit gap (bottom-right 50px)
function createBorders(thickness) {
  rect(0, 0, width, thickness);                 // top
  rect(0, 0, thickness, height);                // left
  rect(0, height - thickness, width, thickness);// bottom
  rect(width - thickness, 0, thickness, height - 50); // right wall leaves gap
}

// wrap helpers (duplicated on purpose = student style)
function wrap1() {
  if (o1x > width) o1x = 0;
  if (o1x < 0) o1x = width;
  if (o1y > height) o1y = 0;
  if (o1y < 0) o1y = height;
}

function wrap2() {
  if (o2x > width) o2x = 0;
  if (o2x < 0) o2x = width;
  if (o2y > height) o2y = 0;
  if (o2y < 0) o2y = height;
}

function wrap3() {
  if (o3x > width) o3x = 0;
  if (o3x < 0) o3x = width;
  if (o3y > height) o3y = 0;
  if (o3y < 0) o3y = height;
}

// add one static obstacle where you click
function mouseClicked() {
  if (mouseShapeX === null) {
    mouseShapeX = mouseX;
    mouseShapeY = mouseY;
  }
}
