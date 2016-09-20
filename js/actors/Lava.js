function Lava(){

}

Lava.prototype.type = Type.LAVA;

Lava.prototype.act = function(step, level){
    var newPos = this.pos.plus(this.speed.times(step));
    if(!level.obstacleAt(newPos, this.size)){
        this.pos = newPos;
    }else if(this.repeatPos){
        this.pos = this.repeatPos;
    }else{
        this.speed = this.speed.times(-1);
    }
};