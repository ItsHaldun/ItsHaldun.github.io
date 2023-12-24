// Weight and Height, 
let w, h;
// Rows and Columns
let rows, columns;
// Size of Cells
let size;
// Offsets for Website
let HEADER_OFFSET;
// Scalar Field
let field;

let canvas;

function setup() {
	// Calculate window sizes
	HEADER_OFFSET = 0;
  w = windowWidth;
  h = 800 - HEADER_OFFSET;

	size = 50;

	// Calculate the row and column size
	rows = int(h / size) + 1;
	columns = int(w / size) + 1;

	// Initialize the Scalar Field
	field = new ScalarField(rows, columns, size, 0.2, 0.0015, 40);

  canvas = createCanvas(w, h);
	canvas.style("z-index", '-1');
	canvas.position(0,0);
}

function draw() {
  // put drawing code here
  background("#3C2C4F");
	field.draw(false);
	push();
	noStroke();
	fill(0, 60);
	rect(0,0, w, h);
	pop();
}