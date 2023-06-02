class bird {
  constructor(x=48, y=height/2, w=48, h=48, clr=color(255,0,0)) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h
    this.clr = clr;
    this.velocity = 0;
    
    this.score = 0;
  }
  
  // It's more of a bad jump really.
  flap(flapForce) {
    player.velocity = flapForce;
  }
  
  display() {
    noStroke();
    fill(this.clr);
    rect(this.x, this.y, this.h, this.w);
  }
  
  /*
  Velocity of a falling object changes with time.
  This sort of simulates that.
  If not flapping, it is essentially freefall.
  */
  updateVelocity(flapForce, g=0.8) {
    this.velocity = this.velocity + (flapForce - g);
  }
  
  // Displacement of the bird depends on velocity.
  updatePosition(flapForce=0) {
    this.updateVelocity(flapForce);
    this.y = this.y - this.velocity;
  }
}