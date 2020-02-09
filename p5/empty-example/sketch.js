let blocks = [];
var buttonStart;
let buttonFinish;
let buttonObstacle;

function setup() {
  createCanvas(600, 600);
  noStroke();
  rectMode(CENTER);
  //Create grid
  background('#2c3e50');
  for (var i = 20; i < width; i += 20) {
    // draw one line of 20 rectangles across the x-axis
    for (var j = 40; j < height - 80; j += 20) {
      let block = new Block(i,j + 80,20);
      blocks.push(block);
    }
  }
  createButtons();
}

function createButtons()
{
  buttonStart = createButton('Set Start');
  buttonStart.position(40, 30);
  buttonStart.class("btn fourth start");
  buttonStart.mousePressed(setStart);

  buttonStart = createButton('Set Finish');
  buttonStart.position(140, 30);
  buttonStart.class("btn fourth finish");
  buttonStart.mousePressed(setFinish);

  buttonStart = createButton('Set Obstacle');
  buttonStart.position(240, 30);
  buttonStart.class("btn fourth obstacle");
  buttonStart.mousePressed(setObstacle);
}



function draw() {
  for(var i = 0; i < blocks.length; i++)
  {
    //blocks[i].rollover(mouseX, mouseY);
    blocks[i].show();
  };
}

function mousePressed() {
  for(let i = 0; i < blocks.length; i++)
  {
    blocks[i].clicked(mouseX, mouseY);
  }
}

function setStart()
{
  //For all blocks set their colors
  for(var i = 0; i < blocks.length; i++)
  {
    blocks[i].rolloverColor = color(231, 76, 60, 25);
    blocks[i].settingColor = color(231,76,60);
  };
}

function setFinish()
{
  for(var i = 0; i < blocks.length; i++)
  {
    blocks[i].rolloverColor = color(26, 188, 156, 25);
    blocks[i].settingColor = color(26, 188, 156);
  };
}

function setObstacle()
{
  for(var i = 0; i < blocks.length; i++)
  {
    blocks[i].rolloverColor = color(52, 152, 219, 25);
    blocks[i].settingColor = color(52, 152, 219);
  };
}

function Block(x, y, side) {
    this.x = x;
    this.y = y;
    this.side = side;
    this.color = color(255);
    this.settingColor = color(255);
    this.rolloverColor = color(255,165,0);
}

Block.prototype.getColor = function()
{
  return this.color;
}

Block.prototype.setColor = function()
{
  this.color = this.settingColor;
}

Block.prototype.setWhite = function()
{
  this.color = color(255);
}
  
Block.prototype.show = function()
{
    var lightBlue = color(173,216,230);
    //color is always set
    fill(this.color, 125);
    stroke(lightBlue);
    rect(this.x, this.y, this.side, this.side);
}

Block.prototype.clicked = function(mX, mY)
{
  let d = dist(mX, mY, this.x, this.y);
  if (d < this.side/2)
  {
    if(str(this.color) == str(color(255)))
    {
      this.clearSameColor(this.settingColor)
      console.log("White");
      this.color = this.settingColor;
    }
    else
    {
      console.log("Non white");
      this.color = color(255);

    }
  }
}

Block.prototype.clearSameColor = function(color)
{
  //Remove all blocks with the same color
  for(var i = 0; i < blocks.length; i++)
  {
    if(str(blocks[i].color) == str(color))
    {
      blocks[i].setWhite();
    }
  }
}

// Block.prototype.rollover = function(mX, mY)
// {
//   let d = dist(mX, mY, this.x, this.y);
//   //If mouse is in a block
//   if (d < this.side/2)
//   {
//       //If it is not an obstacle change color
//       if(this.color != color(255)) this.color = this.rolloverColor;
//   }
//   //If mouse is not in the block for every other block
//   else
//   {
//     if(this.color != color(255)) this.color = 255;
//   }
// }

