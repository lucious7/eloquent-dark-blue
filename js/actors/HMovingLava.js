function HMovingLava(pos){
    this.pos = pos;
    this.size = new Vector(1,1);
    this.speed = new Vector(2,0);
}

HMovingLava.prototype.type = "lava";