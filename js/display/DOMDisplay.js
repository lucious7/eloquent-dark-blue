function elt(name, className) {
    var elt = document.createElement(name);
    if(className) elt.className = className;
    
    return elt;
}

var scale = 20;

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
};

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
};

DOMDisplay.prototype.drawFrame = function() {
    if(this.actorLayer){
        this.wrap.removeChild(this.actorLayer);
    }
    this.actorLayer = this.wrap.appendChild(this.drawActors());
    this.wrap.className = "game " + (this.level.status || "");
    this.scrollPlayerIntoView();
};

DOMDisplay.prototype.scrollPlayerIntoView = function() {
    var width = this.wrap.clientWidth;
    var height = this.wrap.clientHeight;
    var xMargin = width/3;
    var yMargin = height/3;
    
    //the Viewport
    var left = this.wrap.scrollLeft, right = left + width;
    var top = this.wrap.scrollTop, bottom = top + height;
    
    var player = this.level.player;
    var center = player.pos.plus(player.size.times(0.5)).times(scale);
    
    //center horizontally
    if(center.x < left + xMargin){
        this.wrap.scrollLeft = Math.max(center.x - xMargin, 0);
    }else if(center.x > right - xMargin){
        this.wrap.scrollLeft = Math.max(center.x + xMargin - width, 0);
    }
    //center vertically
    if(center.y < top + yMargin){
        this.wrap.scrollTop = Math.max(center.y - yMargin, 0);
    }else if(center.y > bottom - yMargin){
        this.wrap.scrollTop = Math.max(center.y + yMargin - height, 0);
    }
};

DOMDisplay.prototype.clear = function() {
  this.wrap.parentNode.removeChild(this.wrap);
};