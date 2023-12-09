let walls = [];
let number_of_rays;
let number_of_walls = 10;
let raycaster;
let raySlider;

function setup() {
  createCanvas(windowWidth, windowHeight*0.9);

	raySlider = createSlider(10, 1000, 256);
  raySlider.position(10, windowHeight*0.97);
  raySlider.size(160);
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
}