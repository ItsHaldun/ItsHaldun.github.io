class Cell {
	constructor(i, j, x, y) {
		this.i = i;
		this.j = j;
		this.x = x;
		this.y = y;

		// Set up the default states of the cell
		this.current = false;
		this.visited = false;

		// Search Related Checks (Only for Cosmetics)
		this.onPath = false;
		this.inList = false;

		// Array for the visibility state of the walls
		// TOP RIGHT BOTTOM LEFT
		this.walls = [true, true, true, true];
	}

	// Remove the overlapping walls between two cells
	removeWallsBetween(neighbor) {
		// NEIGHBOR ON TOP
		if (this.i > neighbor.i && this.j == neighbor.j) {
			this.walls[0] = false;
			neighbor.walls[2] = false;
		}
		// NEIGHBOR ON RIGHT
		else if (this.i == neighbor.i && this.j < neighbor.j) {
			this.walls[1] = false;
			neighbor.walls[3] = false;
		}
		// NEIGHBOR ON TOP
		else if (this.i < neighbor.i && this.j == neighbor.j) {
			this.walls[2] = false;
			neighbor.walls[0] = false;
		}
		// NEIGHBOR ON LEFT
		else if (this.i == neighbor.i && this.j > neighbor.j) {
			this.walls[3] = false;
			neighbor.walls[1] = false;
		}
	}

	draw(cellSettings) {
		let size = cellSettings.cellSize;
		push();
		// Chose the appropriate fill color
		if (this.onPath && cellSettings.searchColors.pathDrawn) {
			fill(cellSettings.searchColors.onPath);
		}
		else if (this.inList && cellSettings.searchColors.listDrawn) {
			fill(cellSettings.searchColors.inList);
		}
		else if (this.current) {
			fill(cellSettings.cellColors.current);
		}
		else if (this.visited) {
			fill(cellSettings.cellColors.visited);
		}
		else {
			fill(cellSettings.cellColors.hidden);
		}

		// Draw the cell
		noStroke();
		rect(this.x, this.y, size, size);

		// Draw the walls
		stroke(cellSettings.cellColors.border);
		strokeWeight(cellSettings.wallSize);

		if (this.walls[0]) {
			// TOP
			line(this.x, this.y, this.x + size, this.y);
		}
		if (this.walls[1]) {
			// RIGHT
			line(this.x + size, this.y, this.x + size, this.y + size);
		}
		if (this.walls[2]) {
			// BOTTOM
			line(this.x, this.y + size, this.x + size, this.y + size);
		}
		if (this.walls[3]) {
			// LEFT
			line(this.x, this.y, this.x, this.y + size);
		}
		pop();
	}
}