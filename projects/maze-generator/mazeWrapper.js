class MazeWrapper {
	constructor (maze, canvas) {
		// To access the settings of the maze
		this.maze = maze;
		this.solver = undefined;
		// To save the Canvas
		this.canvas = canvas;

		// Create the Settings
		// Main Settings Sliders
		this.mazeSizeSlider = select("#maze-size-slider");
		this.frameRateSlider = select("#framerate-slider");

		// Cell Cosmetics Pickers
		this.hiddenColorPicker = select("#hidden-cell-picker");
		this.visitedColorPicker = select("#visited-cell-picker");
		this.currentColorPicker = select("#current-cell-picker");
		this.wallColorPicker = select("#border-picker");
		this.wallSizeSlider = select("#wall-size-slider");

		// Marker Cosmetics Pickers
		this.markerToggler = select("#marker-switch");
		this.startColorPicker = select("#start-color-picker");
		this.endColorPicker = select("#end-color-picker");

		// Solver Cosmetics Pickers
		this.pathPicker = select("#path-color-picker");
		this.tracePicker = select("#trace-color-picker");

		// Start Button
		this.startButton = select("#build-maze-button");
		this.startButton.mousePressed(() => {
			this.maze.started = true;
		});

		// Save Canvas Button
		this.saveButton = select("#save-maze-button");
		this.saveButton.mousePressed(() => {
			saveCanvas(this.canvas, 'maze', 'jpg');
		});

		// Remake Canvas Button
		this.saveButton = select("#re-maze-button");
		this.saveButton.mousePressed(() => {
			this.maze = new Maze(this.maze.settings, this.maze.canvasSize, this.maze.size);
			// Re-enable Settings
			document.getElementById("maze-size-slider").disabled = false;
			document.getElementById("solve-maze-button").disabled = true;
		});

		// Start Solver Button
		this.solveButton = select("#solve-maze-button");
		this.solveButton.mousePressed(() => {
			this.solver = new AstarSearch(this.maze);
			this.solver.started = true;
			// Re-enable Settings
			// document.getElementById("solve-maze-button").disabled = true;
		});
	}
	
	// Updates the settings depending on the sliders and buttons
	update () {
		// Updates that can be changed before starting maze build
		if (!this.maze.started) {
			if (this.maze.size != this.mazeSizeSlider.value()) {
				this.maze.settings.mazeSize = this.mazeSizeSlider.value();
				this.maze = new Maze(this.maze.settings, this.maze.canvasSize);
			}
		}
		else {
			document.getElementById("maze-size-slider").disabled = true;
		}

		if (!this.maze.finished) {
			document.getElementById("save-maze-button").disabled = true;
		}
		else {
			document.getElementById("save-maze-button").disabled = false;
			document.getElementById("solve-maze-button").disabled = false;
		}

		// Updates that can be changed anytime
		if (this.maze.cellSettings.wallSize != this.wallSizeSlider.value()) {
			this.maze.cellSettings.wallSize = this.wallSizeSlider.value();
		}

		// Cell Cosmetics Settings
		this.maze.cellSettings.cellColors.hidden = this.hiddenColorPicker.value();
		this.maze.cellSettings.cellColors.visited = this.visitedColorPicker.value();
		this.maze.cellSettings.cellColors.current = this.currentColorPicker.value();
		this.maze.cellSettings.cellColors.border = this.wallColorPicker.value();

		// Marker Cosmetics Settings
		this.maze.cellSettings.markings.isDrawn = document.getElementById("marker-switch").checked;
		this.maze.cellSettings.markings.startColor = this.startColorPicker.value();
		this.maze.cellSettings.markings.endColor = this.endColorPicker.value();

		// Solver Cosmetics
		this.maze.cellSettings.searchColors.pathDrawn = document.getElementById("path-switch").checked;
		this.maze.cellSettings.searchColors.listDrawn = document.getElementById("trace-switch").checked;
		this.maze.cellSettings.searchColors.onPath = this.pathPicker.value();
		this.maze.cellSettings.searchColors.inList = this.tracePicker.value();

		this.maze.settings.frameRate = this.frameRateSlider.value();
	}
}