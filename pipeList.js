class pipeList {
  /*
    pipeList is made out of multiple pipes.
    It is the class responsible for neverending pipes.
  */
  constructor(x, quantity=5, spacing=256, 
              thickness=96, gapSize=200, 
              lowerY=height, upperY=200) {
    
    this.activePipes = [];
    
    /*
    There are a lot of duplicate variables here.
    Idea was to make each class self-sustaining.
    */

    this.x = x;
    this.quantity = quantity;
    this.spacing = spacing;
    this.thickness = thickness;
    this.gapSize = gapSize;
    this.lowerY = lowerY;
    this.upperY = upperY;
  
  }
  
  // This creates the {quantity} of initial pipes.
  initialize() {
    for (let i=0; i < this.quantity; i++){
      this.generatePipes(this.x);
    }
  }
  
  // Checks if any new pipes can be generated.
  generatePipes(x=this.x) {
    if (this.activePipes.length < this.quantity) {
      this.activePipes.push(new pipeColumn(x + 
                                           this.activePipes.length *
                                           this.spacing, 
                                           this.thickness, 
                                           random(this.upperY, this.lowerY),
                                           this.gapSize));
    }
  }
  
  
  displayPipes() {
    for (let i=0; i < this.activePipes.length; i++){
      this.activePipes[i].display();
    }
  }
  
  movePipes(speed=1) {
    for (let i=0; i < this.activePipes.length; i++){
      this.activePipes[i].move(speed);
    }
  }
  
  // Remove pipes that leave the screen.
  removePipes() {
    if (this.activePipes.length == this.quantity) {
      for (let i=0; i < this.activePipes.length; i++){
        if (this.activePipes[i].upperPipe.x + 
            this.activePipes[i].upperPipe.w < 0) {
        this.activePipes.splice(i, 1);
        }
      }
    }
  }
  
  // Detects if any of the active pipes are colliding with player.
  detectAllCollusions(player) {
    for (let i=0; i < this.activePipes.length; i++){
      if (this.activePipes[i].detectCollusion(player)) {
        return true;
      }
      else {return false;}
    }
  }
  
  // If any active pipes are passed, gives point to player.
  givePoints(player) {
    for (let i=0; i < this.activePipes.length; i++){
      if (this.activePipes[i].isPassed(player)) {
        player.score = player.score + 1;
      }
    }
  }
  
}