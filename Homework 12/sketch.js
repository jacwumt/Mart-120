// Week 12 - John Weber

var playerX;
var playerY;
var playerSize = 24;

var w = 87, a = 65, s = 83, d = 68;

var mouseObjX = null;
var mouseObjY = null;

var o1 = { x:120, y:120, vx:2.0,  vy:1.2,  size:22, col:[230,80,80], shape:"circle" };
var o2 = { x:300, y:260, vx:-1.6, vy:2.1, w:54, h:32, col:[80,180,255], shape:"rect" };
var o3 = { x:420, y:180, vx:1.2,  vy:-1.4, size:34, col:[120,220,140], shape:"circle" };

var BORDER = 10;
var won = false;

function setup() {
  createCanvas(500, 600);
  createPlayer(200, 350);
  createObstacles();
}

function draw() {
  background(120, 45, 78);

  createBorders(BORDER);
  createExit();

  drawPlayer();
  movePlayer();

  drawMouseObject();

  drawObstacles();

  moveObstacle1();
  moveObstacle2();
  moveObstacle3();

  showWin();
}

function createPlayer(x, y) {
  playerX = x;
  playerY = y;
}

function drawPlayer() {
  fill(255, 220, 150);
  noStroke();
  circle(playerX, playerY, playerSize);
}

function movePlayer() {
  if (won) return;

  // left / right (W+A+D and arrow keys)
  if (keyIsDown(a) || keyIsDown(LEFT_ARROW)) {
    playerX -= 3;
  } 
  else if (keyIsDown(d) || keyIsDown(RIGHT_ARROW)) {
    playerX += 3;
  }

  // up / down (W/S and arrow keys)
  if (keyIsDown(w) || keyIsDown(UP_ARROW)) {
    playerY -= 3;
  }
  else if (keyIsDown(s) || keyIsDown(DOWN_ARROW)) {
    playerY += 3;
  }

  var r = playerSize / 2;
  if (playerX < BORDER + r) playerX = BORDER + r;
  if (playerX > width - BORDER - r) playerX = width - BORDER - r;
  if (playerY < BORDER + r) playerY = BORDER + r;
  if (playerY > height - BORDER - r) playerY = height - BORDER - r;
}

function createObstacles() {
  // already set up in the globals
}

function drawObstacles() {
  noStroke();

  fill(o1.col);
  circle(o1.x, o1.y, o1.size);

  fill(o2.col);
  rect(o2.x, o2.y, o2.w, o2.h);

  fill(o3.col);
  circle(o3.x, o3.y, o3.size);
}

function moveObstacle1() {
  o1.vx += random(-0.05, 0.05);
  o1.vy += random(-0.05, 0.05);
  o1.x += o1.vx;
  o1.y += o1.vy;
  wrap(o1);
}

function moveObstacle2() {
  o2.vx += random(-0.05, 0.05);
  o2.vy += random(-0.05, 0.05);
  o2.x += o2.vx;
  o2.y += o2.vy;
  wrap(o2);
}

function moveObstacle3() {
  o3.vx += random(-0.05, 0.05);
  o3.vy += random(-0.05, 0.05);
  o3.x += o3.vx;
  o3.y += o3.vy;
  wrap(o3);
}

function wrap(obj) {
  if (obj.x > width)  obj.x = 0;
  if (obj.x < 0)      obj.x = width;
  if (obj.y > height) obj.y = 0;
  if (obj.y < 0)      obj.y = height;
}

function drawMouseObject() {
  if (mouseObjX !== null) {
    fill(200, 200, 0);
    rect(mouseObjX, mouseObjY, 40, 40);
  }
}

function mousePressed() {
  if (mouseObjX === null) {
    mouseObjX = mouseX;
    mouseObjY = mouseY;
  }
}

function createBorders(t) {
  noStroke();
  fill(0);

  rect(0, 0, width, t);
  rect(0, 0, t, height);
  rect(0, height - t, width, t);
  rect(width - t, 0, t, height - 50);
}

function createExit() {
  fill(255);
  textSize(16);
  text("EXIT", width - 50, height - 55);
}

function showWin() {
  var r = playerSize / 2;
  var insideX = playerX + r >= width - BORDER;
  var insideY = playerY + r >= height - 50;

  if (!won && insideX && insideY) {
    won = true;
  }

  if (won) {
    fill(255);
    textSize(30);
    text("YOU WIN!", width / 2 - 80, height / 2);
  }
}
