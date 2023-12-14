let walls = [];
let number_of_rays;
let number_of_walls = 10;
let raycaster;
let raySlider;

function setup() {
	let HEADER_OFFSET = 57;
  createCanvas(windowWidth, windowHeight-HEADER_OFFSET);

	raySlider = createCSlider(10, 1024, 512);
  raySlider.position(windowWidth*0.001, windowHeight*0.97);
  raySlider.size(windowWidth*0.2);
	number_of_rays = raySlider.value();
  
  for(let i = 0; i< number_of_walls; i++) {
    walls.push(new Boundary(random(round(windowWidth)), 
    random(round(windowHeight)),
    random(round(windowWidth)), 
    random(round(windowHeight))))
  }

  raycaster = new RayCast(number_of_rays);
}

function draw() {
  background(0);
	// Check if Slider is changed
	if (raySlider.value != number_of_rays) {
		number_of_rays = raySlider.value();
		raycaster = new RayCast(number_of_rays);
	}
	
  raycaster.update(mouseX, mouseY);
  raycaster.cast(walls);
  
  for(let i=0; i<walls.length; i++) {
    walls[i].show();
  }
  raycaster.show();

	push();
	fill(255);
	textSize(0.01*windowWidth);
	text("Rays: " + number_of_rays, windowWidth*0.01, windowHeight*0.84);

	raySlider.position(windowWidth*0.01, windowHeight*0.85);
	pop();
}