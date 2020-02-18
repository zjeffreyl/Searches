let startBlock;
let finishBlock;

function Algorithms(algorithm, blocks, numberOfTilesHorizontal, numberOfTilesVertical) {
	this.algorithm = algorithm;
	this.blocks = blocks;
	this.numberOfTilesVertical = numberOfTilesVertical;
	this.numberOfTilesHorizontal = numberOfTilesHorizontal;
}

Algorithms.prototype.run = function() {
	switch(this.blocks)
	{
		case "DFS":
			dfs();
			break;
	}
}

Algorithms.prototype.findStartAndFinish = function() {
	for(var i = 0; i < blocks.length; i++)
	{
		if(str(blocks[i].color) == str(color(231, 76, 60)))
		{
			startBlock = blocks[i]
		}
	}
}

Algorithms.prototype.dfs = function() {

}

Algorithms.prototype.getGrid2DIndex = function(x, y)
{
  //If i want to get 2 by 2 then numberOfTilesVertical*(x-1) + 2
  return ((numberOfTilesHorizontal) * y) + x;
}
