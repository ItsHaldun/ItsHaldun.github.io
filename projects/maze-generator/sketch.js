var settings;
var mazeWrapper;

var canvasSize;
var myCanvas;

var cellSize;

function setup() {
	// Initialize the settings dictionary
	settings = {
		headerOffset: 57,
		frameRate: 60,
		mazeSize: 16,

		mazeMargins: {
			top: 12,
			right: 12,
			bottom: 12,
			left: 12
		},

		cellSettings: {
			cellSize: 12,
			wallSize: 2,

			cellColors : {
				hidden: "#555555",
				visited: "#dddddd",
				current: "#aaff00",
				border: "#000000"
			},

			searchColors : {
				pathDrawn : true,
				listDrawn : true,
				inList: "#ff7777",
				onPath: "#ff00ff",
			},

			markings : {
				isDrawn : true,
				stroke: "#000000",
				startColor: "#aa0000",
				endColor: "#00aa00"
			}
		}
	}
	
	// Select the smallest browser dimension
	canvasSize = min(windowWidth - settings.mazeMargins.left - settings.mazeMargins.right, windowHeight - settings.headerOffset - settings.mazeMargins.bottom);

	// Create the canvas, assign to a parent element
  myCanvas = createCanvas(canvasSize, canvasSize);
	myCanvas.parent("canvas-div");

	// Create the Maze Wrapper
	mazeWrapper = new MazeWrapper(new Maze(settings, canvasSize), myCanvas);
}

function draw() {
  // put drawing code here
  background(255);
	frameRate(mazeWrapper.maze.settings.frameRate);

	mazeWrapper.update();

	mazeWrapper.maze.step();

	if (mazeWrapper.solver) {
		mazeWrapper.solver.step();
	}
	
	mazeWrapper.maze.draw();
}

function windowResized() {
	canvasSize = min(windowWidth - settings.mazeMargins.left - settings.mazeMargins.right, windowHeight - settings.headerOffset - settings.mazeMargins.bottom);
  resizeCanvas(canvasSize, canvasSize);
	cellSize = floor((canvasSize-settings.mazeMargins.bottom)/mazeWrapper.maze.size);
	mazeWrapper.maze.cellSettings.cellSize = cellSize;
	mazeWrapper.maze.updateCoordinates();
}