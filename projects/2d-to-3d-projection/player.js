class Player {
    constructor(number_of_rays, x=0, y=0, size=1, moveSpeed=1, rotSpeed=1, maxCanvasWidth, maxCanvasHeight) {
				// Canvas parameters
				this.maxCanvasWidth = maxCanvasWidth;
				this.maxCanvasHeight = maxCanvasHeight;

				// Location parameters
        this.pos = createVector(x, y);
        this.dir = createVector(1, 0);
				this.size = size;

				// Movement parameters
				this.move_speed = moveSpeed;
				this.rot_speed = rotSpeed;

				// If the player is colliding with an object, we can inhibit movement
				this.collidedObject = null;
				this.slack = 1 * this.move_speed;

				// Initialize the rays
				this.pov = 110;
        this.rays = [];
        for(let i=number_of_rays/2; i>-number_of_rays/2; i--) {
            let angle = i * (this.pov / number_of_rays);
            this.rays.push(new Ray(angle, 0, 0, maxCanvasWidth));
        }
        
				// Move the player to the starting position
        this.updatePosition(x, y);
    }
		
		updateRayCount (count) {
			// Initialize the rays
			let current_angle = degrees(this.dir.angleBetween(createVector(1,0)));
			this.rays = [];
			for(let i=count/2; i>-count/2; i--) {
					let angle = current_angle + i * (this.pov / count);
					this.rays.push(new Ray(angle, 0, 0, this.maxCanvasWidth, this.maxCanvasHeight));
			}
		}

    cast(walls) {
        for(let i=0; i<this.rays.length; i++) {
            this.rays[i].cast_all(walls);
        }
    }

    rotate(angle) {
        this.dir.rotate(-2*PI*angle/360);

        for(let i=0; i<this.rays.length; i++) {
            this.rays[i].rotate(-2*PI*angle/360);
        }
    }

    updatePosition(x, y) {
        this.pos.x = x;
        this.pos.y = y;

        for(let i=0; i<this.rays.length; i++) {
            this.rays[i].updatePosition(x, y);
        }
    }

		collusionCheck(objects) {
			for (let i=0; i<objects.length; i++) {
				// Check for collusion with object
				if (this.pos.x >= objects[i].x - this.slack && this.pos.x <= objects[i].x + objects[i].width + this.slack) {
					if (this.pos.y >= objects[i].y - this.slack && this.pos.y <= objects[i].y + objects[i].height + this.slack) {
						// If it collides with something, get the collided object
						this.collidedObject = objects[i];
						break;
					}
				}
				// If it doesn't collide with anything, return nothing
				this.collidedObject = null;
			}
		}

		move() {
			let x = this.pos.x;
			let y = this.pos.y;
			let dir = this.dir;
		
			if (keyIsDown(LEFT_ARROW)) {
				this.rotate(this.rot_speed);
			}
			if (keyIsDown(RIGHT_ARROW)) {
				this.rotate(-this.rot_speed);
			}
			if (keyIsDown(UP_ARROW)) {
				// Check if we would move inside the collided object
				if (this.collidedObject != null) {
					// If on left side
					if (x >= this.collidedObject.x - 1*this.slack && 
						  x <= this.collidedObject.x + 1*this.slack) {
							// Update y is safe
							y -= - dir.y * this.move_speed;
							if (dir.x < 0) {
								// Update x is safe
								x += dir.x * this.move_speed;
							}
					}
					// If on right side
					else if (x <= this.collidedObject.x + this.collidedObject.width + 1*this.slack &&
						 			 x >= this.collidedObject.x + this.collidedObject.width - 1*this.slack) {
						// Update y is safe
						y -= - dir.y * this.move_speed;
						if (dir.x > 0) {
							// Update x is safe
							x += dir.x * this.move_speed;
						}
					}
					// If on top side
					if (y >= this.collidedObject.y - 1*this.slack &&
									 y <= this.collidedObject.y + 1*this.slack) {
						// Update x is safe
						x += dir.x * this.move_speed;
						if (dir.y < 0) {
							// Update y is safe
							y -= - dir.y * this.move_speed;
						}
					}
					// If on bottom side
					else if (y <= this.collidedObject.y + this.collidedObject.height + 1*this.slack &&
									 y >= this.collidedObject.y + this.collidedObject.height - 1*this.slack) {
		 				// Update x is safe
						x += dir.x * this.move_speed;
						if (dir.y > 0) {
							// Update y is safe
							y -= - dir.y * this.move_speed;
						}
	 				}
				}
				else {
					x += dir.x * this.move_speed;
					y -= - dir.y * this.move_speed;
				}
			}

			if (keyIsDown(DOWN_ARROW)) {
				// Check if we would move inside the collided object
				if (this.collidedObject != null) {
					// If on left side
					if (x >= this.collidedObject.x - 1*this.slack && 
						  x <= this.collidedObject.x + 1*this.slack) {
							// Update y is safe
							y += - dir.y * this.move_speed;
							if (dir.x > 0) {
								// Update x is safe
								x -= dir.x * this.move_speed;
							}
					}
					// If on right side
					else if (x <= this.collidedObject.x + this.collidedObject.width + 1*this.slack &&
						 			 x >= this.collidedObject.x + this.collidedObject.width - 1*this.slack) {
						// Update y is safe
						y += - dir.y * this.move_speed;
						if (dir.x < 0) {
							// Update x is safe
							x -= dir.x * this.move_speed;
						}
					}
					// If on top side
					if (y >= this.collidedObject.y - 1*this.slack &&
									 y <= this.collidedObject.y + 1*this.slack) {
						// Update x is safe
						x -= dir.x * this.move_speed;
						if (dir.y > 0) {
							// Update y is safe
							y += - dir.y * this.move_speed;
						}
					}
					// If on bottom side
					else if (y <= this.collidedObject.y + this.collidedObject.height + 1*this.slack &&
									 y >= this.collidedObject.y + this.collidedObject.height - 1*this.slack) {
		 				// Update x is safe
						x -= dir.x * this.move_speed;
						if (dir.y < 0) {
							// Update y is safe
							y += - dir.y * this.move_speed;
						}
	 				}
				}
				else {
					x -= dir.x * this.move_speed;
					y += - dir.y * this.move_speed;
				}
			}
			// Check for canvas bounds
			if (x<0) {
				x = 0;
			}
			if (y<0) {
				y = 0;
			}
			this.updatePosition(x, y);
		}

    show() {
        for(let i=0; i<this.rays.length; i++) {
            this.rays[i].show();
        }
				push();
				strokeWeight(this.size);
				stroke(150,20,98);
				point(this.pos.x, this.pos.y);
				pop();
    }

    draw3D() {
        let width = this.maxCanvasWidth / this.rays.length;
        let x = 0;
				push();
        rectMode(CENTER);

        for(let i=0; i<this.rays.length; i++) {
            let distance = this.rays[i].closest_distance;
            let maxDist = this.rays[i].maxDistance;
            
            let bright = map(distance, maxDist, 0, 0, 255);
            
            fill(bright);
            stroke(bright);

            let size = map(distance, maxDist, 0, 0, this.maxCanvasHeight/2);
            rect(x, 
                3*this.maxCanvasHeight/4,
								width, 
								size);

            x += width;
        }
				pop();
    }
}