function Block(x, y, side) {
    this.x = x;
    this.y = y;
    this.side = side;
    this.isObstacle = false;
    this.brightness = (255,255,255);
}
  
Block.prototype.show = function()
{
    let lightBlue = color(173,216,230);
    fill(this.brightness, 125);
    stroke(lightBlue);
    rect(this.x, this.y, this.side, this.side);
}

Block.prototype.toggleObstacle = function()
{
  this.isObstacle = !this.isObstacle;
  this.isObstacle ? this.brightness = color(68, 112, 173) : this.brightness = color(255,255,255);
}

Block.prototype.clicked = function(mX, mY)
{
  let d = dist(mX, mY, this.x, this.y);
  if (d < this.side/2)
  {
    this.toggleObstacle()
  }
}

Block.prototype.rollover = function(mX, mY)
{
  let d = dist(mX, mY, this.x, this.y);
  if (d < this.side/2)
  {
      if(!this.isObstacle) this.brightness = color(255,165,0)
  }
  else
  {
    this.isObstacle ? this.brightness = color(68, 112, 173) : this.brightness = 255;
  }
}

function SelectorButton(x, y, color, text) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.text = text;
}
  
SelectorButton.prototype.show = function()
{
    this.createButton(this.text).style('color', this.color).style('border', '2px solid ' + this.color);
    this.position(this.x, this.y);
    this.mouseOver(this.onTop).mouseOut(this.outside);
}


SelectorButton.prototype.onTop = function() 
{
    this.style('color', '#fff').style('outline','0').style('transition', 'box-shadow 300ms ease-in-out, color 300ms ease-in-out').style('box-shadow', '0 0 40px 40px ' + this.color + ' inset');
}

SelectorButton.prototype.outside = function() 
{
    button.style('color', this.color).style('outline','0').style('transition', 'box-shadow 300ms ease-in-out, color 300ms ease-in-out').style('box-shadow', '0 0 40px 40px #fff inset'); 
}


let blocks = [];
let buttonStart;
let buttonFinish;
let buttonObstacle;

function setup() {
  createCanvas(600, 600);
  noStroke();
  rectMode(CENTER);
  createButtons();
  //Create grid
  background(255);
  for (var i = 20; i < width; i += 20) {
    // draw one line of 20 rectangles across the x-axis
    for (var j = 40; j < height - 80; j += 20) {
      let block = new Block(i,j + 80,20);
      blocks.push(block);
    }
  }
}

function mousePressed() {
  for(let i = 0; i < blocks.length; i++)
  {
    blocks[i].clicked(mouseX, mouseY);
  }
}

function createButtons()
{
  buttonStart = SelectorButton(40, 30, '#1abc9c', 'Set Start');
  buttonFinish = SelectorButton(140, 30, '#e74c3c', 'Set Finish');
  buttonObstacle = SelectorButton(240, 30, '#2c3e50', 'Set Obstacle');
}

function draw() {
  for(var i = 0; i < blocks.length; i++)
  {
    blocks[i].rollover(mouseX, mouseY);
    blocks[i].show();
  }
  // buttonStart.show();
  // buttonFinish.show();
  // buttonObstacle.show();
}


