function Player(pos){
    this.pos = pos.plus(new Vector(0,-0.5));
    this.size = new Vector(0.8, 1.5);
    this.speed = new Vector(0,0);
}

Player.prototype.type = "player";