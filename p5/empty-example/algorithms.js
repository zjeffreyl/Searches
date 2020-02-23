let startBlock;
let startBlockIndex;

let finishBlock;
let finishBlockIndex;

let path = new Array();

function Algorithms(algorithm, blocks, numberOfTilesHorizontal, numberOfTilesVertical) {
	this.algorithm = algorithm;
	this.blocks = blocks;
	this.numberOfTilesVertical = numberOfTilesVertical;
	this.numberOfTilesHorizontal = numberOfTilesHorizontal;
}

Algorithms.prototype.run = function() {
	switch(this.algorithm)
	{
		case 'DFS':
			this.findStartAndFinish();
			dfs(startBlockIndex, path);
			for(var i = 0; i < path.length; i++)
			{
				if(path[i] != startBlock && path[i] != finishBlock)
				{
					path[i].fillIn(color(255,165,0));
				}
			}
			break;
		default:
			console.log("Algorithm not recognized:" + this.algorithm + '|');
			break;
	}
}

Algorithms.prototype.findStartAndFinish = function() {
	for(var i = 0; i < blocks.length; i++)
	{
		if(startBlock != null && finishBlock != null) break;
		if(str(blocks[i].color) == str(color(231, 76, 60)))
		{
			startBlock = blocks[i];
			startBlockIndex = i;
		}
		if(str(blocks[i].color) == str(color(26, 188, 156)))
		{
			finishBlock = blocks[i];
			finishBlockIndex = i;
		}
	}
}

function getGrid2DIndex(x, y)
{
  //If i want to get 2 by 2 then numberOfTilesVertical*(x-1) + 2
  return ((numberOfTilesHorizontal) * y) + x;
}

// Add to the frontier
function getNeighbors(current) {
  frontier = [];
  //A block that is discovered
  let currentIndexX = current[0];
  let currentIndexY = current[1];
  //Check if new frontier values are in the grid, not already discovered, not already in the frontier (to avoid duplicates)
  if(currentIndexY + 1 < numberOfTilesVertical && blocks[getGrid2DIndex(currentIndexX, currentIndexY + 1)].color != color(52, 152, 219))
  {
    frontier.push([currentIndexX, currentIndexY + 1]);
  }
  if(currentIndexY - 1 > 0 && blocks[getGrid2DIndex(currentIndexX, currentIndexY - 1)].color != color(52, 152, 219))
  {
    frontier.push([currentIndexX, currentIndexY - 1]);
  }
  if(currentIndexX + 1 < numberOfTilesHorizontal && blocks[getGrid2DIndex(currentIndexX + 1, currentIndexY)].color != color(52, 152, 219))
  {
    frontier.push([currentIndexX + 1, currentIndexY]);
  }
  if(currentIndexX - 1 > 0 && blocks[getGrid2DIndex(currentIndexX - 1, currentIndexY)].color != color(52, 152, 219))
  {
    frontier.push([currentIndexX - 1, currentIndexY]);
  }
  return frontier;
}

function getXY(blockIndex)
{
	return [blockIndex % numberOfTilesVertical, Math.floor(blockIndex / numberOfTilesHorizontal)];
}

function dfs(nodeIndex, path) {
	if(str(blocks[nodeIndex].color) == str(color(255, 255, 0)) || str(blocks[nodeIndex].color) == str(color(52, 152, 219)))
	{
		return false;
	}
	path.push(blocks[nodeIndex]);
	if(str(blocks[nodeIndex].color) == str(color(26, 188, 156)))
	{
		return true;
	}
	if(nodeIndex != startBlockIndex) blocks[nodeIndex].fillIn(color(255,255,0));
	let adjacent = getNeighbors(getXY(nodeIndex));
	for(var i = 0; i < adjacent.length; i++)
	{
		//only choose the adjacent where the color is white
			if(dfs(getGrid2DIndex(adjacent[i][0], adjacent[i][1]), path))
			{
				return true;
			}
	}
	path.pop();
	return false;
}