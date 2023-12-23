/*
** This class is my attempt to introduce easy to use multi-dimensional arrays in Javascript
** It takes a shape parameter, which is a list of positive integers that describe the shape of the array
** By default, it will be filled with NaN, but this can be changed
** Row-major ordering is used
*/
class multiDimensionalArray {
	constructor(shape, fillWith=NaN) {
		this.array = [];
		this.shape = shape;
		this.length = 1;

		// Calculate the length of the array
		for(let dim=0; dim<shape.length; dim++) {
			this.length *= shape[dim];
		}
		// Fill the array with values
		for(let index=0; index<this.length; index++) {
			this.array.push(fillWith);
		}
	}

	// Get the value at index [x, y, z, ...]
	get(index) {
		// Check for index length
		if(index.length != this.shape.length) {
			throw new Error("Index shape is not the same as array shape", { cause: index.length });
		}
		// Check for index size
		for (let dim=0; dim<index.length; dim++) {
			if (index[dim] >= this.shape[dim]) {
				throw new Error("Index out of range", { cause: dim });
			}
		}
		// Check for positive integer-ness
		for (let dim=0; dim<index.length; dim++) {
			if(!Number.isInteger(index[dim]) || index[dim]<0) {
				throw new Error("Index is not positive integer", { cause: index[dim] });
			}
		}

		// Actual location calculation
		// For details: https://en.wikipedia.org/wiki/Row-_and_column-major_order#Address_calculation_in_general
		let loc = 0;
		for(let dim=0; dim<index.length; dim++) {
			let temp = 1;
			for (let l=dim+1; l<index.length; l++) {
				temp *= this.shape[l];
			}
			loc += temp*index[dim];
		}

		return this.array[loc];
	}

	// Set the value at index [x, y, z, ...]
	set(index, value) {
		// Check for index length
		if(index.length != this.shape.length) {
			throw new Error("Index shape is not the same as array shape", { cause: index.length });
		}
		// Check for index size
		for (let dim=0; dim<index.length; dim++) {
			if (index[dim] >= this.shape[dim]) {
				throw new Error("Index out of range", { cause: dim });
			}
		}
		// Check for positive integer-ness
		for (let dim=0; dim<index.length; dim++) {
			if(!Number.isInteger(index[dim]) || index[dim]<0) {
				throw new Error("Index is not positive integer", { cause: index[dim] });
			}
		}

		// Actual location calculation
		// For details: https://en.wikipedia.org/wiki/Row-_and_column-major_order#Address_calculation_in_general
		let loc = 0;
		for(let dim=0; dim<index.length; dim++) {
			let temp = 1;
			for (let l=dim+1; l<index.length; l++) {
				temp *= this.shape[l];
			}
			loc += temp*index[dim];
		}

		this.array[loc] = value;
		return this.array[loc];
	}

	// TODO
	// Prints the array in a pleasing manner
	print() {
		print(this.array);
	}

	// Getters
	array() {
		return this.array;
	}

	shape() {
		return this.shape;
	}

	length() {
		return this.length;
	}
}