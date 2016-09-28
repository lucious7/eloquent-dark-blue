function Player(pos){
    this.pos = pos.plus(new Vector(0,-0.5));
    this.size = new Vector(0.8, 1.5);
    this.speed = new Vector(0,0);
}

var playerXSpeed = 7;
var gravity  = 30;
var jumpSpeed = 17

Player.prototype.type = Type.PLAYER;

Player.prototype.moveX = function(step, level, keys){
    this.speed.x = 0;
    if(keys.LEFT) this.speed.x -= playerXSpeed;
    if(keys.RIGHT) this.speed.x += playerXSpeed;

    var motion = new Vector(this.speed.x * step, 0);
    var newPos = this.pos.plus(motion);
    var obstacle = level.obstacleAt(newPos, this.size);
    if(obstacle){
        level.playerTouched(obstacle);
    }else this.pos = newPos;
};

Player.prototype.moveY = function(step, level, keys){
    this.speed.y += step * gravity;

    var motion = new Vector(0, this.speed.y * step);
    var newPos = this.pos.plus(motion);
    var obstacle = level.obstacleAt(newPos, this.size);
    if(obstacle){
        level.playerTouched(obstacle);
        if(keys.UP && this.speed.y > 0){
            this.speed.y = -jumpSpeed;
        } else this.speed.y = 0; 
    } else this.pos = newPos;
};

Player.prototype.act = function(step, level, keys){
    this.moveX(step, level, keys);
    this.moveY(step, level, keys);

    var otherActor = level.actorAt(this);
    if(otherActor){
        level.playerTouched(otherActor.type, otherActor);
    }

    if(level.status === Status.LOST){
        this.pos.y += step;
        this.size.y -= step;
    }
};