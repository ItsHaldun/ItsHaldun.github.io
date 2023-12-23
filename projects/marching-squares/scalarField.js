class ScalarField {
	constructor(rows, columns, cellSize, space_increment=0.15, time_increment=0.02, lineThickness=10) {
		// Save parameters
		this.rows = rows;
		this.columns = columns;
		this.cellSize = cellSize;
		this.lineThickness = lineThickness;

		// Calculate the offsets for better visuals
		this.X_OFFSET = 0;
		this.Y_OFFSET = 0;

		// The field is 2d array
		this.field = new multiDimensionalArray([this.rows, this.columns], 0);

		// Noise field increments
		this.nx=0;
		this.ny=0;
		this.nt=0;
		this.space_increment = space_increment;
		this.time_increment = time_increment;

		this.noise = new OpenSimplexNoise(Date.now());
	}

	generateNoiseField() {
		this.nx=0;
		
		for(let i=0; i<this.rows; i++) {
			this.nx += this.space_increment;
			this.ny=0;
			for(let j=0; j<this.columns; j++) {
				// If greater than threshold, it is occupied
				let value = this.noise.noise3D(this.nx, this.ny, this.nt);
				this.field.set([i,j], value);
				this.ny += this.space_increment;
			}
		}
		this.nt += this.time_increment;
	}

	draw(drawPoints=false) {
		this.generateNoiseField();

		if (drawPoints) {
			// Draw the points
			for (let i = 0; i<this.rows; i++) {
				for (let j = 0; j<this.columns; j++) {
					push();
					stroke(255 * this.field.get([i, j]), 44, 79);
					strokeWeight(this.lineThickness);
					point(j * this.cellSize + this.X_OFFSET, i * this.cellSize + this.Y_OFFSET);
					pop();
				}
			}
		}

		// Draw the lines
		beginShape();
		for (let i = 0; i<this.rows-1; i++) {
			for (let j = 0; j<this.columns-1; j++) {
				let value = this.getCellValue([i, j]);
				
				// Lookup Table and Draw
				this.lookUpDraw(value, i, j);
			}
		}
	}

	// Calculates the value of the cell for the lookup table
	// For more details, see: https://en.wikipedia.org/wiki/Marching_squares#Basic_algorithm
	getCellValue(index) {
		let i = index[0];
		let j = index[1];

		let a = ceil(this.field.get([i, j]));
		let b = ceil(this.field.get([i, j+1]));
		let c = ceil(this.field.get([i+1, j+1]));
		let d = ceil(this.field.get([i+1, j]));
		
		return 8*a + 4*b + 2*c + d;
	}

	// Draw line between two vectors
	line(v, u) {
		line(v.x, v.y, u.x, u.y);
	}

	// Lookup Table for cell cases
	// For more details, see: https://en.wikipedia.org/wiki/Marching_squares#Basic_algorithm
	lookUpDraw(value, i, j) {
		origin = createVector(this.cellSize*j + this.X_OFFSET, this.cellSize*i + this.Y_OFFSET);

		let a = (this.field.get([i, j]) + 1);
		let b = (this.field.get([i, j+1]) + 1);
		let c = (this.field.get([i+1, j+1]) + 1);
		let d = (this.field.get([i+1, j]) + 1);

		// Calculate the vectors
		let ab = createVector(lerp(0, this.cellSize, ((1-a)/(b-a))), 0);
		let bc = createVector(this.cellSize, lerp(0, this.cellSize, ((1-b)/(c-b))));
		let dc = createVector(lerp(0, this.cellSize, ((1-d)/(c-d))), this.cellSize);
		let ad = createVector(0, lerp(0, this.cellSize, ((1-a)/(d-a))));

		push();
		strokeWeight(this.lineThickness);
		stroke("#5387E0");
		translate(origin.x, origin.y);
		// Lookup table
		switch (value) {
			case 1:
				this.line(ad, dc);
				break;
			case 2:
				this.line(bc, dc);
				break;
			case 3:
				this.line(ad, bc);
				break;
			case 4:
				this.line(ab, bc);
				break;
			case 5:
				this.line(ad, ab);
				this.line(bc, dc);
				break;
			case 6:
				this.line(ab, dc);
				break;
			case 7:
				this.line(ab, ad);
				break;
			case 8:
				this.line(ab, ad);
				break;
			case 9:
				this.line(ab, dc);
				break;
			case 10:
				this.line(ad, dc);
				this.line(ab, bc);
				break;
			case 11:
				this.line(ab, bc);
				break;
			case 12:
				this.line(ad, bc);
				break;
			case 13:
				this.line(bc, dc);
				break;
			case 14:
				this.line(ad, dc);
				break;
			default:
				break;
		}
		pop();
	}
}