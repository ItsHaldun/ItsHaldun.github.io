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
// Settings Tab
let settings;

function setup() {
	// Calculate window sizes
	HEADER_OFFSET = 57;
  w = windowWidth;
  h = windowHeight - HEADER_OFFSET;

	// Create Settings
	settings = new Settings(2, windowHeight-30);
	settings.addSetting("thickness", 0, 25, 10);
	settings.addSetting("location", 0, 0.40, 0.15, 0.01);
	settings.addSetting("speed", 0, 0.1, 0.01, 0.002);
	settings.addSetting("toggle grid", 0, 1, 1);

	size = 20;

	// Calculate the row and column size
	rows = int(h / size) + 1;
	columns = int(w / size) + 1;

	// Initialize the Scalar Field
	field = new ScalarField(rows, columns, size);

  createCanvas(w, h);
}

function draw() {
	// Update the settings
	field.lineThickness = settings.settings[0].value();
	field.space_increment = settings.settings[1].value();
	field.time_increment = settings.settings[2].value();

  // put drawing code here
  background("#3C2C4F");
	field.draw(settings.settings[3].value());
	settings.draw();
}