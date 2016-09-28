function Level(plan, number) {
    this.number = number;
    this.plan = plan;
    
    this.loadPlan(plan);
}

var maxStep = 0.05;

Level.prototype.isFinished = function(){
    return this.status != null && this.finishDelay < 0;
};

Level.prototype.obstacleAt = function(pos, size){
    var xStart = Math.floor(pos.x), xEnd = Math.ceil(pos.x + size.x);
    var yStart = Math.floor(pos.y), yEnd = Math.ceil(pos.y + size.y);

    if(xStart < 0 || xEnd > this.width || yStart < 0){
        return Type.WALL;
    }
    if(yEnd > this.height){
        return Type.LAVA;
    }
    for (var y = yStart; y < yEnd; y++) {
        for (var x = xStart; x < xEnd; x++) {
            var fieldType = this.grid[y][x];
            if(fieldType) return fieldType;
        }
    }
};

Level.prototype.actorAt = function(actor){
    for (var i = 0; i < this.actors.length; i++) {
        var other = this.actors[i];
        if(other != actor &&
            actor.pos.x + actor.size.x > other.pos.x &&
            actor.pos.x < other.pos.x + other.size.x &&
            actor.pos.y + actor.size.y > other.pos.y &&
            actor.pos.y < other.pos.y + other.size.y){
                return other;
            }
    }
};

Level.prototype.animate = function(step, keys){
    if(this.status != null){
        this.finishDelay -= step;
    }
    while (step > 0) {
        var thisStep = Math.min(step, maxStep);

        if(this.status == Status.LOST || this.status === Status.GAME_OVER) keys = {};
        
        this.actors.forEach(actor => actor.act(thisStep, this, keys), this);
        step -= thisStep;
    }
};

Level.prototype.playerTouched = function(actorType, actor){
    if(actorType === Type.LAVA && this.status === null){
        playerHearts--;
        if(playerHearts < 1){
            this.status = Status.GAME_OVER;
            this.finishDelay = 2;
        } else {
            this.status = Status.LOST;
            this.finishDelay = 1;
        }
    } else if(actorType === Type.COIN){
        this.actors = this.actors.filter(other => other != actor);
        if(!this.actors.some(a => a.type === Type.COIN)){
            this.status = Status.WON;
            this.finishDelay = 1;
        }
    }
};

Level.prototype.loadPlan = function(){
        this.width = this.plan[0].length;
        this.height = this.plan.length;
        this.grid = [];
        this.actors = [];
        this.startTime = Date.now();

        for (var y = 0; y < this.height; y++) {
        var line = this.plan[y], gridLine = [];
        for (var x = 0; x < this.width; x++) {
            var ch = line[x], fieldType = null;
            var actorType = Type.fromChar(ch);
            if(actorType){
                this.actors.push(new actorType(new Vector(x,y)));
            }else if(ch === '#'){
                fieldType = Type.WALL;
            }else if(ch === '!'){
                fieldType = Type.LAVA;
            }
            gridLine.push(fieldType);
        }
        this.grid.push(gridLine);
    }
    
    this.player = this.actors.filter(a => a.type === Type.PLAYER)[0];
    this.status = this.finishDelay = null;
}

Level.prototype.restart = function(){ console.log('RESETING...');
    this.loadPlan();
};