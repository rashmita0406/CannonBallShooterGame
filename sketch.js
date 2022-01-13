const { Engine, Bodies, Body, Mouse, MouseConstraint, Constraint, Composite, Detector } = Matter;
// The above line creates different constant variables for Engine, World, Bodies etc.

var score=0;
var engine, world;
var ground, wall;
var launchX,launchY;
var launcherX, launcherY;
var flag = "start";
var gameState=0, trials=0;
var trialScores=[0];

function setup() {
    // Setup the canvas, the ground the, tanker, the shooting ball and the bubble balls.
    createCanvas(800,500);
    engine = Engine.create();
    world = engine.world;
    ground= new Ground(200,490,1200,20);
    wall = new Wall(250,430,10,100);
    tanker = new Tanker(50,400,100,100);
    tankerhead = new TankerHead(100,460,100,100);
    tar1= new Target(300,100,20,20);
    tar2= new Target(380,200,20,40);
    tar3= new Target(460,150,10,20);
    tar4= new Target(540,100,20,10);
    tar5= new Target(620,80,40,10);
    tar6= new Target(700,50,30,20);
    
    canonball = new CanonBall(20,20);
    shot = new ShootBall(canonball.body, { x: 70, y: height - 220 });
}

function draw() {
    switch(gameState){
        case 0: //Instructions
        background("yellow");
        fill("black");
        textSize(18);
        text("Game Instructions", 300,50);
        textSize(16);
        text("-> Players will get only 10 chances to hit the target per level.",50,100);
        text("-> On 3 consecutive misses, the level will get over and the player will re-start that level again.",50,150);
        text("-> If the player is able to hit the target correctly for 6 times overall, the player will move to the next level.",50,200);
        text("-> After correctly hitting the target the position of the elements will change as per the level of the game.",50,250);
        text("-> For every correct hit the player will get 20 points but 5 points will be deducted for every miss.",50,300);
        text("Press 'Enter key' to start the game...", 250, 450);
        if(keyIsDown(13)){
            gameState=1;
            trials=0;
        }
        break;

        case 1: //level 1
        // Update the Matter Engine and set the background
        background("lightblue");
        Engine.update(engine);
        
        //Display scores and trials
        text("Trials: "+trials, 600, 100);
        text("Score: "+score,500, 100);
        ground.display();
        wall.display();
        tankerhead.display();
        tanker.display();
    
        tar1.display();
        tar2.display();
        tar3.display();
        tar4.display();
        tar5.display();
        tar6.display();
        
        tar1.score();
        tar2.score();
        tar3.score();
        tar4.score();
        tar5.score();
        tar6.score();
        canonball.display();
        shot.display();
        if (trials<10) {
            shot.attach(canonball.body);
        }
        else if(trials==3 && score == 0){
            gameState=4; //over state
        }
        else if(score==120){
            gameState=2;
        }
        else if(trials>=10){
            gameState=4;
        }
        break;
        case 2://level 2
        background("pink");
        text("Congratulation! you made it to Level 2, press space to start", 200, 200);
        if(keyIsDown(32)){
            gameState = 1;

        }
        break;
        case 4: //Game Over state
        background("black");
        fill("yellow");
        textSize(20);
        text("Final Score: "+score, 300, 100);
        text("Game Over. Press 'Spacebar' to restart the game.", 200, 200)
        if(keyIsDown(32)){
            gameState=0;
            trials=0;
            score=0;
        }
        break;
    }
console.log(trialScores);

}


function keyReleased() {
    // Call the shoot method for the cannon.
    if (keyCode === (32)) {
        flag = "launch";
        shot.shoot();
        //Check and update trial counter
        trialScores.push(score);
        trials++;
        if(trialScores[trials]<=score){
            score=score-5;
        }
    }
}
