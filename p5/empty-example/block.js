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