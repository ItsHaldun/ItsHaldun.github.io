// A custom Settings tab that responds to the screen size

class Settings {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.settings = [];
		this.names = [];
		this.open = false;
		this.spacing = 0;

		// Create the settings button
		this.button = createButton('Settings');
		this.button.position(this.x, this.y);
		this.button.mousePressed(function toggleSettings() {settings.open = !settings.open;});
	}

	addSetting(name="null", min, max, def, step=1) {
		this.settings.push(createCSlider(min, max, def, step));
		this.names.push(name);
	}

	draw() {
		if (this.open && this.settings.length>0) {
			let spacing = 2.4 * this.settings[0].height;
			let width = 1.2 * this.settings[0].width;
			let xloc = this.x + 0.1*this.settings[0].width;
			let yloc = this.y - 0.5*spacing - 30;

			push();
			fill(0, 180);
			noStroke();
			rect(this.x, yloc-(this.settings.length+0.5)*spacing, width, (this.settings.length+0.5)*spacing);
			pop();
			
			push();
			textSize(24);
			fill(255);
			stroke(0);
			for(let i=0; i<this.settings.length; i++) {
				yloc -= spacing;
				this.settings[i].position(xloc, yloc);
				text(this.names[i], xloc, yloc - 4);
			}
			pop();
		}
	}

	toggle() {
		this.open = !this.open;
	}
}

function toggleSettings(settings) {
	settings.open = !settings.open;
}