let blocks = [];
var buttonStart;
let buttonFinish;
let buttonObstacle;
let drawingWalls = false;

function setup() {
  createCanvas(600, 600);
  noStroke();
  rectMode(CENTER);
  //Create grid
  background("#2c3e50");
  for (var i = 20; i < width; i += 20) {
    // draw one line of 20 rectangles across the x-axis
    for (var j = 40; j < height - 80; j += 20) {
      let block = new Block(i, j + 80, 20);
      blocks.push(block);
    }
  }
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
    console.log("Drawing");
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
      if (!drawingWall) this.clearSameColor(this.settingColor);
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
