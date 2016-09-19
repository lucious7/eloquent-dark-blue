function DrippingLava(pos){
    this.pos = pos;
    this.size = new Vector(1,1);
    this.speed = new Vector(0,3);
}

DrippingLava.prototype.type = "lava";