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
  //Holds tuples
  let current = getOpenRandomSpace();
  current = [1,1]
  //method needs to be created from all choosen blocks
  let discovered = [];
  blocks[getGrid2DIndex(current[0], current[1])].clearBlock();
  discovered.push(current);
  let frontier = [];
  let lastestDiscovered = current;
  let i = 0;
  do
  {
    frontier = getFrontier(lastestDiscovered, discovered, frontier);
    //choose a frontier to use that is not discovered
    let neighbor = Math.floor(Math.random() * frontier.length);
    let frontierChoosen = frontier[neighbor];
    console.log("Frontier Choosen: " + frontierChoosen);
    console.log("Dicovered Now: " + Array.from(discovered).join(' '));
    //clear the block
    blocks[getGrid2DIndex(frontierChoosen[0], frontierChoosen[1])].clearBlock();
    //remove the block between the two
    eraseBlock(frontierChoosen, discovered);
    lastestDiscovered = frontier[neighbor];
    //can safely add a frontier block to discovered
    discovered.push(frontier[neighbor]);
    frontier.splice(frontier[neighbor],1);
    i++;
  }
  while(frontier.length != 0);
}

function eraseBlock(frontierChoosen, discovered)
{
  let choiceChoosen = [];
  //check the adjacent values Up Down Right Left
  let currentIndexX = frontierChoosen[0];
  let currentIndexY = frontierChoosen[1];
  //Top
  if(currentIndexY + 2 <= numberOfTilesVertical && contains(discovered,[currentIndexX, currentIndexY + 2]))
    {
      console.log('Connecting : ' + [currentIndexX, currentIndexY + 2]);
      choiceChoosen.push([currentIndexX, currentIndexY + 2]);
    }
  //Bottom
  if(currentIndexY - 2 > 0 && contains(discovered, [currentIndexX, currentIndexY - 2])) 
    {
      console.log('Connecting: ' + [currentIndexX, currentIndexY + 2]);
      choiceChoosen.push([currentIndexX, currentIndexY - 2]);
    }
  //Right
  if(currentIndexX + 2 <= numberOfTilesHorizontal && contains(discovered, [currentIndexX + 2, currentIndexY])) 
    {
      console.log('Connecting: ' + [currentIndexX, currentIndexY + 2]);
      choiceChoosen.push([currentIndexX + 2, currentIndexY]);
    }
  //Left
  if(currentIndexX - 2 > 0 && contains(discovered, [currentIndexX - 2, currentIndexY])) 
    {
      console.log('Connecting: ' + [currentIndexX, currentIndexY + 2]);
      choiceChoosen.push([currentIndexX - 2, currentIndexY]);
    }
  let choice = choiceChoosen[Math.floor(Math.random() * choiceChoosen.length)];
  console.log("Need to erase this: " + choice);
  blocks[getGrid2DIndex((choice[0] + frontierChoosen[0])/2, (choice[1] + frontierChoosen[1])/2)].clearBlock();
}

// Add to the frontier
function getFrontier(lastestDiscovered, discovered, frontier) {
  //A block that is discovered
  let currentIndexX = lastestDiscovered[0];
  let currentIndexY = lastestDiscovered[1];
  //Check if new frontier values are in the grid, not already discovered, not already in the frontier (to avoid duplicates)
  if(currentIndexY + 2 <= numberOfTilesVertical && !contains(discovered,[currentIndexX, currentIndexY + 2]) && !contains(frontier, [currentIndexX, currentIndexY + 2]))
  {
    console.log('Adding new frontier: ' + [currentIndexX, currentIndexY + 2]);
    frontier.push([currentIndexX, currentIndexY + 2]);
    blocks[getGrid2DIndex(currentIndexX, currentIndexY + 2)].fillIn(color(0));
  }
  if(currentIndexY - 2 > 0 && !contains(discovered, [currentIndexX, currentIndexY - 2]) && !contains(frontier, [currentIndexX, currentIndexY - 2]))
  {
    console.log('Adding new frontier: ' + [currentIndexX, currentIndexY - 2]);
    frontier.push([currentIndexX, currentIndexY - 2]);
    blocks[getGrid2DIndex(currentIndexX, currentIndexY - 2)].fillIn(color(0));
  }
  if(currentIndexX + 2 <= numberOfTilesHorizontal && !contains(discovered, [currentIndexX + 2, currentIndexY]) && !contains(frontier, [currentIndexX + 2, currentIndexY]))
  {
    console.log('Adding new frontier: ' + [currentIndexX + 2, currentIndexY]);
    frontier.push([currentIndexX + 2, currentIndexY]);
    blocks[getGrid2DIndex(currentIndexX + 2, currentIndexY)].fillIn(color(0));
  }
  if(currentIndexX - 2 > 0 && !contains(discovered, [currentIndexX - 2, currentIndexY]) && !contains(frontier, [currentIndexX - 2, currentIndexY]))
  {
    console.log('Adding new frontier: ' + [currentIndexX - 2, currentIndexY]);
    frontier.push([currentIndexX - 2, currentIndexY]);
    blocks[getGrid2DIndex(currentIndexX - 2, currentIndexY)].fillIn(color(0));
  }
  return frontier;
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

function contains(arr, val)
{
  for(var i = 0; i < arr.length; i++)
  {
    if(JSON.stringify(arr[i]) == JSON.stringify(val))
    {
      return true;
    }
  }
  return false;
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

