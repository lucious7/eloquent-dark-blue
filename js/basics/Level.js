function Level(plan) {
    this.width = plan[0].length;
    this.height = plan.length;
    this.grid = [];
    this.actors = [];
    
    for (var y = 0; y < this.height; y++) {
        var line = plan[y], gridLine = [];
        for (var x = 0; x < this.width; x++) {
            var ch = line[x], fieldType = null;
            var actorType = Actor.fromChar(ch);
            if(actorType){
                this.actors.push(new actorType(new Vector(x,y)));
            }else if(ch === '#'){
                fieldType = 'wall';
            }else if(ch === '!'){
                fieldType = 'lava';
            }
            gridLine.push(fieldType);
        }
        this.grid.push(gridLine);
    }
    
    this.player = this.actors.filter(a => a.type === 'player')[0];
    this.status = this.finishDelay = null;
}

Level.prototype.isFinished = function(){
    return this.status != null && this.finishDelay < 0;
}