function generateMaze() {
  //set up maze
  mazeGridInit();
  primsAlgorithm();
}

function primsAlgorithm()
{
  mazeBlocksToErase = [];
  //Holds tuples
  let current = getOpenRandomSpace();
  //method needs to be created from all choosen blocks
  let discovered = [];
  blocks[getGrid2DIndex(current[0], current[1])].clearBlock();
  discovered.push(current);
  let frontier = [];
  let lastestDiscovered = current;
  let i = 0;
  do
  {
    frontier.push.apply(frontier, getFrontier(lastestDiscovered, discovered, frontier));
    //choose a frontier to use that is not discovered
    let neighbor = Math.floor(Math.random() * frontier.length);
    let frontierChoosen = frontier[neighbor];
    //clear the block
    blocks[getGrid2DIndex(frontierChoosen[0], frontierChoosen[1])].clearBlock();
    //remove the block between the two
    eraseBlock(frontierChoosen, discovered);
    lastestDiscovered = frontier[neighbor];
    discovered.push(lastestDiscovered);
    frontier = frontier.filter(val => val != lastestDiscovered);
    i++;
  }
  while(frontier.length != 0);
  mazeFinished = true;
}

function eraseFrontierColor()
{
  for(var i = 0; i < blocks.length; i++)
  {
    blocks[i].clearBlock();
  }
}

function printFrontier(frontier, str1)
{
  let str = str1;
  for(var i = 0; i < frontier.length; i++)
  {
    str += " [" + frontier[i][0] + ", " + frontier[i][1] + "]";
  }
  console.log(str);
}

function eraseBlock(frontierChoosen, discovered)
{
  let choiceChoosen = [];
  //check the adjacent values Up Down Right Left
  let currentIndexX = frontierChoosen[0];
  let currentIndexY = frontierChoosen[1];
  //Top
  if(currentIndexY + 2 < numberOfTilesVertical && contains(discovered,[currentIndexX, currentIndexY + 2]) && !contains(choiceChoosen, [currentIndexX, currentIndexY + 2]))
    {
      choiceChoosen.push([currentIndexX, currentIndexY + 2]);
    }
  //Bottom
  if(currentIndexY - 2 > 0 && contains(discovered, [currentIndexX, currentIndexY - 2]) && !contains(choiceChoosen, [currentIndexX, currentIndexY - 2])) 
    {
      choiceChoosen.push([currentIndexX, currentIndexY - 2]);
    }
  //Right
  if(currentIndexX + 2 < numberOfTilesHorizontal && contains(discovered, [currentIndexX + 2, currentIndexY]) && !contains(choiceChoosen, [currentIndexX + 2, currentIndexY])) 
    {
      choiceChoosen.push([currentIndexX + 2, currentIndexY]);
    }
  //Left
  if(currentIndexX - 2 > 0 && contains(discovered, [currentIndexX - 2, currentIndexY]) && !contains(choiceChoosen, [currentIndexX - 2, currentIndexY])) 
    {
      choiceChoosen.push([currentIndexX - 2, currentIndexY]);
    }
  let choice = choiceChoosen[Math.floor(Math.random() * choiceChoosen.length)];
  mazeBlocksToErase.push(blocks[getGrid2DIndex((choice[0] + frontierChoosen[0])/2, (choice[1] + frontierChoosen[1])/2)]);
  //blocks[getGrid2DIndex((choice[0] + frontierChoosen[0])/2, (choice[1] + frontierChoosen[1])/2)].clearBlock();
}

// Add to the frontier
function getFrontier(lastestDiscovered, discovered, allFrontier) {
  frontier = []
  //A block that is discovered
  let currentIndexX = lastestDiscovered[0];
  let currentIndexY = lastestDiscovered[1];
  //Check if new frontier values are in the grid, not already discovered, not already in the frontier (to avoid duplicates)
  if(currentIndexY + 2 < numberOfTilesVertical && !contains(discovered,[currentIndexX, currentIndexY + 2]) && !contains(allFrontier, [currentIndexX, currentIndexY + 2])  && !contains(frontier, [currentIndexX, currentIndexY + 2]))
  {
    frontier.push([currentIndexX, currentIndexY + 2]);
    blocks[getGrid2DIndex(currentIndexX, currentIndexY + 2)].fillIn(color(0));
  }
  if(currentIndexY - 2 > 0 && !contains(discovered, [currentIndexX, currentIndexY - 2]) && !contains(allFrontier, [currentIndexX, currentIndexY - 2]) && !contains(frontier, [currentIndexX, currentIndexY - 2]))
  {
    frontier.push([currentIndexX, currentIndexY - 2]);
    blocks[getGrid2DIndex(currentIndexX, currentIndexY - 2)].fillIn(color(0));
  }
  if(currentIndexX + 2 < numberOfTilesHorizontal && !contains(discovered, [currentIndexX + 2, currentIndexY]) && !contains(allFrontier, [currentIndexX + 2, currentIndexY]) && !contains(frontier, [currentIndexX + 2, currentIndexY]))
  {
    frontier.push([currentIndexX + 2, currentIndexY]);
    blocks[getGrid2DIndex(currentIndexX + 2, currentIndexY)].fillIn(color(0));
  }
  if(currentIndexX - 2 > 0 && !contains(discovered, [currentIndexX - 2, currentIndexY]) && !contains(allFrontier, [currentIndexX - 2, currentIndexY]) && !contains(frontier, [currentIndexX - 2, currentIndexY]))
  {
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
  for (var i = 0; i < numberOfTilesVertical; i++) {
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
  return ((numberOfTilesHorizontal) * y) + x;
}

function contains(arr, val)
{
  for(var i = 0; i < arr.length; i++)
  {
    if(JSON.stringify(arr[i]) === JSON.stringify(val))
    {
      return true;
    }
  }
  return false;
}
