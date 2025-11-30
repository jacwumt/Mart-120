// Week 13 - Arrays - John Weber

// x and y for my character
var characterX;
var characterY;
var characterSize = 25;

// define the key codes for each letter
var w = 87;
var s = 83;
var a = 65;
var d = 68;

// obstacle arrays
var obsX = [];
var obsY = [];
var obsSize = [];
var obsVX = [];
var obsVY = [];
var obsR = [];
var obsG = [];
var obsB = [];
var numObstacles = 5;

// create a shape when the mouse is clicked (non-moving obstacle)
var mouseShapeX = null;
var mouseShapeY = null;

// border
var borderThickness = 10;

// exit area (bottom-right gap)
var won = false;

function setup()
{
    createCanvas(500, 600);
    createCharacter(200, 350);
    createObstacles();
}

function draw()
{
    background(120,45,78);

    createBorders(borderThickness);
    createExit();

    drawCharacter();
    characterMovement();

    drawMouseShape();

    drawObstacles();
    moveObstacles();

    showWin();

    // collisions are ignored on purpose
}

// ---------- player ----------

function createCharacter(x, y)
{
    characterX = x;
    characterY = y;
}

function drawCharacter()
{
    fill(23,40,123);
    circle(characterX, characterY, characterSize);
}

function characterMovement()
{
    if(won)
    {
        return;
    }

    // left / right
    if(keyIsDown(a) || keyIsDown(LEFT_ARROW))
    {
        characterX -= 3;
    }
    else if(keyIsDown(d) || keyIsDown(RIGHT_ARROW))
    {
        characterX += 3;
    }

    // up / down
    if(keyIsDown(w) || keyIsDown(UP_ARROW))
    {
        characterY -= 3;
    }
    else if(keyIsDown(s) || keyIsDown(DOWN_ARROW))
    {
        characterY += 3;
    }

    var r = characterSize / 2;
    if(characterX < borderThickness + r) characterX = borderThickness + r;
    if(characterX > width - borderThickness - r) characterX = width - borderThickness - r;
    if(characterY < borderThickness + r) characterY = borderThickness + r;
    if(characterY > height - borderThickness - r) characterY = height - borderThickness - r;
}

// ---------- mouse obstacle ----------

function drawMouseShape()
{
    if(mouseShapeX !== null && mouseShapeY !== null)
    {
        fill(120,130,140);
        rect(mouseShapeX, mouseShapeY, 40, 40);
    }
}

function mouseClicked()
{
    // one non-moving obstacle
    if(mouseShapeX === null)
    {
        mouseShapeX = mouseX;
        mouseShapeY = mouseY;
    }
}

// ---------- obstacles with arrays ----------

function createObstacles()
{
    for(var i = 0; i < numObstacles; i++)
    {
        obsX[i] = random(50, width - 50);
        obsY[i] = random(50, height - 50);
        obsSize[i] = random(20, 50);

        // base speed set once
        obsVX[i] = random(-2, 2);
        obsVY[i] = random(-2, 2);

        obsR[i] = random(50, 255);
        obsG[i] = random(50, 255);
        obsB[i] = random(50, 255);
    }
}

function drawObstacles()
{
    noStroke();
    for(var i = 0; i < numObstacles; i++)
    {
        fill(obsR[i], obsG[i], obsB[i]);
        circle(obsX[i], obsY[i], obsSize[i]);
    }
}

function moveObstacles()
{
    for(var i = 0; i < numObstacles; i++)
    {
        // small random wobble
        obsVX[i] += random(-0.1, 0.1);
        obsVY[i] += random(-0.1, 0.1);

        // limit max speed
        obsVX[i] = constrain(obsVX[i], -3, 3);
        obsVY[i] = constrain(obsVY[i], -3, 3);

        // move
        obsX[i] += obsVX[i];
        obsY[i] += obsVY[i];

        // wrap around screen
        if (obsX[i] > width)  obsX[i] = 0;
        if (obsX[i] < 0)      obsX[i] = width;
        if (obsY[i] > height) obsY[i] = 0;
        if (obsY[i] < 0)      obsY[i] = height;
    }
}

// ---------- borders, exit, win ----------

function createBorders(thickness)
{
    fill(0);
    noStroke();

    // top border
    rect(0, 0, width, thickness);
    // left border
    rect(0, 0, thickness, height);
    // bottom border
    rect(0, height - thickness, width, thickness);
    // right upper border (leave bottom 50 open for exit)
    rect(width - thickness, 0, thickness, height - 50);
}

function createExit()
{
    fill(0);
    textSize(16);
    text("EXIT", width - 50, height - 50);
}

function showWin()
{
    var r = characterSize / 2;
    var inExitX = characterX + r >= width - borderThickness;
    var inExitY = characterY + r >= height - 50;

    if(!won && inExitX && inExitY)
    {
        won = true;
    }

    if(won)
    {
        fill(0);
        textSize(26);
        text("You Win!", width / 2 - 60, height / 2 - 20);
    }
}
