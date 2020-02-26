class PriorityQueue {
	constructor(goal)
	{
		this.items = [];
		this.goal = goal;
	}

	enqueue(element)
	{
		var contain = false;

		for(var i = 0; i < this.items.length; i++)
		{
			if(heuristic(this.items[i], ) > element)
			{
				this.items.splice(i, 0, element);
				contain = true;
				break;
			}
		}

		if(!contain)
		{
			this.items.push(element)
		}
	}

	dequeue()
	{
		if(this.items.length == 0)
		{
			return null;
		}
		else
		{
			return this.items.shift();
		}
	}

	isEmpty()
	{
		return this.items.length == 0;
	}

	toString()
	{
		let retstr = "";
		for(var i = 0; this.items.length; i++)
		{
			retstr = retstr + this.items[i] + ", ";
		}
		return retstr;
	}

	heuristic(current, goal)
	{
		let x = Math.abs(current[0] - goal[0]);
		let y = Math.abs(current[1] - goal[1]);
		return x + y;
	}
}