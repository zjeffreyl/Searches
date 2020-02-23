let blocks = [];
var buttonStart;
let buttonFinish;
let buttonObstacle;
let buttonMazeGenerator;
let chooseAlgorithm;
let runMaze;
let drawingWalls = false;
let mazeAlgorithm = "PRIMS";
let canvasWidth = 880;
let canvasHeight = 960;
let numberOfTilesHorizontal = 0;
let numberOfTilesVertical = 0;
let mazeBlocksToErase = [];
let mazeFinished = false;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  noStroke();
  rectMode(CENTER);
  //Create grid
  background("#2c3e50");
  var i = 0;
  var j = 0;
  for (i = 20; i < height - 80; i += 20) {
    // draw one line of 20 rectangles across the x-axis
    for (j = 20; j < width; j += 20) {
      let block = new Block(j, i + 80, 20);
      blocks.push(block);
    }
  }
  numberOfTilesVertical = ((i - 20) / 20);
  numberOfTilesHorizontal = ((j - 20) / 20);
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

  chooseAlgorithm = createSelect("Select Algorithm");
  chooseAlgorithm.position(540, 30);
  chooseAlgorithm.option("DFS");
  chooseAlgorithm.option("BFS");

  runMaze = createButton("Solve");
  runMaze.position(640,30);
  runMaze.mousePressed(solveMaze);
}


function draw() {
  for (var i = 0; i < blocks.length; i++) {
    //For the default orange color
    blocks[i].rollover(mouseX, mouseY);
    blocks[i].show();
  }
}

function solveMaze() {
  algorithms = new Algorithms(chooseAlgorithm.value(), blocks, numberOfTilesVertical, numberOfTilesHorizontal);
  algorithms.run();
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
