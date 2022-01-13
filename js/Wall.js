class Wall {
    constructor(x, y, width, height) {
      var options ={
        isStatic : true,
        friction: 1,
        density:1
      }
      this.body = Bodies.rectangle(x, y, width, height, options);
      this.width = width;
      this.height = height;
        
      Composite.add(world, this.body);
    };
  
    display(){
      var pos = this.body.position;
        push();
        rectMode(CENTER);
        fill("grey");
        rect(pos.x, pos.y, this.width, this.height);
        pop();
    }
  }
  