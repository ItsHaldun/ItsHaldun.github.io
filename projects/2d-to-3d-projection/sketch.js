let walls = [];
let objects = [];
let player;
let slider;
let sliderValue;

let WIDTH;
let HEIGHT;

function setup() {
	let HEADER_OFFSET = 57;
	WIDTH = windowWidth;
	HEIGHT = windowHeight - HEADER_OFFSET;
  createCanvas(WIDTH, HEIGHT);

	slider = createCSlider(0, 1024, 256);
	sliderValue = slider.value();
	slider.position(0.01*WIDTH, 0.5*HEIGHT);
  slider.size(0.1*WIDTH);

	// Beginning Section
  objects.push(new rectangleWall(0, 0.1*HEIGHT, 0.05*WIDTH, 0.02*HEIGHT));
  objects.push(new rectangleWall(0.15*WIDTH, 0, 0.02*WIDTH, 0.15*HEIGHT));
	objects.push(new rectangleWall(0.15*WIDTH, 0.25*HEIGHT, 0.02*WIDTH, 0.15*HEIGHT));
	objects.push(new rectangleWall(0.03*WIDTH, 0.3*HEIGHT, 0.04*WIDTH, 0.08*HEIGHT));
	
	// Middle Section
	objects.push(new rectangleWall(0.24*WIDTH, 0.05*HEIGHT, 0.2*WIDTH, 0.08*HEIGHT));
	objects.push(new rectangleWall(0.48*WIDTH, 0.05*HEIGHT, 0.1*WIDTH, 0.08*HEIGHT));
	objects.push(new rectangleWall(0.64*WIDTH, 0.1*HEIGHT, 0.03*WIDTH, 0.05*HEIGHT));

	objects.push(new rectangleWall(0.24*WIDTH, 0.28*HEIGHT, 0.04*WIDTH, 0.04*HEIGHT));
	objects.push(new rectangleWall(0.32*WIDTH, 0.28*HEIGHT, 0.04*WIDTH, 0.04*HEIGHT));
	objects.push(new rectangleWall(0.40*WIDTH, 0.28*HEIGHT, 0.04*WIDTH, 0.04*HEIGHT));
	objects.push(new rectangleWall(0.48*WIDTH, 0.28*HEIGHT, 0.04*WIDTH, 0.04*HEIGHT));
	objects.push(new rectangleWall(0.56*WIDTH, 0.28*HEIGHT, 0.04*WIDTH, 0.04*HEIGHT));

	objects.push(new rectangleWall(0.30*WIDTH, 0.44*HEIGHT, 0.01*WIDTH, 0.04*HEIGHT));
	objects.push(new rectangleWall(0.36*WIDTH, 0.40*HEIGHT, 0.01*WIDTH, 0.08*HEIGHT));

	// End Section
	objects.push(new rectangleWall(0.7*WIDTH, 0, 0.04*WIDTH, 0.4*HEIGHT));
	objects.push(new rectangleWall(0.85*WIDTH, 0.08*HEIGHT, 0.04*WIDTH, 0.4*HEIGHT));
	objects.push(new rectangleWall(0.94*WIDTH, 0.2*HEIGHT, 0.04*WIDTH, 0.08*HEIGHT));

	// The Boundaries
	objects.push(new rectangleWall(0*WIDTH, 0, 0.005*WIDTH, 0.483*HEIGHT));
	objects.push(new rectangleWall(0.995*WIDTH, 0, 0.005*WIDTH, 0.483*HEIGHT));
	objects.push(new rectangleWall(0, 0.95*HEIGHT/2, WIDTH, 0.01*HEIGHT));
	objects.push(new rectangleWall(0, 0, WIDTH, 0.01*HEIGHT));

  for(let i=0; i<objects.length; i++) {
    for(let j=0; j<objects[i].sides.length; j++) {
      walls.push(objects[i].sides[j]);
    }
  }

  player = new Player(sliderValue, 0.02*WIDTH, 0.05*HEIGHT, 5, 0.0007*WIDTH, 2, WIDTH, HEIGHT);
}

function draw() {
  background(0);

	// Check if slider is moved
	if (sliderValue != slider.value()) {
		sliderValue = slider.value();
		player.updateRayCount(sliderValue);
	}

	player.collusionCheck(objects);
  player.move();

  player.cast(walls);

  for(let i=0; i<objects.length; i++) {
    objects[i].show();
  }
  player.show();
  player.draw3D();

	// Slider and Text
	push();
	fill(255);
	textSize(0.01*WIDTH);
	text("Rays: " + sliderValue, 0.006*WIDTH, 0.44*HEIGHT);
	slider.position(0.006*WIDTH, 0.45*HEIGHT);
	pop();
}