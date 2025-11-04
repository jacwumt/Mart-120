// Animated Portrait of John Weber
// x-axis movers (≥2), y-axis movers (≥2), diagonal mover (≥1),
// different random speeds, and title scales larger 5 times then smaller 5 times (loop).

let leftEyeX, rightEyeX;
let leftEyeSpeed, rightEyeSpeed;

let badgeX, badgeSpeed; // badge/triangle moves along x

let hair1Y, hair2Y;
let hair1Speed, hair2Speed; // hair moves on y

let beardYOffset, beardSpeed; // beard cluster moves on y

let earringX, earringY, earringSpeedX, earringSpeedY; // diagonal mover

// Title scaling cycle
let titleBase = 26;
let stepIndex = 0; // 0..9 (0-4 scale up, 5-9 scale down)
let framesPerStep = 14;
let frameCounter = 0;

function setup() {
  createCanvas(500, 600);
  // initialize positions
  leftEyeX = 225;
  rightEyeX = 275;
  leftEyeSpeed = random(0.4, 1.2);   // x-axis speeds (different)
  rightEyeSpeed = random(0.6, 1.6);

  badgeX = 250;
  badgeSpeed = random(0.8, 1.8);

  hair1Y = 115;
  hair2Y = 110;
  hair1Speed = random(0.3, 1.0);      // y-axis speeds
  hair2Speed = random(0.5, 1.4);

  beardYOffset = 0;
  beardSpeed = random(0.4, 1.0);

  earringX = 335;
  earringY = 250;
  earringSpeedX = random(0.7, 1.5);
  earringSpeedY = random(0.5, 1.2);

  textFont('Georgia');
}

function draw() {
  background(180, 210, 255);

  // --- Title with step-scaling (5 up steps, 5 down steps) ---
  frameCounter++;
  if (frameCounter > framesPerStep) {
    frameCounter = 0;
    stepIndex = (stepIndex + 1) % 10; // 0..9 loop
  }
  // compute text size: steps 0-4 increase, 5-9 decrease
  let sizeOffset;
  if (stepIndex <= 4) {
    sizeOffset = stepIndex * 4;    // grows in 5 steps
  } else {
    sizeOffset = (9 - stepIndex) * 4; // shrinks in 5 steps
  }
  let titleSize = titleBase + sizeOffset;
  fill(0);
  textSize(titleSize);
  textAlign(CENTER, TOP);
  text("Portrait of John Weber", width / 2, 10);

  // --- static-ish head & body (base portrait) ---
  noStroke();
  fill(255, 225, 185);
  ellipse(250, 160, 150, 190); // head

  // T-shirt (rect)
  fill(100, 140, 255);
  rectMode(CENTER);
  rect(250, 315, 140, 160);

  // arms (rects)
  rect(320, 310, 50, 15);
  rect(180, 310, 50, 15);

  // legs
  rect(230, 395, 20, 100);
  rect(270, 395, 20, 100);

  // --- Animate eyes (x-axis movers) ---
  // left eye moves between 210 and 240
  leftEyeX += leftEyeSpeed;
  if (leftEyeX > 240 || leftEyeX < 210) leftEyeSpeed *= -1;

  // right eye moves between 260 and 290
  rightEyeX += rightEyeSpeed;
  if (rightEyeX > 290 || rightEyeX < 260) rightEyeSpeed *= -1;

  // draw eyes (ellipses) and blue pupils (points)
  fill(255);
  stroke(0);
  strokeWeight(1.5);
  ellipse(leftEyeX, 145, 35, 25);
  ellipse(rightEyeX, 145, 35, 25);

  noStroke();
  fill(40, 110, 200); // blue pupils
  ellipse(leftEyeX, 145, 12, 12);
  ellipse(rightEyeX, 145, 12, 12);

  // --- Animate badge/triangle moving on x-axis (another x-mover) ---
  badgeX += badgeSpeed;
  if (badgeX > 300 || badgeX < 200) badgeSpeed *= -1;

  // Draw badge triangle: first point is bottom-left (requirement)
  fill(255);
  stroke(50);
  strokeWeight(1);
  // triangle(x1,y1 bottom-left, x2,y2, x3,y3)
  triangle(badgeX - 25, 360, badgeX + 25, 360, badgeX, 330);

  // --- Animate hair strands moving on y-axis (two y-movers) ---
  hair1Y += hair1Speed;
  if (hair1Y > 250 || hair1Y < 95) hair1Speed *= -1;

  hair2Y += hair2Speed;
  if (hair2Y > 250 || hair2Y < 95) hair2Speed *= -1;

  stroke(240, 220, 80);
  strokeWeight(10);
  // left side hair strand (line) vertical-ish (moves on y)
  line(185, hair1Y, 165, hair1Y + 90);
  // right side hair strand
  line(315, hair2Y, 335, hair2Y + 90);

  // top hair waves (static-ish)
  strokeWeight(8);
  line(200, 95, 230, 80);
  line(230, 90, 260, 75);
  line(260, 95, 300, 80);

  // --- Animate beard cluster moving on y-axis (another y-mover) ---
  beardYOffset += beardSpeed;
  if (beardYOffset > 10 || beardYOffset < -10) beardSpeed *= -1;

  stroke(160, 130, 55);
  strokeWeight(8);
  // draw multiple points for full beard, offset by beardYOffset
  for (let x = 215; x <= 285; x += 14) {
    point(x, 205 + beardYOffset);
    point(x - 10, 210 + beardYOffset);
    point(x - 5, 220 + beardYOffset);
  }

  // --- Diagonal mover: right earring (moves on both x & y) ---
  earringX += earringSpeedX;
  earringY += earringSpeedY;
  if (earringX > 380 || earringX < 320) earringSpeedX *= -1;
  if (earringY > 320 || earringY < 200) earringSpeedY *= -1;

  noStroke();
  fill(255, 220, 80);
  ellipse(earringX, earringY, 12, 12); // diagonal moving circle

  // --- Nose (triangle small, static) - keep first point bottom-left ---
  noStroke();
  fill(245, 215, 185);
  triangle(238, 175, 262, 175, 250, 155);

  // --- Mouth (static line) ---
  stroke(120, 30, 50);
  strokeWeight(4);
  line(230, 195, 270, 195);

  // --- Signature (static) ---
  noStroke();
  fill(0);
  textSize(18);
  textAlign(RIGHT, BOTTOM);
  text("Signed: John Weber", width - 18, height - 18);
}
