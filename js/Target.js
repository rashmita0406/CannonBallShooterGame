class Target {
  constructor(x,y,width,height) {
    var options ={
        frictionAir: 0,
        friction: 0.2,
        frictionStatic: 0.5,
        inertia: Infinity,
        restitution: 0.5,
        density:0.8
    }
    this.body = Bodies.rectangle(x, y, width, height, options);
    this.width = width;
    this.height = height;
    this.hit = 1;
    Composite.add(world, this.body);
    
  }

  display() {
    var pos = this.body.position;
    push();
    rectMode(CENTER);
    fill("lightpink");
    rect(pos.x, pos.y,this.width,this.height);
    pop();
    console.log(this.body.position.x);
    //console.log(this.body.velocity.x);
    if(this.body.position.x>800){
      this.hit--;
    }
  }

  score(){
    if(this.hit<0 && this.hit>-2){
      score+=20;
    }
  }
}
