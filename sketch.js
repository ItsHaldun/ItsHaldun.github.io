function setup() {
  createCanvas(480, 720);
  
  player = new bird();

  // Starting at x=720, creates 5 pipeColumns 320 pixels apart.
  pipes = new pipeList(720, 5, 320);
  pipes.initialize();
  
  started = false;
  
  highscore = getItem('highscore');
   if (highscore === null) {
     highscore = 0;
   }
}

function draw() {
  background(20);
  
  // The game starts with a mouse click.
  if (!started) {
      displayText("Press a key to start!", width/2, height/2);
    
      if(mouseIsPressed) {
        started = true;
      }
    
      return;
    }
  
  //Pipes are generated and displayed.
  pipes.generatePipes(pipes.activePipes[0].upperPipe.x);
  pipes.displayPipes();

  player.display();

  pipes.givePoints(player);
  
  // Super advanced UI is made here.
  displayText(player.score, width/2, height/10);
  displayText("Record: " + highscore, width*4/5, height/10);
  
  // Removes any offscreen pipes.
  pipes.removePipes();
  
  //Main game logic is... Continue until game over!
  if (!GameOver()) {
    pipes.movePipes(3);
    player.updatePosition();
  }
  else {
    displayGameOver();
    
    if (player.score > highscore) {
       storeItem('highscore', player.score);
    }
  }
  
}

// Bird flaps if mouse is pressed.
function mousePressed() {
  let flapForce = 12;
  player.flap(flapForce);
}

function GameOver() {
  if ((player.y < -player.h/2) || 
      (player.y > height-player.h/2) ||
      (pipes.detectAllCollusions(player))) 
    {return true;}
  else 
    {return false;}
}

// These functions aren't necessary, but they make the code easier to read.
function displayGameOver() {
  displayText("Game Over", width/2, height/3, 48, clr=color(255,0,0));
}

function displayText(txt, x, y, size=32, clr=255, Align=CORNER) {
  textSize(size);
  textAlign(CENTER);
  fill(clr);
  text(txt, x, y);
}