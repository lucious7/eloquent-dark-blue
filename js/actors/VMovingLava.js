function VMovingLava(pos){
    this.pos = pos;
    this.size = new Vector(1,1);
    this.speed = new Vector(0,2);
}

VMovingLava.prototype = Object.create(Lava.prototype);