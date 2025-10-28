// Portrait of John Weber
// Using required shapes: circle, ellipse, rect, point, line, triangle, text

function setup() {
  createCanvas(500, 600);
  background(180, 210, 255);
}

function draw() {

  // Title
  fill(0);
  textSize(26);
  text("Portrait of John Weber", 110, 40);

  // Head (ellipse)
  fill(255, 225, 185);
  stroke(0);
  ellipse(250, 160, 150, 190);

  // Eyes (ellipse + point pupils)
  fill(255);
  ellipse(225, 145, 35, 25);
  ellipse(275, 145, 35, 25);

  fill(40, 110, 200); // blue eyes
  point(225, 145);
  point(275, 145);

  // Nose (triangle) — first point bottom-left
  noStroke();
  fill(255, 215, 175);
  triangle(240, 175, 260, 175, 250, 155);

  // Mouth (line)
  stroke(120, 30, 50);
  strokeWeight(4);
  line(230, 195, 270, 195);

  // FULL beard (points)
  stroke(200, 170, 60);
  strokeWeight(8);
  for (let x = 215; x <= 285; x += 14) {
    point(x, 205);
    point(x - 10, 210);
    point(x - 5, 220);
  }

  // Shoulder-length wavy blond hair (lines)
  stroke(240, 220, 80);
  strokeWeight(10);
  line(185, 115, 165, 250);
  line(200, 110, 180, 250);
  line(315, 115, 335, 250);
  line(300, 110, 320, 250);

  // Top hair waves
  strokeWeight(8);
  line(200, 95, 230, 80);
  line(230, 90, 260, 75);
  line(260, 95, 300, 80);

  // Body (rect — T-shirt)
  noStroke();
  fill(100, 140, 255); 
  rect(200, 245, 100, 150);

  // Arms (rects)
  rect(300, 255, 50, 15);
  rect(150, 255, 50, 15);

  // Legs (rects)
  rect(220, 395, 20, 100);
  rect(260, 395, 20, 100);

  // Simple shirt decoration — triangle (second triangle)
  fill(255);
  triangle(225, 360, 275, 360, 250, 330);

  // Signature
  fill(0);
  textSize(20);
  text("Signed: John Weber", 290, 580);
}
