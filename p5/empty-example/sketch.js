let blocks = [];
var buttonStart;
let buttonFinish;
let buttonObstacle;
let buttonMazeGenerator;
let drawingWalls = false;
let mazeAlgorithm = "PRIMS";
let canvasHeight = 840;
let canvasWidth = 900;
let numberOfTilesHorizontal = 0;
let numberOfTilesVertical = 0;

function setup() {
  createCanvas(canvasHeight, canvasWidth);
  noStroke();
  rectMode(CENTER);
  //Create grid
  background("#2c3e50");
  for (var i = 20; i < height - 80; i += 20) {
    // draw one line of 20 rectangles across the x-axis
    for (var j = 20; j < width; j += 20) {
      let block = new Block(j, i + 80, 20);
      blocks.push(block);
    }
  }
  numberOfTilesHorizontal = ((i - 20) / 20);
  numberOfTilesVertical = ((j - 40) / 20) - 1;
  console.log(numberOfTilesHorizontal + " " + numberOfTilesVertical);
  createButtons();
}

function createButtons() {
  buttonStart = createButton("Set Start");
  buttonStart.position(40, 30);
  buttonStart.class("btn fourth start");
  buttonStart.mousePressed(setStart);

  buttonFinish = createButton("Set Finish");
  buttonFinish.position(140, 30);
  buttonFinish.class("btn fourth finish");
  buttonFinish.mousePressed(setFinish);

  buttonObstacle = createButton("Set Obstacle");
  buttonObstacle.position(240, 30);
  buttonObstacle.class("btn fourth obstacle");
  buttonObstacle.mousePressed(setWall);

  buttonMazeGenerator = createButton("Make Maze");
  buttonMazeGenerator.position(440, 30);
  buttonMazeGenerator.class("btn fourth obstacle");
  buttonMazeGenerator.mousePressed(generateMaze);
}

function draw() {
  for (var i = 0; i < blocks.length; i++) {
    //For the default orange color
    blocks[i].rollover(mouseX, mouseY);
    blocks[i].show();
  }
}

function mousePressed() {
  for (let i = 0; i < blocks.length; i++) {
    //Emulate behavior of each click
    blocks[i].clicked(mouseX, mouseY);
  }
}

mouseDragged = function() {
  //Selected set obstacle
  if (drawingWalls) {
    for (var i = 0; i < blocks.length; i++) {
      blocks[i].dragged(mouseX, mouseY);
    }
  }
};

function setStart() {
  drawingWalls = false;
  //For all blocks set their colors
  for (var i = 0; i < blocks.length; i++) {
    blocks[i].rolloverColor = color(231, 76, 60, 25);
    blocks[i].settingColor = color(231, 76, 60);
  }
}

function setFinish() {
  drawingWalls = false;
  for (var i = 0; i < blocks.length; i++) {
    blocks[i].rolloverColor = color(26, 188, 156, 25);
    blocks[i].settingColor = color(26, 188, 156);
  }
}

function setWall() {
  drawingWalls = true;
  //Set all rolloverColor
  for (var i = 0; i < blocks.length; i++) {
    blocks[i].rolloverColor = color(52, 152, 219, 25);
    blocks[i].settingColor = color(52, 152, 219);
  }
}

function generateMaze() {
  //set up maze
  mazeGridInit();
  primsAlgorithm();
}

function primsAlgorithm()
{
  let current = getOpenRandomSpace();
  //method needs to be created from all choosen blocks
  let discovered = [current];
  let frontier = [];
  do
  {
    frontier = getFrontier(current[0], current[1]);
    //choose a neighbor 
    let neighbor = Math.floor(Math.random() * frontier.length);
    //remove the block between the two
    blocks[getGrid2DIndex((frontier[neighbor][0] + current[0])/2, (frontier[neighbor][1] + current[1])/2)].clearBlock();
  }
  while(frontier.length != 0);
}

