// https://en.wikipedia.org/wiki/A*_search_algorithm
class AstarSearch {
	constructor(maze) {
		this.mazeSize = maze.size;

		this.started = false;
		this.finished = false;

		this.path = undefined;

		// Wrap the cells around nodes
		this.nodes = [];
		for (let i = 0; i < maze.grid.length; i++) {
			this.nodes.push(new Node(maze.grid[i]));
		}

		// Set end node
		this.endNode = this.nodes[maze.size*(maze.endPos +1) - 1];
		this.endNode.isGoal = true;

		// Start note always has a gScore of 0
		this.startNode = this.nodes[maze.size*maze.startPos];
		this.startNode.gScore = 0;
		this.startNode.fScore = this.heuristic(this.startNode);


		// Create the Open Set
		this.openSet = [];
		this.openSet.push(this.startNode);
	}

	step() {
		// Only Start search if start command is given and the maze is finished
		if (!this.started || this.finished) {
			return;
		}
		if (this.openSet.length > 0) {
			// Sort the nodes by lowest F value (May not need to do this at everystep?)
			// Current node is the one with lowest F value 
			let currentNode = this.openSet[0];
			// To display it as different color
			currentNode.cell.inList = true;

			// If we are at the goal, returns the path to the node
			if (currentNode.isGoal == true) {
				this.finished = true;
				return this.reconstructPath(currentNode);
			}

			// Removes the current node from the openSet
			this.openSet.splice(0, 1);

			// Get the neighbors of the current node
			let neighbors = this.getNeighbors(currentNode);

			for (let n = 0; n < neighbors.length; n++) {
				// Maybe I shouldn't hardcode 1?
				// tentative_gScore is the distance from start to the neighbor through current
				let tentative_gScore = currentNode.gScore + 1;

				if (tentative_gScore < neighbors[n].gScore) {
					// This path to neighbor is better than any previous one. Record it!
					neighbors[n].cameFrom = currentNode;
					neighbors[n].gScore = tentative_gScore;
					neighbors[n].fScore = tentative_gScore + this.heuristic(neighbors[n], this.endNode);

					// Add the neighbor to the openSet and sort the set
					if (!this.openSet.includes(neighbors[n])) {
						// The first one is the display different colors
						neighbors[n].cell.inList = true;
						this.openSet.push(neighbors[n]);
						this.openSet.sort(function(a, b) {return a.fScore - b.fScore;});
					}
				}
			}
		}
		else {
			return false;
		}
	}

	reconstructPath(node) {
		let totalPath = [node];
		node.cell.onPath = true;

		let parent = node.cameFrom;
		while (parent) {
			parent.cell.onPath = true;
			let temp = parent;
			totalPath.unshift(temp);
			parent = parent.cameFrom;
		}
		this.path = totalPath;
		return totalPath;
	}

	getNeighbors(node) {
		let neighbors = [];
		let neighbor;

		if (node.cell.i>0 && !node.cell.walls[0]) {
			// TOP
			neighbor = this.nodes[(node.cell.i-1)*this.mazeSize + node.cell.j];
			if (neighbor != node.cameFrom) {
				neighbors.push(neighbor);
			}
		}
		if (node.cell.j<this.mazeSize-1 && !node.cell.walls[1]) {
			// RIGHT
			neighbor = this.nodes[(node.cell.i)*this.mazeSize + node.cell.j + 1];
			if (neighbor != node.cameFrom) {
				neighbors.push(neighbor);
			}
		}
		if (node.cell.i<this.mazeSize-1 && !node.cell.walls[2]) {
			// BOTTOM
			neighbor = this.nodes[(node.cell.i+1)*this.mazeSize + node.cell.j];
			if (neighbor != node.cameFrom) {
				neighbors.push(neighbor);
			}
		}
		if (node.cell.j>0 && !node.cell.walls[3]) {
			// LEFT
			neighbor = this.nodes[(node.cell.i)*this.mazeSize + node.cell.j - 1];
			if (neighbor != node.cameFrom) {
				neighbors.push(neighbor);
			}
		}
		return neighbors;
	}

	// Heuristic used for this case
	// Return the manhattan distance between two nodes
	// https://en.wikipedia.org/wiki/Taxicab_geometry
	heuristic(node) {
		return Math.abs(node.cell.i - this.endNode.cell.i) + Math.abs(node.cell.j - this.endNode.cell.j);
	}
}

// Node is a wrapper for the cell class that allows search evaluations
class Node {
	constructor(cell) {
		this.cell = cell;

		this.isGoal = false;
		this.cameFrom = undefined;

		this.gScore = Infinity;
		this.fScore = Infinity;
	}
}