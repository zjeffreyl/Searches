function Block(x, y, side) {
    this.x = x;
    this.y = y;
    this.side = side;
    this.isObstacle = false;
    this.brightness = (255,255,255);
}
  
Block.prototype.show = function()
{
    var lightBlue = color(173,216,230);
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

let blocks = [];

function setup() {
  createCanvas(600, 600);
  noStroke();
  rectMode(CENTER);
  //Create grid
  background(255);
  for (var i = 20; i < height; i += 20) {
    // draw one line of 20 rectangles across the x-axis
    for (var j = 20; j < width; j += 20) {
      let block = new Block(i,j,20);
      blocks.push(block);
    }
  }
}

function mousePressed() {
  for(let i = 0 ;i < blocks.length; i++)
  {
    blocks[i].clicked(mouseX, mouseY);
  }
}

function draw() {
  for(var i = 0; i < blocks.length; i++)
  {
    blocks[i].rollover(mouseX, mouseY);
    blocks[i].show();
  }
}