// Contains 
function getFrontier(currentIndexX, currentIndexY) {
  let neighborIndices = [];
  if(currentIndexY + 2 <= numberOfTilesVertical)
  {
    neighborIndices.push([currentIndexX, currentIndexY + 2]);
  }
  if(currentIndexY - 2 > 0)
  {
    neighborIndices.push([currentIndexX, currentIndexY - 2]);
  }
  if(currentIndexX + 2 <= numberOfTilesHorizontal)
  {
    neighborIndices.push([currentIndexX + 2, currentIndexY]);
  }
  if(currentIndexX - 2 > 0)
  {
    neighborIndices.push([currentIndexX - 2, currentIndexY]);
  }
  return neighborIndices;
}

function getOpenRandomSpace() {
  let startNodeIndexX = 0;
  let startNodeIndexY = 0;
  do
  {
    startNodeIndexX = Math.floor(Math.random() * numberOfTilesHorizontal);
    startNodeIndexY = Math.floor(Math.random() * numberOfTilesVertical);
  }
  while(blocks[getGrid2DIndex(startNodeIndexX, startNodeIndexY)].isObstacle);
  return [startNodeIndexX, startNodeIndexY];
}

function mazeGridInit() {
  for (var i = 0; i < numberOfTilesVertical + 2; i++) {
    for (var j = 0; j < numberOfTilesHorizontal; j++) {
      if((i % 2 == 0 || j % 2 == 0) && !blocks[getGrid2DIndex(i,j)].isObstacle)
      {
        blocks[getGrid2DIndex(i,j)].fillIn(color(52, 152, 219));
      }
    }
  }
}

function getGrid2DIndex(x, y)
{
  //If i want to get 2 by 2 then numberOfTilesVertical*(x-1) + 2
  return ((numberOfTilesHorizontal + 1) * y) + x;
}

function Block(x, y, side) {
  this.x = x;
  this.y = y;
  this.side = side;
  this.color = color(255);
  this.settingColor = color(255);
  this.rolloverColor = color(255, 165, 0);
  this.isObstacle = false;
}

Block.prototype.getColor = function() {
  return this.color;
};

Block.prototype.setColor = function() {
  this.color = this.settingColor;
};

Block.prototype.setWhite = function() {
  this.color = color(255);
};

Block.prototype.show = function() {
  var lightBlue = color(173, 216, 230);
  //color is always set
  fill(this.color, 125);
  stroke(lightBlue);
  rect(this.x, this.y, this.side, this.side);
};

Block.prototype.clicked = function(mX, mY) {
  let d = dist(mX, mY, this.x, this.y);
  if (d < this.side / 2) {
    //TODO: Cannot use color due to roll over
    if (!this.isObstacle) {
      this.isObstacle = true;
      if (!drawingWalls) this.clearSameColor(this.settingColor);
      this.color = this.settingColor;
    } else {
      this.color = color(255);
      this.isObstacle = false;
    }
  }
};

Block.prototype.clearSameColor = function(color) {
  //Remove all blocks with the same color
  for (var i = 0; i < blocks.length; i++) {
    if (str(blocks[i].color) == str(color)) {
      blocks[i].isObstacle = false;
      blocks[i].setWhite();
    }
  }
};

Block.prototype.rollover = function(mX, mY) {
  let d = dist(mX, mY, this.x, this.y);
  //If mouse is in a block
  if (d < this.side / 2) {
    //If it is not an obstacle change color
    if (!this.isObstacle) this.color = this.rolloverColor;
  } else {
    if (!this.isObstacle) this.color = color(255);
  }
};

Block.prototype.dragged = function(mX, mY) {
  let d = dist(mX, mY, this.x, this.y);
  //If mouse is in a block
  if (d < this.side / 2) {
    //If it is not an obstacle change color
    if (!this.isObstacle) {
      this.isObstacle = true;
      this.color = this.settingColor;
    }
  }
};

Block.prototype.fillIn = function(color) {
  this.isObstacle = true;
  this.color = color;
};

Block.prototype.clearBlock = function() {
  this.isObstacle = false;
  this.color = color(255);
};

