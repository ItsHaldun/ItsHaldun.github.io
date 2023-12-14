class Functions {
	constructor(choice=1, size) {
		this.chosenFunction = choice;
		this.maxSize = size;
	}

	transform(x, y) {
		switch (this.chosenFunction) {
			case 1:
				return this.squareWave(x, y);
			case 2:
				return this.sawToothWave(x, y);
			case 3:
				return this.triangleWave(x, y);
			default:
				return this.squareWave(x, y);
		}
	}

	squareWave(start_x, start_y) {
		let x = start_x;
		let y = start_y;
		for(let i=0; i<num.value(); i++) {

			let prevx = x;
			let prevy = y;

			let n = 2 * i + 1;
			let radius = this.maxSize * 4 / (n * PI);

			// Draw the circles
			push();
			noFill();
			stroke(255, 100);
			strokeWeight(2);
			circle(x, y, 2*radius);
			pop();

			// Calculate new x y
			x += radius * cos(n * time);
			y += radius * sin(n * time);

			// Draw the connecting lines
			push();
			stroke(255);
			strokeWeight(2);
			line(prevx, prevy, x, y);
			pop();
		}
		return [x, y];
	}

	sawToothWave(start_x, start_y) {
		let x = start_x;
		let y = start_y;
		for(let i=0; i<num.value(); i++) {

			let prevx = x;
			let prevy = y;

			let n = i + 1;
			let radius = this.maxSize * 2 / (n * PI);
			if (n%2 == 1) {
				radius *= -1;
			}

			// Draw the circles
			push();
			noFill();
			stroke(255, 100);
			strokeWeight(2);
			circle(x, y, 2*radius);
			pop();

			// Calculate new x y
			x += radius * cos(n * time);
			y += radius * sin(n * time);

			// Draw the connecting lines
			push();
			stroke(255);
			strokeWeight(2);
			line(prevx, prevy, x, y);
			pop();
		}
		return [x, y];
	}

	triangleWave(start_x, start_y) {
		let x = start_x;
		let y = start_y;
		for(let i=0; i<num.value(); i++) {

			let prevx = x;
			let prevy = y;

			let n = 2*i + 1;
			let radius = this.maxSize * (8 / (PI*PI)) * (((-1)**((n-1)/2)) / (n*n));

			// Draw the circles
			push();
			noFill();
			stroke(255, 100);
			strokeWeight(2);
			circle(x, y, 2*radius);
			pop();

			// Calculate new x y
			x += radius * cos(n * time);
			y += radius * sin(n * time);

			// Draw the connecting lines
			push();
			stroke(255);
			strokeWeight(2);
			line(prevx, prevy, x, y);
			pop();
		}
		return [x, y];
	}

}