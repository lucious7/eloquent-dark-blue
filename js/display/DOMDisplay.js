function elt(name, className) {
    var elt = document.createElement(name);
    if(className) elt.className = className;
    
    return elt;
}

var scale = 60;

function scaleToPx(val) {
    return val * scale + "px";
}

function DOMDisplay(parent, level) {
    this.wrap = parent.appendChild(elt("div", "game"));
    this.level = level;
    
    this.wrap.appendChild(this.drawBackground());
    this.actorLayer = null;
    this.drawFrame();
}

DOMDisplay.prototype.drawBackground = function(){
    var table = elt("table", "background");
    table.style.width = scaleToPx(this.level.width);
    this.level.grid.forEach(function(row) {
        var rowElt = table.appendChild(elt("tr"));
        rowElt.style.height = scaleToPx(1);
        row.forEach(type => rowElt.appendChild(elt("td",type)));
    });
    return table;
}

DOMDisplay.prototype.drawActors = function(){
    var wrap = elt("div");
    this.level.actors.forEach(function(actor){
        var rect = wrap.appendChild(elt("div", "actor "+actor.type));
        rect.style.width = scaleToPx(actor.size.x);
        rect.style.height = scaleToPx(actor.size.y);
        rect.style.left = scaleToPx(actor.pos.x);
        rect.style.top = scaleToPx(actor.pos.y); 
    });
    return wrap;
}

DOMDisplay.prototype.drawFrame = function() {
    if(this.actorLayer){
        this.wrap.removeChild(this.actorLayer);
    }
    this.actorLayer = this.wrap.appendChild(this.drawActors());
    this.wrap.className = "game " + (this.level.status || "");
    this.scrollPlayerIntoView();
}

DOMDisplay.prototype.scrollPlayerIntoView = function() {
    var width = this.wrap.clintWidth;
    var height = this.wrap.clientHeight;
    var margin = width/3;
    
    //the Viewport
    var left = this.wrap.scrollLeft, right = left + width;
    var top = this.wrap.scrollTop, bottom = top + height;
    
    var player = this.level.player;
    var center = player.pos.plus(player.size.times(0.5)).times(scale);
    
    if(center.x < left + margin){
        this.wrap.scrollLeft = center.x - margin;
    }else if(center.x > right - margin){
        this.wrap.scrollLeft = center.x + margin - width;
    }else if(center.y < top + margin){
        this.wrap.scrollTop = center.y - margin;
    }else if(center.y > bottom - margin){
        this.wrap.scrollTop = center.y + margin - height;
    }
}

DOMDisplay.prototype.clear = function() {
  this.wrap.parentNode.removeChild(this.wrap);
};